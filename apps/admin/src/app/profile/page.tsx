"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import {
  User,
  Mail,
  Shield,
  ShieldCheck,
  Camera,
  Save,
  Key,
  Eye,
  EyeOff,
  Loader2,
  CheckCircle,
} from "lucide-react";
import toast from "react-hot-toast";
import apiClient from "@/lib/api-client";

function RoleBadge({ role }: { role: string }) {
  if (role === "SUPER_ADMIN")
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 border border-purple-100 dark:border-purple-800/40">
        <ShieldCheck size={13} />
        Super Admin
      </span>
    );
  if (role === "ADMIN")
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-navy-50 dark:bg-navy-900/30 text-navy-700 dark:text-blue-400 border border-navy-100 dark:border-navy-800/40">
        <Shield size={13} />
        Admin
      </span>
    );
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-slate-300 border border-gray-200 dark:border-slate-600">
      <User size={13} />
      User
    </span>
  );
}

export default function ProfilePage() {
  const { data: session, update } = useSession();

  const userName = session?.user?.name || "";
  const userEmail = session?.user?.email || "";
  const userImage = session?.user?.image;
  const userRole = (session?.user as Record<string, unknown>)?.role as string || "ADMIN";

  const [name, setName] = useState(userName);
  const [savingProfile, setSavingProfile] = useState(false);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    setSavingProfile(true);
    try {
      await apiClient.patch("/users/me", { name: name.trim() });
      await update({ name: name.trim() });
      toast.success("Profile updated successfully.");
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Failed to update profile.");
    } finally {
      setSavingProfile(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match.");
      return;
    }
    if (newPassword.length < 8) {
      toast.error("New password must be at least 8 characters.");
      return;
    }
    setSavingPassword(true);
    try {
      await apiClient.patch("/users/me/password", { currentPassword, newPassword });
      toast.success("Password changed successfully.");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Failed to change password.");
    } finally {
      setSavingPassword(false);
    }
  };

  const passwordStrength = (pwd: string) => {
    if (!pwd) return null;
    let score = 0;
    if (pwd.length >= 8) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;
    if (score <= 1) return { label: "Weak", color: "bg-red-400", width: "w-1/4" };
    if (score === 2) return { label: "Fair", color: "bg-yellow-400", width: "w-2/4" };
    if (score === 3) return { label: "Good", color: "bg-blue-400", width: "w-3/4" };
    return { label: "Strong", color: "bg-emerald-500", width: "w-full" };
  };

  const strength = passwordStrength(newPassword);

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold text-navy-800 dark:text-slate-100">Profile</h1>
        <p className="text-sm text-gray-500 dark:text-slate-400 mt-1">Manage your personal information and password</p>
      </div>

      {/* Avatar + identity card */}
      <div className="admin-card flex items-center gap-5">
        <div className="relative flex-shrink-0">
          {userImage ? (
            <img
              src={userImage}
              alt={userName}
              className="w-20 h-20 rounded-full object-cover ring-4 ring-navy-100 dark:ring-slate-600"
            />
          ) : (
            <div className="w-20 h-20 bg-navy-600 text-white rounded-full flex items-center justify-center text-3xl font-bold ring-4 ring-navy-100 dark:ring-slate-600">
              {(userName || userEmail).charAt(0).toUpperCase()}
            </div>
          )}
          {userImage && (
            <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-white dark:bg-slate-700 border-2 border-gray-200 dark:border-slate-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-50 dark:hover:bg-slate-600 transition-colors">
              <Camera size={13} className="text-gray-500 dark:text-slate-300" />
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="text-xl font-semibold text-navy-800 dark:text-slate-100 truncate">{userName || "—"}</h2>
          <p className="text-sm text-gray-500 dark:text-slate-400 flex items-center gap-1.5 mt-0.5 truncate">
            <Mail size={13} />
            {userEmail}
          </p>
          <div className="mt-2">
            <RoleBadge role={userRole} />
          </div>
        </div>
      </div>

      {/* Edit profile */}
      <div className="admin-card">
        <h2 className="text-lg font-semibold text-navy-800 dark:text-slate-100 mb-4 flex items-center gap-2">
          <User size={18} className="text-navy-500 dark:text-slate-400" />
          Personal Information
        </h2>
        <form onSubmit={handleSaveProfile} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="admin-label">Display Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your full name"
                className="admin-input"
                required
              />
            </div>
            <div>
              <label className="admin-label">Email Address</label>
              <input
                type="email"
                value={userEmail}
                disabled
                className="admin-input bg-gray-50 dark:bg-slate-900/50 text-gray-400 dark:text-slate-500 cursor-not-allowed"
              />
              <p className="mt-1 text-[11px] text-gray-400 dark:text-slate-500">Email cannot be changed.</p>
            </div>
            <div>
              <label className="admin-label">Role</label>
              <input
                type="text"
                value={userRole.replace("_", " ")}
                disabled
                className="admin-input bg-gray-50 dark:bg-slate-900/50 text-gray-400 dark:text-slate-500 cursor-not-allowed"
              />
              <p className="mt-1 text-[11px] text-gray-400 dark:text-slate-500">Role is managed by a Super Admin.</p>
            </div>
          </div>
          <div className="flex justify-end pt-1">
            <button
              type="submit"
              disabled={savingProfile || name.trim() === userName}
              className="admin-btn-primary flex items-center gap-2"
            >
              {savingProfile ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <Save size={16} />
              )}
              {savingProfile ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>

      {/* Change password */}
      <div className="admin-card">
        <h2 className="text-lg font-semibold text-navy-800 dark:text-slate-100 mb-1 flex items-center gap-2">
          <Key size={18} className="text-navy-500 dark:text-slate-400" />
          Change Password
        </h2>
        <p className="text-sm text-gray-500 dark:text-slate-400 mb-4">
          Only applies to credential-based accounts. Google sign-in accounts do not use a password here.
        </p>
        <form onSubmit={handleChangePassword} className="space-y-4">
          <div>
            <label className="admin-label">Current Password</label>
            <div className="relative">
              <input
                type={showCurrent ? "text" : "password"}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Enter current password"
                className="admin-input pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowCurrent((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-slate-500 hover:text-gray-600 dark:hover:text-slate-300"
              >
                {showCurrent ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="admin-label">New Password</label>
              <div className="relative">
                <input
                  type={showNew ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="At least 8 characters"
                  className="admin-input pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowNew((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-slate-500 hover:text-gray-600 dark:hover:text-slate-300"
                >
                  {showNew ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {strength && (
                <div className="mt-2">
                  <div className="h-1 bg-gray-100 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full transition-all ${strength.color} ${strength.width}`} />
                  </div>
                  <p className="text-[11px] text-gray-400 dark:text-slate-500 mt-1">Strength: {strength.label}</p>
                </div>
              )}
            </div>
            <div>
              <label className="admin-label">Confirm New Password</label>
              <div className="relative">
                <input
                  type={showConfirm ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Repeat new password"
                  className="admin-input pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-slate-500 hover:text-gray-600 dark:hover:text-slate-300"
                >
                  {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {confirmPassword && (
                <p className={`text-[11px] mt-1 flex items-center gap-1 ${newPassword === confirmPassword ? "text-emerald-500" : "text-red-500"}`}>
                  {newPassword === confirmPassword ? (
                    <><CheckCircle size={11} /> Passwords match</>
                  ) : (
                    "Passwords do not match"
                  )}
                </p>
              )}
            </div>
          </div>
          <div className="flex justify-end pt-1">
            <button
              type="submit"
              disabled={savingPassword}
              className="admin-btn-primary flex items-center gap-2"
            >
              {savingPassword ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <Key size={16} />
              )}
              {savingPassword ? "Updating..." : "Update Password"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
