"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Search,
  ChevronLeft,
  ChevronRight,
  Shield,
  ShieldCheck,
  User,
  Mail,
  Plus,
  X,
  Loader2,
} from "lucide-react";
import toast from "react-hot-toast";
import apiClient from "@/lib/api-client";

interface UserRecord {
  id: string;
  name: string | null;
  email: string;
  role: string;
  image: string | null;
  createdAt: string;
  _count?: { bookings: number };
}

function getRoleBadge(role: string) {
  switch (role) {
    case "SUPER_ADMIN":
      return (
        <span className="inline-flex items-center gap-1 badge bg-purple-50 text-purple-700">
          <ShieldCheck size={12} />
          Super Admin
        </span>
      );
    case "ADMIN":
      return (
        <span className="inline-flex items-center gap-1 badge bg-navy-50 text-navy-700">
          <Shield size={12} />
          Admin
        </span>
      );
    default:
      return (
        <span className="inline-flex items-center gap-1 badge bg-gray-100 text-gray-700">
          <User size={12} />
          User
        </span>
      );
  }
}

export default function UsersPage() {
  const [users, setUsers] = useState<UserRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [creating, setCreating] = useState(false);
  const [newUser, setNewUser] = useState({ name: "", email: "", role: "CUSTOMER", phone: "" });

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const res = await apiClient.get("/users", { params: { page, limit: 10 } });
      setUsers(res.data.data);
      const meta = res.data.meta;
      if (meta) {
        setTotalPages(meta.totalPages || 1);
        setTotal(meta.total || 0);
      }
    } catch {
      toast.error("Failed to load users.");
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleRoleChange = async (userId: string, newRole: string, currentRole: string) => {
    if (currentRole === "SUPER_ADMIN") return;
    try {
      await apiClient.patch(`/users/${userId}/role`, { role: newRole });
      setUsers((prev) => prev.map((u) => (u.id === userId ? { ...u, role: newRole } : u)));
      toast.success("User role updated successfully");
    } catch {
      toast.error("Failed to update user role.");
    }
  };

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreating(true);
    try {
      await apiClient.post("/users", newUser);
      toast.success("User created successfully");
      setShowCreateModal(false);
      setNewUser({ name: "", email: "", role: "CUSTOMER", phone: "" });
      fetchUsers();
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to create user.");
    } finally {
      setCreating(false);
    }
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      (user.name ?? "").toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase());
    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const totalAdmins = users.filter((u) => u.role === "ADMIN" || u.role === "SUPER_ADMIN").length;
  const totalCustomers = users.filter((u) => u.role === "CUSTOMER").length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-navy-800">Users</h1>
          <p className="text-sm text-gray-500 mt-1">Manage user accounts and permissions</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="admin-btn-primary flex items-center gap-2"
        >
          <Plus size={16} />
          Add User
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="admin-card flex items-center gap-4">
          <div className="p-2.5 bg-navy-50 rounded-lg">
            <User size={20} className="text-navy-600" />
          </div>
          <div>
            <p className="text-2xl font-bold text-navy-800">{total}</p>
            <p className="text-sm text-gray-500">Total Users</p>
          </div>
        </div>
        <div className="admin-card flex items-center gap-4">
          <div className="p-2.5 bg-emerald-50 rounded-lg">
            <User size={20} className="text-emerald-600" />
          </div>
          <div>
            <p className="text-2xl font-bold text-navy-800">{totalCustomers}</p>
            <p className="text-sm text-gray-500">Customers</p>
          </div>
        </div>
        <div className="admin-card flex items-center gap-4">
          <div className="p-2.5 bg-purple-50 rounded-lg">
            <Shield size={20} className="text-purple-600" />
          </div>
          <div>
            <p className="text-2xl font-bold text-navy-800">{totalAdmins}</p>
            <p className="text-sm text-gray-500">Administrators</p>
          </div>
        </div>
      </div>

      <div className="admin-card">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-5">
          <div className="relative flex-1 w-full sm:max-w-sm">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="admin-input pl-9 py-2 text-sm"
            />
          </div>
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="admin-select text-sm py-2 w-auto"
          >
            <option value="all">All Roles</option>
            <option value="CUSTOMER">Customer</option>
            <option value="ADMIN">Admin</option>
            <option value="SUPER_ADMIN">Super Admin</option>
          </select>
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
                    <th>User</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Bookings</th>
                    <th>Joined</th>
                    <th>Change Role</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => (
                    <tr key={user.id}>
                      <td>
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 bg-navy-100 text-navy-600 rounded-full flex items-center justify-center text-sm font-semibold">
                            {(user.name ?? user.email).charAt(0).toUpperCase()}
                          </div>
                          <span className="font-medium text-navy-800">{user.name ?? "—"}</span>
                        </div>
                      </td>
                      <td>
                        <div className="flex items-center gap-1.5 text-gray-600">
                          <Mail size={13} className="text-gray-400" />
                          {user.email}
                        </div>
                      </td>
                      <td>{getRoleBadge(user.role)}</td>
                      <td className="text-center">{user._count?.bookings ?? 0}</td>
                      <td className="text-gray-500">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </td>
                      <td>
                        <select
                          value={user.role}
                          onChange={(e) => handleRoleChange(user.id, e.target.value, user.role)}
                          className="admin-select text-xs py-1.5 w-auto"
                          disabled={user.role === "SUPER_ADMIN"}
                        >
                          <option value="CUSTOMER">Customer</option>
                          <option value="ADMIN">Admin</option>
                          <option value="SUPER_ADMIN">Super Admin</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredUsers.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">No users found matching your criteria.</p>
              </div>
            )}

            <div className="flex items-center justify-between mt-5 pt-4 border-t border-gray-100">
              <p className="text-sm text-gray-500">
                Showing {filteredUsers.length} of {total} users
              </p>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 disabled:opacity-40"
                >
                  <ChevronLeft size={16} />
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <button
                    key={p}
                    onClick={() => setPage(p)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
                      p === page ? "bg-navy-600 text-white" : "hover:bg-gray-100 text-gray-600"
                    }`}
                  >
                    {p}
                  </button>
                ))}
                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="p-2 rounded-lg hover:bg-gray-100 text-gray-600 disabled:opacity-40"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
            <div className="flex items-center justify-between p-5 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-navy-800">Add New User</h2>
              <button
                onClick={() => setShowCreateModal(false)}
                className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400"
              >
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleCreateUser} className="p-5 space-y-4">
              <div>
                <label className="admin-label">Full Name</label>
                <input
                  type="text"
                  value={newUser.name}
                  onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                  placeholder="Enter full name"
                  className="admin-input"
                  required
                />
              </div>
              <div>
                <label className="admin-label">Email Address</label>
                <input
                  type="email"
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  placeholder="user@example.com"
                  className="admin-input"
                  required
                />
              </div>
              <div>
                <label className="admin-label">Phone (optional)</label>
                <input
                  type="tel"
                  value={newUser.phone}
                  onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
                  placeholder="+91 9876543210"
                  className="admin-input"
                />
              </div>
              <div>
                <label className="admin-label">Role</label>
                <select
                  value={newUser.role}
                  onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                  className="admin-select"
                >
                  <option value="CUSTOMER">Customer</option>
                  <option value="ADMIN">Admin</option>
                  <option value="SUPER_ADMIN">Super Admin</option>
                </select>
              </div>
              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="admin-btn-secondary flex-1"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={creating}
                  className="admin-btn-primary flex-1 flex items-center justify-center gap-2"
                >
                  {creating ? <Loader2 size={16} className="animate-spin" /> : <Plus size={16} />}
                  {creating ? "Creating..." : "Create User"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
