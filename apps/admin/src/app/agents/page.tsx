"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Search, Plus, X, Loader2, Users, Briefcase, Percent,
  ChevronLeft, ChevronRight, ToggleLeft, ToggleRight, Eye,
} from "lucide-react";
import toast from "react-hot-toast";
import apiClient from "@/lib/api-client";

interface Agent {
  id: string;
  agencyName: string | null;
  phone: string | null;
  isActive: boolean;
  flightCommission: number;
  busCommission: number;
  hotelCommission: number;
  tourCommission: number;
  createdAt: string;
  user: { id: string; name: string | null; email: string };
  _count: { bookings: number };
}

const emptyForm = {
  name: "", email: "", password: "", phone: "", agencyName: "", address: "",
  flightCommission: 5, busCommission: 3, hotelCommission: 4, tourCommission: 6,
};

export default function AgentsPage() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [showCreate, setShowCreate] = useState(false);
  const [showCommission, setShowCommission] = useState<Agent | null>(null);
  const [creating, setCreating] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [commissions, setCommissions] = useState({
    flightCommission: 0, busCommission: 0, hotelCommission: 0, tourCommission: 0,
  });

  const fetchAgents = useCallback(async () => {
    setLoading(true);
    try {
      const res = await apiClient.get("/agents", { params: { page, limit: 10, search: search || undefined } });
      setAgents(res.data.data);
      setTotalPages(res.data.meta?.totalPages || 1);
      setTotal(res.data.meta?.total || 0);
    } catch {
      toast.error("Failed to load agents");
    } finally {
      setLoading(false);
    }
  }, [page, search]);

  useEffect(() => { fetchAgents(); }, [fetchAgents]);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreating(true);
    try {
      await apiClient.post("/agents", form);
      toast.success("Tour agent created successfully");
      setShowCreate(false);
      setForm(emptyForm);
      fetchAgents();
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Failed to create agent");
    } finally {
      setCreating(false);
    }
  };

  const openCommission = (agent: Agent) => {
    setShowCommission(agent);
    setCommissions({
      flightCommission: agent.flightCommission,
      busCommission: agent.busCommission,
      hotelCommission: agent.hotelCommission,
      tourCommission: agent.tourCommission,
    });
  };

  const handleSaveCommission = async () => {
    if (!showCommission) return;
    setSaving(true);
    try {
      await apiClient.patch(`/agents/${showCommission.id}/commissions`, commissions);
      toast.success("Commission rates updated");
      setShowCommission(null);
      fetchAgents();
    } catch {
      toast.error("Failed to update commissions");
    } finally {
      setSaving(false);
    }
  };

  const toggleStatus = async (agent: Agent) => {
    try {
      await apiClient.patch(`/agents/${agent.id}/toggle-status`);
      toast.success(`Agent ${agent.isActive ? "deactivated" : "activated"}`);
      fetchAgents();
    } catch {
      toast.error("Failed to update status");
    }
  };

  const activeCount = agents.filter((a) => a.isActive).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-navy-800">Tour Agents</h1>
          <p className="text-sm text-gray-500 mt-1">Manage agent accounts and commission rates</p>
        </div>
        <button onClick={() => setShowCreate(true)} className="admin-btn-primary flex items-center gap-2">
          <Plus size={16} /> Add Agent
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="admin-card flex items-center gap-4">
          <div className="p-2.5 bg-navy-50 rounded-lg"><Users size={20} className="text-navy-600" /></div>
          <div>
            <p className="text-2xl font-bold text-navy-800">{total}</p>
            <p className="text-sm text-gray-500">Total Agents</p>
          </div>
        </div>
        <div className="admin-card flex items-center gap-4">
          <div className="p-2.5 bg-emerald-50 rounded-lg"><Briefcase size={20} className="text-emerald-600" /></div>
          <div>
            <p className="text-2xl font-bold text-navy-800">{activeCount}</p>
            <p className="text-sm text-gray-500">Active Agents</p>
          </div>
        </div>
        <div className="admin-card flex items-center gap-4">
          <div className="p-2.5 bg-gold-50 rounded-lg"><Percent size={20} className="text-gold-600" /></div>
          <div>
            <p className="text-2xl font-bold text-navy-800">
              {agents.reduce((s, a) => s + a._count.bookings, 0)}
            </p>
            <p className="text-sm text-gray-500">Total Bookings</p>
          </div>
        </div>
      </div>

      <div className="admin-card">
        <div className="flex flex-col sm:flex-row gap-3 mb-5">
          <div className="relative flex-1 max-w-sm">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text" placeholder="Search agents..."
              value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              className="admin-input pl-9 py-2 text-sm"
            />
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 size={28} className="animate-spin text-navy-600" />
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Agent</th>
                    <th>Agency</th>
                    <th>Flight %</th>
                    <th>Bus %</th>
                    <th>Hotel %</th>
                    <th>Tour %</th>
                    <th>Bookings</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {agents.map((agent) => (
                    <tr key={agent.id}>
                      <td>
                        <div>
                          <p className="font-medium text-navy-800">{agent.user.name ?? "—"}</p>
                          <p className="text-xs text-gray-500">{agent.user.email}</p>
                        </div>
                      </td>
                      <td className="text-gray-600">{agent.agencyName ?? "—"}</td>
                      <td className="text-center font-medium text-navy-700">{agent.flightCommission}%</td>
                      <td className="text-center font-medium text-navy-700">{agent.busCommission}%</td>
                      <td className="text-center font-medium text-navy-700">{agent.hotelCommission}%</td>
                      <td className="text-center font-medium text-navy-700">{agent.tourCommission}%</td>
                      <td className="text-center">{agent._count.bookings}</td>
                      <td>
                        <span className={`badge ${agent.isActive ? "badge-success" : "badge-danger"}`}>
                          {agent.isActive ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => openCommission(agent)}
                            className="p-1.5 rounded-lg hover:bg-navy-50 text-navy-600"
                            title="Edit commissions"
                          >
                            <Percent size={15} />
                          </button>
                          <button
                            onClick={() => toggleStatus(agent)}
                            className={`p-1.5 rounded-lg ${agent.isActive ? "hover:bg-red-50 text-red-500" : "hover:bg-emerald-50 text-emerald-600"}`}
                            title={agent.isActive ? "Deactivate" : "Activate"}
                          >
                            {agent.isActive ? <ToggleRight size={15} /> : <ToggleLeft size={15} />}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {agents.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">No agents found. Add your first tour agent.</p>
              </div>
            )}

            <div className="flex items-center justify-between mt-5 pt-4 border-t border-gray-100">
              <p className="text-sm text-gray-500">Showing {agents.length} of {total} agents</p>
              <div className="flex items-center gap-1">
                <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}
                  className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 disabled:opacity-40">
                  <ChevronLeft size={16} />
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <button key={p} onClick={() => setPage(p)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium ${p === page ? "bg-navy-600 text-white" : "hover:bg-gray-100 text-gray-600"}`}>
                    {p}
                  </button>
                ))}
                <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages}
                  className="p-2 rounded-lg hover:bg-gray-100 text-gray-600 disabled:opacity-40">
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Create Agent Modal */}
      {showCreate && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg my-4">
            <div className="flex items-center justify-between p-5 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-navy-800">Add Tour Agent</h2>
              <button onClick={() => setShowCreate(false)} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400">
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleCreate} className="p-5 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="admin-label">Full Name *</label>
                  <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Agent name" className="admin-input" required />
                </div>
                <div>
                  <label className="admin-label">Email *</label>
                  <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="agent@email.com" className="admin-input" required />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="admin-label">Password *</label>
                  <input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })}
                    placeholder="Min 8 characters" className="admin-input" required minLength={8} />
                </div>
                <div>
                  <label className="admin-label">Phone</label>
                  <input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="+91 9876543210" className="admin-input" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="admin-label">Agency Name</label>
                  <input type="text" value={form.agencyName} onChange={(e) => setForm({ ...form, agencyName: e.target.value })}
                    placeholder="Agency / Company name" className="admin-input" />
                </div>
                <div>
                  <label className="admin-label">Address</label>
                  <input type="text" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })}
                    placeholder="Office address" className="admin-input" />
                </div>
              </div>

              <div className="border-t border-gray-100 pt-4">
                <p className="text-sm font-semibold text-navy-800 mb-3 flex items-center gap-2">
                  <Percent size={15} /> Commission Rates (%)
                </p>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { key: "flightCommission", label: "Flight" },
                    { key: "busCommission", label: "Bus" },
                    { key: "hotelCommission", label: "Hotel" },
                    { key: "tourCommission", label: "Tour Package" },
                  ].map(({ key, label }) => (
                    <div key={key}>
                      <label className="admin-label">{label} Commission %</label>
                      <input type="number" min={0} max={100} step={0.5}
                        value={(form as any)[key]}
                        onChange={(e) => setForm({ ...form, [key]: parseFloat(e.target.value) || 0 })}
                        className="admin-input" />
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowCreate(false)} className="admin-btn-secondary flex-1">Cancel</button>
                <button type="submit" disabled={creating} className="admin-btn-primary flex-1 flex items-center justify-center gap-2">
                  {creating ? <Loader2 size={16} className="animate-spin" /> : <Plus size={16} />}
                  {creating ? "Creating..." : "Create Agent"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Commission Edit Modal */}
      {showCommission && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
            <div className="flex items-center justify-between p-5 border-b border-gray-100">
              <div>
                <h2 className="text-lg font-semibold text-navy-800">Edit Commission Rates</h2>
                <p className="text-sm text-gray-500">{showCommission.user.name} — {showCommission.agencyName ?? showCommission.user.email}</p>
              </div>
              <button onClick={() => setShowCommission(null)} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400">
                <X size={18} />
              </button>
            </div>
            <div className="p-5 space-y-4">
              {[
                { key: "flightCommission", label: "Flight Booking Commission", icon: "✈️" },
                { key: "busCommission", label: "Bus Booking Commission", icon: "🚌" },
                { key: "hotelCommission", label: "Hotel Booking Commission", icon: "🏨" },
                { key: "tourCommission", label: "Tour Package Commission", icon: "🗺️" },
              ].map(({ key, label, icon }) => (
                <div key={key}>
                  <label className="admin-label">{icon} {label} (%)</label>
                  <div className="relative">
                    <input type="number" min={0} max={100} step={0.5}
                      value={(commissions as any)[key]}
                      onChange={(e) => setCommissions({ ...commissions, [key]: parseFloat(e.target.value) || 0 })}
                      className="admin-input pr-10" />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 font-medium">%</span>
                  </div>
                </div>
              ))}
              <div className="flex gap-3 pt-2">
                <button onClick={() => setShowCommission(null)} className="admin-btn-secondary flex-1">Cancel</button>
                <button onClick={handleSaveCommission} disabled={saving}
                  className="admin-btn-gold flex-1 flex items-center justify-center gap-2">
                  {saving ? <Loader2 size={16} className="animate-spin" /> : <Percent size={16} />}
                  {saving ? "Saving..." : "Save Rates"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
