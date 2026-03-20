"use client";

import { useEffect, useState } from "react";
import { User, Briefcase, Phone, Mail, MapPin, Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import apiClient from "@/lib/api-client";

export default function AgentProfilePage() {
  const { data: session } = useSession();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiClient.get("/agents/me/profile")
      .then((res) => setProfile(res.data.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const userName = session?.user?.name || "Agent";
  const userEmail = session?.user?.email || "";

  if (loading) {
    return <div className="flex items-center justify-center py-24"><Loader2 size={32} className="animate-spin text-navy-600" /></div>;
  }

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold text-navy-800">My Profile</h1>
        <p className="text-sm text-gray-500 mt-1">Your agent account details</p>
      </div>

      <div className="agent-card">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 bg-navy-600 text-white rounded-2xl flex items-center justify-center text-2xl font-bold">
            {userName.charAt(0).toUpperCase()}
          </div>
          <div>
            <h2 className="text-xl font-bold text-navy-800">{userName}</h2>
            <p className="text-sm text-gray-500">Tour Agent • KaNa Travels</p>
          </div>
        </div>

        <div className="space-y-4">
          {[
            { icon: Mail,     label: "Email",        value: userEmail },
            { icon: Phone,    label: "Phone",        value: profile?.phone || profile?.user?.phone || "—" },
            { icon: Briefcase,label: "Agency",       value: profile?.agencyName || "—" },
            { icon: MapPin,   label: "Address",      value: profile?.address || "—" },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex items-center gap-3 py-3 border-b border-gray-50 last:border-0">
              <Icon size={16} className="text-gray-400 flex-shrink-0" />
              <div>
                <p className="text-xs text-gray-400">{label}</p>
                <p className="text-sm font-medium text-navy-800">{value}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-5 pt-5 border-t border-gray-100">
          <p className="text-xs text-gray-400">
            Account status: <span className={`font-medium ${profile?.isActive ? "text-emerald-600" : "text-red-500"}`}>
              {profile?.isActive ? "Active" : "Inactive"}
            </span>
            {" · "}Member since {profile ? new Date(profile.createdAt).toLocaleDateString("en-IN", { dateStyle: "medium" }) : "—"}
          </p>
          <p className="text-xs text-gray-400 mt-1">
            To update your details or commission rates, please contact the KaNa admin.
          </p>
        </div>
      </div>
    </div>
  );
}
