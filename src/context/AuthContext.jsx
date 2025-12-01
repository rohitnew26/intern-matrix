import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { supabase } from "../services/supabaseClient";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
	const [session, setSession] = useState(null);
	const [profile, setProfile] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const syncSession = async () => {
			const { data } = await supabase.auth.getSession();
			setSession(data.session);
			setLoading(false);
		};

		const { data: listener } = supabase.auth.onAuthStateChange((_event, currentSession) => {
			setSession(currentSession);
			setLoading(false);
		});

		syncSession();
		return () => listener.subscription.unsubscribe();
	}, []);

	useEffect(() => {
		if (session?.user) {
			const snapshot = {
				id: session.user.id,
				email: session.user.email,
				full_name: profile?.full_name || session.user.user_metadata?.full_name || session.user.email,
			};
			localStorage.setItem("user", JSON.stringify(snapshot));
			if (session.access_token) {
				localStorage.setItem("token", session.access_token);
			}
		} else {
			localStorage.removeItem("user");
			localStorage.removeItem("token");
		}
	}, [session, profile]);

	useEffect(() => {
		const fetchOrCreateProfile = async () => {
			if (!session?.user) {
				setProfile(null);
				return;
			}

			const { data, error, status } = await supabase
				.from("profiles")
				.select("id, full_name, avatar_url, phone")
				.eq("id", session.user.id)
				.single();

			if (data) {
				setProfile(data);
				return;
			}

			if (error && status !== 406) {
				console.error("Profile fetch failed", error);
				return;
			}

			// No profile yet (new OAuth user) → seed from auth metadata
			const metadata = session.user.user_metadata || {};
			const fullNameFromMeta =
				metadata.full_name ||
				metadata.name ||
				[metadata.first_name, metadata.last_name].filter(Boolean).join(" ") ||
				session.user.email;
			const avatarFromMeta = metadata.avatar_url || metadata.picture || null;
			const phoneFromMeta = metadata.phone || (metadata.phone_verified ? session.user.phone : null);

			const { data: createdProfile, error: upsertError } = await supabase
				.from("profiles")
				.upsert({
					id: session.user.id,
					full_name: fullNameFromMeta,
					avatar_url: avatarFromMeta,
					phone: phoneFromMeta,
				})
				.select()
				.single();

			if (upsertError) {
				console.error("Profile upsert failed", upsertError);
				return;
			}

			setProfile(createdProfile);
		};

		fetchOrCreateProfile();
	}, [session?.user]);

	const resetAuthState = useCallback(() => {
		setSession(null);
		setProfile(null);
		localStorage.removeItem("user");
		localStorage.removeItem("token");
	}, []);

	const signInWithPassword = (email, password) => supabase.auth.signInWithPassword({ email, password });
	const signUpWithPassword = (payload) => supabase.auth.signUp(payload);
	const signOut = useCallback(async () => {
		try {
			const { error } = await supabase.auth.signOut();
			if (error) throw error;
		} finally {
			resetAuthState();
		}
	}, [resetAuthState]);

	const updateProfile = useCallback(
		async (updates = {}) => {
		if (!session?.user) throw new Error("You must be signed in to update your profile");

		const payload = {
			...updates,
			updated_at: new Date().toISOString(),
		};

		const { data, error } = await supabase
			.from("profiles")
			.update(payload)
			.eq("id", session.user.id)
			.select("id, full_name, avatar_url, phone")
			.single();

		if (error) {
			console.error("Profile update failed", error);
			throw error;
		}

		setProfile(data);
		return data;
		},
		[session?.user]
	);

	const updateEmail = useCallback(
		async (newEmail) => {
			if (!session?.user) throw new Error("You must be signed in to update your email");
			if (!newEmail || newEmail === session.user.email) return session.user;

			const { data, error } = await supabase.auth.updateUser({ email: newEmail });

			if (error) {
				console.error("Email update failed", error);
				throw error;
			}

			if (data?.user) {
				setSession((prev) => (prev ? { ...prev, user: data.user } : { user: data.user }));
			}

			return data?.user ?? session.user;
		},
		[session?.user]
	);

	const uploadAvatar = useCallback(
		async (file) => {
			if (!session?.user) throw new Error("You must be signed in to update your photo");
			if (!file) return profile?.avatar_url || null;

			const extension = file.name?.split(".").pop()?.toLowerCase() || "png";
			const uniqueSuffix = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
			const filePath = `${session.user.id}/${uniqueSuffix}.${extension}`;

			const { error: uploadError } = await supabase.storage
				.from("avatars")
				.upload(filePath, file, { cacheControl: "3600", upsert: true });

			if (uploadError) {
				console.error("Avatar upload failed", uploadError);
				throw uploadError;
			}

			const {
				data: { publicUrl },
			} = supabase.storage.from("avatars").getPublicUrl(filePath);

			return publicUrl;
		},
		[profile?.avatar_url, session?.user]
	);

	const value = useMemo(
		() => ({
			session,
			user: session?.user ?? null,
			profile,
			loading,
			signInWithPassword,
			signUpWithPassword,
			signOut,
			updateProfile,
			updateEmail,
			uploadAvatar,
		}),
		[session, profile, loading, updateProfile, updateEmail, uploadAvatar, signOut]
	);

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
