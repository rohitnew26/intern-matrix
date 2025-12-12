import React, { useEffect, useMemo, useState } from "react";
import { useAuth } from "../../context/AuthContext";

const MyProfile = () => {
    const { user, profile, updateProfile, uploadAvatar, loading } = useAuth();
    const [formValues, setFormValues] = useState({ firstName: "", lastName: "", phone: "", email: "" });
    const [status, setStatus] = useState({ error: "", success: "" });
    const [isSaving, setIsSaving] = useState(false);
    const [avatarFile, setAvatarFile] = useState(null);
    const [avatarPreview, setAvatarPreview] = useState("");

    useEffect(() => {
        if (!profile) return;
        const fullName = profile.full_name || "";
        const [firstName = "", ...rest] = fullName.split(" ");
        setFormValues({
            firstName,
            lastName: rest.join(" ").trim(),
            phone: profile.phone || "",
            email: user?.email || "",
        });
    }, [profile, user?.email]);

    useEffect(() => {
        if (!profile && user?.email) {
            setFormValues((prev) => ({ ...prev, email: user.email }));
        }
    }, [profile, user?.email]);

    useEffect(() => {
        setAvatarPreview(profile?.avatar_url || "");
    }, [profile?.avatar_url]);

    useEffect(() => {
        return () => {
            if (avatarPreview && avatarPreview.startsWith("blob:")) {
                URL.revokeObjectURL(avatarPreview);
            }
        };
    }, [avatarPreview]);

    const initials = useMemo(() => {
        const source = profile?.full_name || user?.email || "User";
        return source
            .split(" ")
            .map((part) => part.charAt(0))
            .join("")
            .slice(0, 2)
            .toUpperCase();
    }, [profile?.full_name, user?.email]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormValues((prev) => ({ ...prev, [name]: value }));
    };

    const handleAvatarChange = (event) => {
        const fileInput = event.target;
        const file = fileInput.files?.[0];
        if (!file) return;
        setAvatarFile(file);
        const objectUrl = URL.createObjectURL(file);
        setAvatarPreview(objectUrl);
        fileInput.value = "";
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setStatus({ error: "", success: "" });
        if (!updateProfile) return;

        const composedName = `${formValues.firstName} ${formValues.lastName}`.trim() || user?.email;
        if (!composedName) {
            setStatus({ error: "Name cannot be empty", success: "" });
            return;
        }

        try {
            setIsSaving(true);
            let avatarUrl = profile?.avatar_url || null;
            if (avatarFile && uploadAvatar) {
                avatarUrl = await uploadAvatar(avatarFile);
                setAvatarFile(null);
                setAvatarPreview(avatarUrl || "");
            }

            await updateProfile({
                full_name: composedName,
                phone: formValues.phone || null,
                avatar_url: avatarUrl,
            });

            // Attempt to update profile email in profile record. This may not update
            // authentication email on the backend if separate; adjust backend endpoints if needed.
            if (formValues.email && formValues.email !== user?.email) {
                await updateProfile({ email: formValues.email });
            }

            setStatus({ error: "", success: "Profile updated" });
        } catch (error) {
            setStatus({ error: error.message || "Unable to save profile", success: "" });
        } finally {
            setIsSaving(false);
        }
    };

    if (!user) {
        return (
            <div className="w-full max-w-3xl">
                <p className="text-white">Sign in to view your profile.</p>
            </div>
        );
    }

    return (
        <div className="w-full max-w-5xl animate-fade-in">
            <div className="mb-10">
                <h2 className="text-3xl font-bold text-white">Profile Settings</h2>
                <div className="h-1 w-20 bg-yellow-400 rounded-full mt-2"></div>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">

                {/* Avatar Card */}
                <div className="w-full lg:w-1/3 bg-zinc-900/40 border border-zinc-800 p-8 rounded-3xl flex flex-col items-center text-center">
                    <div className="w-32 h-32 rounded-full p-1 border-2 border-yellow-400/30 mb-4 overflow-hidden">
                        {avatarPreview ? (
                            <img src={avatarPreview} alt="Profile avatar" className="w-full h-full object-cover rounded-full" />
                        ) : (
                            <div className="w-full h-full rounded-full bg-zinc-800 flex items-center justify-center text-3xl font-bold text-yellow-400">
                                {initials}
                            </div>
                        )}
                    </div>
                    <h3 className="text-2xl font-bold text-white">{profile?.full_name || user?.email}</h3>
                    <p className="text-zinc-500 text-sm mb-6">{profile?.phone || "Add your phone number"}</p>

                    <label
                        htmlFor="avatar-upload"
                        className="w-full py-2.5 cursor-pointer border border-zinc-700 hover:border-white/50 text-zinc-300 hover:text-white rounded-xl text-sm font-medium transition-colors"
                    >
                        {isSaving ? "Uploading..." : "Change Photo"}
                    </label>
                    <input
                        id="avatar-upload"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleAvatarChange}
                        disabled={isSaving}
                    />
                    <p className="text-xs text-zinc-500 mt-2">PNG/JPG under 2MB works best.</p>
                </div>

                {/* Form Card */}
                <form onSubmit={handleSubmit} className="w-full lg:w-2/3 bg-zinc-900/40 border border-zinc-800 p-8 rounded-3xl">
                    <h3 className="text-lg font-bold text-yellow-400 mb-6 uppercase tracking-wide">Personal Details</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div className="space-y-2">
                            <label className="text-xs font-medium text-zinc-400 uppercase ml-1">First Name</label>
                            <input
                                type="text"
                                name="firstName"
                                value={formValues.firstName}
                                onChange={handleChange}
                                disabled={loading || isSaving}
                                className="w-full bg-black/40 border border-zinc-700 rounded-xl p-3 text-white focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 focus:outline-none transition-all placeholder-zinc-600"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-medium text-zinc-400 uppercase ml-1">Last Name</label>
                            <input
                                type="text"
                                name="lastName"
                                value={formValues.lastName}
                                onChange={handleChange}
                                disabled={loading || isSaving}
                                className="w-full bg-black/40 border border-zinc-700 rounded-xl p-3 text-white focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 focus:outline-none transition-all placeholder-zinc-600"
                            />
                        </div>
                    </div>

                    <div className="space-y-2 mb-6">
                        <label className="text-xs font-medium text-zinc-400 uppercase ml-1">Phone Number</label>
                        <input
                            type="tel"
                            name="phone"
                            value={formValues.phone}
                            onChange={handleChange}
                            disabled={loading || isSaving}
                            placeholder="+91 90000 00000"
                            className="w-full bg-black/40 border border-zinc-700 rounded-xl p-3 text-white focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 focus:outline-none transition-all placeholder-zinc-600"
                        />
                    </div>

                    <div className="space-y-2 mb-6">
                        <label className="text-xs font-medium text-zinc-400 uppercase ml-1">Email Address</label>
                        <input
                            type="email"
                            name="email"
                            value={formValues.email}
                            onChange={handleChange}
                            disabled={loading || isSaving}
                            className="w-full bg-black/40 border border-zinc-700 rounded-xl p-3 text-white focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 focus:outline-none transition-all placeholder-zinc-600"
                        />
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                        {status.error && <p className="text-sm text-red-400">{status.error}</p>}
                        {status.success && !status.error && <p className="text-sm text-emerald-400">{status.success}</p>}
                        <button
                            type="submit"
                            disabled={loading || isSaving}
                            className="px-8 py-3 bg-yellow-400 text-black cursor-pointer font-bold rounded-full hover:bg-yellow-300 hover:shadow-[0_0_20px_rgba(250,204,21,0.3)] hover:scale-[1.02] transition-all duration-300 disabled:opacity-60 disabled:hover:scale-100"
                        >
                            {isSaving ? "Saving..." : "Save Changes"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default MyProfile;