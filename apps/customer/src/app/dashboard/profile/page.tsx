"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import apiClient from "@/lib/api-client";
import { User, Mail, Phone, Save, CheckCircle } from "lucide-react";

export default function ProfilePage() {
  const { data: session, update: updateSession } = useSession();
  const user = session?.user as Record<string, unknown> | undefined;

  const [name, setName] = useState((user?.name as string) || "");
  const [phone, setPhone] = useState((user?.phone as string) || "");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setSaved(false);

    try {
      await apiClient.patch(`/users/${user?.id || "me"}`, {
        name,
        phone,
      });
      setSaved(true);
      await updateSession();
      setTimeout(() => setSaved(false), 3000);
    } catch {
      alert("Failed to update profile");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-navy">My Profile</h1>
        <p className="mt-1 text-gray-600">Manage your account information</p>
      </div>

      <div className="rounded-xl bg-white p-6 shadow-md">
        {/* Avatar */}
        <div className="flex items-center gap-4 border-b pb-6">
          {user?.image ? (
            <img
              src={user.image as string}
              alt=""
              className="h-20 w-20 rounded-full object-cover"
            />
          ) : (
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-navy text-2xl font-bold text-white">
              {(user?.name as string)?.charAt(0) || "U"}
            </div>
          )}
          <div>
            <h3 className="text-lg font-bold text-navy">
              {user?.name as string}
            </h3>
            <p className="text-sm text-gray-500">{user?.email as string}</p>
            <p className="mt-1 text-xs text-gray-400">
              Signed in via Google
            </p>
          </div>
        </div>

        {/* Edit Form */}
        <form onSubmit={handleSave} className="mt-6 space-y-5">
          <div>
            <label className="mb-1.5 flex items-center gap-2 text-sm font-medium text-gray-700">
              <User className="h-4 w-4" />
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input-field"
              placeholder="Enter your full name"
            />
          </div>

          <div>
            <label className="mb-1.5 flex items-center gap-2 text-sm font-medium text-gray-700">
              <Mail className="h-4 w-4" />
              Email Address
            </label>
            <input
              type="email"
              value={(user?.email as string) || ""}
              disabled
              className="input-field bg-gray-50 text-gray-500"
            />
            <p className="mt-1 text-xs text-gray-400">
              Email is managed by your Google account
            </p>
          </div>

          <div>
            <label className="mb-1.5 flex items-center gap-2 text-sm font-medium text-gray-700">
              <Phone className="h-4 w-4" />
              Phone Number
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="input-field"
              placeholder="+91 98765 43210"
            />
          </div>

          <div className="flex items-center gap-3 pt-2">
            <button
              type="submit"
              disabled={saving}
              className="btn-primary flex items-center gap-2"
            >
              {saving ? (
                <>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  Save Changes
                </>
              )}
            </button>
            {saved && (
              <span className="flex items-center gap-1 text-sm text-green-600">
                <CheckCircle className="h-4 w-4" />
                Profile updated!
              </span>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
