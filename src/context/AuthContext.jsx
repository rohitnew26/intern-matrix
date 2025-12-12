import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import * as authApi from "../services/authApi";
import apiClient from "../services/apiClient";
import { supabase } from "../lib/supabaseClient";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
	const [session, setSession] = useState(() => {
    try {
      const raw = localStorage.getItem('session');
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });
	const [profile, setProfile] = useState(() => {
    try {
      const raw = localStorage.getItem('user');
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		// keep token in axios headers when available
		const token = localStorage.getItem('token');
		if (token) {
			apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
		}

		let isMounted = true;

		// Listen to Supabase auth state changes
		const { data: { subscription } } = supabase.auth.onAuthStateChange(
			async (event, authSession) => {
				if (!isMounted) return;

				if (authSession?.user) {
					// Store session and user data
					localStorage.setItem('token', authSession.access_token);
					localStorage.setItem('session', JSON.stringify(authSession));
					
					const userData = {
						id: authSession.user.id,
						email: authSession.user.email,
						user_metadata: authSession.user.user_metadata,
					};
					
					localStorage.setItem('user', JSON.stringify(userData));
					apiClient.defaults.headers.common['Authorization'] = `Bearer ${authSession.access_token}`;
					
					setSession(authSession);
					setProfile(userData);
				} else {
					// Only reset if there's no custom token stored (for custom login)
					const customToken = localStorage.getItem('token');
					if (!customToken) {
						resetAuthState();
					}
				}
				setLoading(false);
			}
		);

		// Initial session check
		supabase.auth.getSession().then(({ data: { session: authSession } }) => {
			if (!isMounted) return;

			if (authSession?.user) {
				localStorage.setItem('token', authSession.access_token);
				localStorage.setItem('session', JSON.stringify(authSession));
				
				const userData = {
					id: authSession.user.id,
					email: authSession.user.email,
					user_metadata: authSession.user.user_metadata,
				};
				
				localStorage.setItem('user', JSON.stringify(userData));
				apiClient.defaults.headers.common['Authorization'] = `Bearer ${authSession.access_token}`;
				
				setSession(authSession);
				setProfile(userData);
			} else {
				// Check if there's a custom login token stored
				const customToken = localStorage.getItem('token');
				const storedUser = localStorage.getItem('user');
				
				if (customToken && storedUser) {
					// Restore custom login session
					apiClient.defaults.headers.common['Authorization'] = `Bearer ${customToken}`;
					try {
						setProfile(JSON.parse(storedUser));
					} catch {
						// If user data is corrupted, clear it
						localStorage.removeItem('user');
						localStorage.removeItem('token');
					}
				}
			}
			setLoading(false);
		});

		return () => {
			isMounted = false;
			subscription?.unsubscribe();
		};
	}, []);

	const resetAuthState = useCallback(() => {
		setSession(null);
		setProfile(null);
		localStorage.removeItem('user');
		localStorage.removeItem('token');
		localStorage.removeItem('session');
		delete apiClient.defaults.headers.common['Authorization'];
	}, []);

	const signInWithPassword = useCallback(async (email, password) => {
		setLoading(true);
		try {
			const data = await authApi.signin(email, password);
			// expected { token, user }
			if (data?.token) {
				localStorage.setItem('token', data.token);
				localStorage.setItem('session', JSON.stringify(data));
				apiClient.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
				setSession(data);
			}
			if (data?.user) {
				const userData = {
					id: data.user.id || data.user._id,
					email: data.user.email,
					user_metadata: data.user.user_metadata || {},
					...data.user
				};
				localStorage.setItem('user', JSON.stringify(userData));
				setProfile(userData);
			}
			return data;
		} catch (err) {
			// Clear auth state on login failure
			resetAuthState();
			throw err;
		} finally {
			setLoading(false);
		}
	}, [resetAuthState]);

	const signUpWithPassword = useCallback(async (payload) => {
		setLoading(true);
		try {
			const data = await authApi.signup(payload.email, payload.password);
			return data;
		} finally {
			setLoading(false);
		}
	}, []);

	const signOut = useCallback(async () => {
		try {
			// Sign out from Supabase
			await supabase.auth.signOut();
		} catch (err) {
			console.error('Supabase signOut error:', err);
		} finally {
			// Reset local state regardless of Supabase result
			resetAuthState();
		}
	}, [resetAuthState]);

	const updateProfile = useCallback(async (updates = {}) => {
		if (!session) throw new Error('You must be signed in to update your profile');
		const userId = session.user?.id || session?.userId || session?.id;
		if (!userId) throw new Error('Missing user id');

		const payload = { ...updates, updated_at: new Date().toISOString() };
		try {
			const res = await apiClient.patch(`/profiles/${encodeURIComponent(userId)}`, payload);
			setProfile(res.data);
			localStorage.setItem('user', JSON.stringify(res.data));
			return res.data;
		} catch (err) {
			console.error('Profile update failed', err);
			throw err;
		}
	}, [session]);



	const uploadAvatar = useCallback(async (file) => {
		// If backend supports avatar upload endpoint, use it. Otherwise throw.
		if (!session) throw new Error('You must be signed in to update your photo');
		if (!file) return profile?.avatar_url || null;
		const userId = session.user?.id || session?.userId || session?.id;
		if (!userId) throw new Error('Missing user id');

		const form = new FormData();
		form.append('avatar', file);
		try {
			const res = await apiClient.post(`/profiles/${encodeURIComponent(userId)}/avatar`, form, {
				headers: { 'Content-Type': 'multipart/form-data' },
			});
			setProfile(res.data);
			localStorage.setItem('user', JSON.stringify(res.data));
			return res.data.avatar_url || null;
		} catch (err) {
			console.error('Avatar upload failed', err);
			throw err;
		}
	}, [profile, session]);

	const value = useMemo(
		() => ({
			session,
			user: profile ?? null,
			profile,
			loading,
			signInWithPassword,
			signUpWithPassword,
			signOut,
			updateProfile,
			uploadAvatar,
		}),
		[session, profile, loading, updateProfile, uploadAvatar, signInWithPassword, signUpWithPassword, signOut]
	);

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
