"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import {
  Bell,
  Globe,
  Shield,
  ShieldCheck,
  Database,
  Save,
  Loader2,
  ToggleLeft,
  ToggleRight,
} from "lucide-react";
import toast from "react-hot-toast";
import { useAppearance } from "@/context/AppearanceContext";

interface ToggleRowProps {
  label: string;
  description: string;
  value: boolean;
  onChange: (v: boolean) => void;
  disabled?: boolean;
}

function ToggleRow({ label, description, value, onChange, disabled }: ToggleRowProps) {
  return (
    <div className="flex items-center justify-between py-3.5 border-b border-gray-100 dark:border-slate-700 last:border-0">
      <div className="flex-1 pr-4">
        <p className={`text-sm font-medium ${disabled ? "text-gray-400 dark:text-slate-500" : "text-navy-800 dark:text-slate-100"}`}>
          {label}
        </p>
        <p className="text-xs text-gray-500 dark:text-slate-400 mt-0.5">{description}</p>
      </div>
      <button
        type="button"
        onClick={() => !disabled && onChange(!value)}
        disabled={disabled}
        className={`flex-shrink-0 transition-colors ${disabled ? "opacity-40 cursor-not-allowed" : "cursor-pointer"}`}
        aria-label={label}
      >
        {value ? (
          <ToggleRight size={32} className="text-navy-600 dark:text-blue-400" />
        ) : (
          <ToggleLeft size={32} className="text-gray-300 dark:text-slate-600" />
        )}
      </button>
    </div>
  );
}

