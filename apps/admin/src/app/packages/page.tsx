"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Star,
  ChevronLeft,
  ChevronRight,
  Clock,
  MapPin,
  Loader2,
} from "lucide-react";
import toast from "react-hot-toast";
import apiClient from "@/lib/api-client";

interface TourPackage {
  id: string;
  name: string;
  destination: string;
  duration: number;
  nights: number;
  price: number;
  discountedPrice: number | null;
  category: string;
  isFeatured: boolean;
  isActive: boolean;
  _count?: { bookings: number };
}

export default function PackagesPage() {
  const [packages, setPackages] = useState<TourPackage[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);

  const fetchPackages = useCallback(async () => {
    setLoading(true);
    try {
      const res = await apiClient.get("/packages", {
        params: { page, limit: 10, includeInactive: true },
      });
      setPackages(res.data.data);
      const meta = res.data.meta;
      if (meta) {
        setTotalPages(meta.totalPages || 1);
        setTotal(meta.total || 0);
      }
    } catch {
      toast.error("Failed to load packages.");
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    fetchPackages();
  }, [fetchPackages]);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to deactivate this package?")) return;
    try {
      await apiClient.delete(`/packages/${id}`);
      toast.success("Package deactivated successfully.");
      fetchPackages();
    } catch {
      toast.error("Failed to delete package.");
    }
  };

  const filteredPackages = packages.filter((pkg) => {
    const matchesSearch =
      pkg.name.toLowerCase().includes(search.toLowerCase()) ||
      pkg.destination.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter === "all" || pkg.category === categoryFilter;
    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "Active" ? pkg.isActive : !pkg.isActive);
    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-navy-800">Tour Packages</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage tour packages ({total} total)
          </p>
        </div>
        <Link href="/packages/new" className="admin-btn-primary flex items-center gap-2">
          <Plus size={18} />
          Add Package
        </Link>
      </div>

      <div className="admin-card">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-5">
          <div className="relative flex-1 w-full sm:max-w-sm">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search packages..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="admin-input pl-9 py-2 text-sm"
            />
          </div>
          <div className="flex items-center gap-2">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="admin-select text-sm py-2 w-auto"
            >
              <option value="all">All Categories</option>
              <option value="Adventure">Adventure</option>
              <option value="Nature">Nature</option>
              <option value="Heritage">Heritage</option>
              <option value="Beach">Beach</option>
              <option value="Pilgrimage">Pilgrimage</option>
              <option value="Honeymoon">Honeymoon</option>
              <option value="Wildlife">Wildlife</option>
              <option value="Luxury">Luxury</option>
            </select>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="admin-select text-sm py-2 w-auto"
            >
              <option value="all">All Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
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
                    <th>Package Name</th>
                    <th>Destination</th>
                    <th>Duration</th>
                    <th>Price</th>
                    <th>Category</th>
                    <th>Featured</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPackages.map((pkg) => (
                    <tr key={pkg.id}>
                      <td>
                        <p className="font-medium text-navy-800">{pkg.name}</p>
                      </td>
                      <td>
                        <div className="flex items-center gap-1">
                          <MapPin size={13} className="text-gray-400" />
                          {pkg.destination}
                        </div>
                      </td>
                      <td>
                        <div className="flex items-center gap-1">
                          <Clock size={13} className="text-gray-400" />
                          {pkg.duration}D / {pkg.nights}N
                        </div>
                      </td>
                      <td>
                        {pkg.discountedPrice ? (
                          <>
                            <p className="font-medium text-navy-800">
                              INR {pkg.discountedPrice.toLocaleString()}
                            </p>
                            <p className="text-xs text-gray-400 line-through">
                              INR {pkg.price.toLocaleString()}
                            </p>
                          </>
                        ) : (
                          <p className="font-medium text-navy-800">
                            INR {pkg.price.toLocaleString()}
                          </p>
                        )}
                      </td>
                      <td>
                        <span className="badge-info">{pkg.category}</span>
                      </td>
                      <td>
                        {pkg.isFeatured ? (
                          <Star size={16} className="text-gold-500 fill-gold-500" />
                        ) : (
                          <Star size={16} className="text-gray-300" />
                        )}
                      </td>
                      <td>
                        <span className={pkg.isActive ? "badge-success" : "badge-neutral"}>
                          {pkg.isActive ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td>
                        <div className="flex items-center gap-1">
                          <Link
                            href={`/packages/${pkg.id}/edit`}
                            className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500 hover:text-navy-600 transition-colors"
                          >
                            <Edit size={16} />
                          </Link>
                          <button
                            onClick={() => handleDelete(pkg.id)}
                            className="p-1.5 rounded-lg hover:bg-red-50 text-gray-500 hover:text-red-600 transition-colors"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredPackages.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">No packages found.</p>
              </div>
            )}

            <div className="flex items-center justify-between mt-5 pt-4 border-t border-gray-100">
              <p className="text-sm text-gray-500">
                Showing {filteredPackages.length} of {total} packages
              </p>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 disabled:opacity-40 transition-colors"
                >
                  <ChevronLeft size={16} />
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <button
                    key={p}
                    onClick={() => setPage(p)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                      p === page ? "bg-navy-600 text-white" : "hover:bg-gray-100 text-gray-600"
                    }`}
                  >
                    {p}
                  </button>
                ))}
                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="p-2 rounded-lg hover:bg-gray-100 text-gray-600 disabled:opacity-40 transition-colors"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