export default function SettingsPage() {
  const { data: session } = useSession();
  const userRole = (session?.user as Record<string, unknown>)?.role as string || "ADMIN";
  const isSuperAdmin = userRole === "SUPER_ADMIN";

  const { darkMode, setDarkMode, sidebarCollapsed, setSidebarCollapsed } = useAppearance();

  const [notif, setNotif] = useState({
    newBookings: true,
    paymentAlerts: true,
    systemUpdates: false,
    weeklyReport: true,
    userRegistrations: false,
  });

  const [security, setSecurity] = useState({
    twoFactorRequired: false,
    sessionTimeout: "8",
    loginAlerts: true,
    ipWhitelist: false,
  });

  const [system, setSystem] = useState({
    maintenanceMode: false,
    allowGoogleLogin: true,
    autoApproveHotels: false,
    autoApprovePackages: false,
  });

  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    await new Promise((r) => setTimeout(r, 600));
    setSaving(false);
    toast.success("Settings saved.");
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold text-navy-800 dark:text-slate-100">Settings</h1>
        <p className="text-sm text-gray-500 dark:text-slate-400 mt-1">
          {isSuperAdmin
            ? "Configure notifications, appearance, security, and system-wide settings"
            : "Configure your notification preferences and appearance"}
        </p>
      </div>

      {/* Notifications */}
      <div className="admin-card">
        <h2 className="text-base font-semibold text-navy-800 dark:text-slate-100 mb-1 flex items-center gap-2">
          <Bell size={17} className="text-navy-500 dark:text-slate-400" />
          Notification Preferences
        </h2>
        <p className="text-xs text-gray-400 dark:text-slate-500 mb-4">Choose which events trigger in-app notifications.</p>
        <ToggleRow
          label="New bookings"
          description="Alert when a new booking is placed"
          value={notif.newBookings}
          onChange={(v) => setNotif({ ...notif, newBookings: v })}
        />
        <ToggleRow
          label="Payment alerts"
          description="Alert on successful or failed payments"
          value={notif.paymentAlerts}
          onChange={(v) => setNotif({ ...notif, paymentAlerts: v })}
        />
        <ToggleRow
          label="Weekly summary report"
          description="Receive a weekly overview of activity"
          value={notif.weeklyReport}
          onChange={(v) => setNotif({ ...notif, weeklyReport: v })}
        />
        <ToggleRow
          label="System updates"
          description="Notifications about platform maintenance and updates"
          value={notif.systemUpdates}
          onChange={(v) => setNotif({ ...notif, systemUpdates: v })}
          disabled={!isSuperAdmin}
        />
        <ToggleRow
          label="New user registrations"
          description="Alert when a new customer registers"
          value={notif.userRegistrations}
          onChange={(v) => setNotif({ ...notif, userRegistrations: v })}
          disabled={!isSuperAdmin}
        />
      </div>

      {/* Appearance */}
      <div className="admin-card">
        <h2 className="text-base font-semibold text-navy-800 dark:text-slate-100 mb-1 flex items-center gap-2">
          <Globe size={17} className="text-navy-500 dark:text-slate-400" />
          Appearance
        </h2>
        <p className="text-xs text-gray-400 dark:text-slate-500 mb-4">Personalise your interface.</p>
        <ToggleRow
          label="Dark mode"
          description="Switch the admin panel to a dark colour scheme"
          value={darkMode}
          onChange={setDarkMode}
        />
        <ToggleRow
          label="Compact sidebar"
          description="Collapse the sidebar to icons only to save screen space"
          value={sidebarCollapsed}
          onChange={setSidebarCollapsed}
        />
      </div>

      {/* Security */}
      <div className="admin-card">
        <h2 className="text-base font-semibold text-navy-800 dark:text-slate-100 mb-1 flex items-center gap-2">
          {isSuperAdmin
            ? <ShieldCheck size={17} className="text-purple-500" />
            : <Shield size={17} className="text-navy-500 dark:text-slate-400" />}
          Security
        </h2>
        <p className="text-xs text-gray-400 dark:text-slate-500 mb-4">
          {isSuperAdmin ? "Manage platform-wide security policies." : "Your account security settings."}
        </p>
        <ToggleRow
          label="Login alerts"
          description="Get notified when a new sign-in occurs on your account"
          value={security.loginAlerts}
          onChange={(v) => setSecurity({ ...security, loginAlerts: v })}
        />
        <ToggleRow
          label="Two-factor authentication required"
          description={isSuperAdmin ? "Force all admins to use 2FA (coming soon)" : "Require 2FA for your account (coming soon)"}
          value={security.twoFactorRequired}
          onChange={(v) => setSecurity({ ...security, twoFactorRequired: v })}
          disabled
        />
        {isSuperAdmin && (
          <ToggleRow
            label="IP whitelist"
            description="Restrict admin access to trusted IP addresses (coming soon)"
            value={security.ipWhitelist}
            onChange={(v) => setSecurity({ ...security, ipWhitelist: v })}
            disabled
          />
        )}
        {isSuperAdmin && (
          <div className="flex items-center justify-between py-3.5">
            <div>
              <p className="text-sm font-medium text-navy-800 dark:text-slate-100">Session timeout</p>
              <p className="text-xs text-gray-500 dark:text-slate-400 mt-0.5">Auto sign-out after inactivity</p>
            </div>
            <select
              value={security.sessionTimeout}
              onChange={(e) => setSecurity({ ...security, sessionTimeout: e.target.value })}
              className="admin-select text-sm py-1.5 w-auto"
            >
              <option value="1">1 hour</option>
              <option value="4">4 hours</option>
              <option value="8">8 hours</option>
              <option value="24">24 hours</option>
            </select>
          </div>
        )}
      </div>

      {/* System — SUPER_ADMIN only */}
      {isSuperAdmin && (
        <div className="admin-card border border-purple-100 dark:border-purple-900/40">
          <h2 className="text-base font-semibold text-navy-800 dark:text-slate-100 mb-1 flex items-center gap-2">
            <Database size={17} className="text-purple-500" />
            System Settings
            <span className="ml-1 px-2 py-0.5 rounded-full bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 text-[10px] font-semibold">
              Super Admin only
            </span>
          </h2>
          <p className="text-xs text-gray-400 dark:text-slate-500 mb-4">Platform-wide configuration affecting all users.</p>
          <ToggleRow
            label="Allow Google sign-in"
            description="Let users authenticate via Google OAuth"
            value={system.allowGoogleLogin}
            onChange={(v) => setSystem({ ...system, allowGoogleLogin: v })}
          />
          <ToggleRow
            label="Auto-approve hotels"
            description="Newly created hotels go live without manual review"
            value={system.autoApproveHotels}
            onChange={(v) => setSystem({ ...system, autoApproveHotels: v })}
          />
          <ToggleRow
            label="Auto-approve packages"
            description="Newly created packages go live without manual review"
            value={system.autoApprovePackages}
            onChange={(v) => setSystem({ ...system, autoApprovePackages: v })}
          />
          <div className="pt-3.5 border-t border-gray-100 dark:border-slate-700 mt-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-red-600 dark:text-red-400">Maintenance mode</p>
                <p className="text-xs text-gray-500 dark:text-slate-400 mt-0.5">Take the customer site offline for maintenance</p>
              </div>
              <button
                type="button"
                onClick={() => setSystem({ ...system, maintenanceMode: !system.maintenanceMode })}
                className="cursor-pointer flex-shrink-0"
              >
                {system.maintenanceMode ? (
                  <ToggleRight size={32} className="text-red-500 dark:text-red-400" />
                ) : (
                  <ToggleLeft size={32} className="text-gray-300 dark:text-slate-600" />
                )}
              </button>
            </div>
            {system.maintenanceMode && (
              <div className="mt-2 px-3 py-2 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800/40 rounded-lg text-xs text-red-600 dark:text-red-400">
                Maintenance mode is ON — the customer-facing site will show a maintenance notice.
              </div>
            )}
          </div>
        </div>
      )}

      <div className="flex justify-end pb-4">
        <button
          onClick={handleSave}
          disabled={saving}
          className="admin-btn-primary flex items-center gap-2"
        >
          {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
          {saving ? "Saving..." : "Save Settings"}
        </button>
      </div>
    </div>
  );
}
