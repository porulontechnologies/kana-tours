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
  Eye,
  Loader2,
} from "lucide-react";
import toast from "react-hot-toast";
import apiClient from "@/lib/api-client";

interface Hotel {
  id: string;
  name: string;
  city: string;
  state: string;
  starRating: number;
  pricePerNight: number;
  isActive: boolean;
  images: string[];
  rooms: { id: string }[];
}

export default function HotelsPage() {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [ratingFilter, setRatingFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);

  const fetchHotels = useCallback(async () => {
    setLoading(true);
    try {
      const res = await apiClient.get("/hotels", {
        params: { page, limit: 10, includeInactive: true },
      });
      setHotels(res.data.data);
      const meta = res.data.meta;
      if (meta) {
        setTotalPages(meta.totalPages || 1);
        setTotal(meta.total || 0);
      }
    } catch {
      toast.error("Failed to load hotels.");
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    fetchHotels();
  }, [fetchHotels]);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to deactivate this hotel?")) return;
    try {
      await apiClient.delete(`/hotels/${id}`);
      toast.success("Hotel deactivated successfully.");
      fetchHotels();
    } catch {
      toast.error("Failed to delete hotel.");
    }
  };

  const filteredHotels = hotels.filter((hotel) => {
    const matchesSearch =
      hotel.name.toLowerCase().includes(search.toLowerCase()) ||
      hotel.city.toLowerCase().includes(search.toLowerCase());
    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "Active" ? hotel.isActive : !hotel.isActive);
    const matchesRating =
      ratingFilter === "all" || hotel.starRating === parseInt(ratingFilter);
    return matchesSearch && matchesStatus && matchesRating;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-navy-800">Hotels</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage all hotel listings ({total} total)
          </p>
        </div>
        <Link href="/hotels/new" className="admin-btn-primary flex items-center gap-2">
          <Plus size={18} />
          Add Hotel
        </Link>
      </div>

      <div className="admin-card">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-5">
          <div className="relative flex-1 w-full sm:max-w-sm">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search hotels by name or city..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="admin-input pl-9 py-2 text-sm"
            />
          </div>
          <div className="flex items-center gap-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="admin-select text-sm py-2 w-auto"
            >
              <option value="all">All Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
            <select
              value={ratingFilter}
              onChange={(e) => setRatingFilter(e.target.value)}
              className="admin-select text-sm py-2 w-auto"
            >
              <option value="all">All Ratings</option>
              <option value="5">5 Stars</option>
              <option value="4">4 Stars</option>
              <option value="3">3 Stars</option>
              <option value="2">2 Stars</option>
              <option value="1">1 Star</option>
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
                    <th>Hotel</th>
                    <th>City</th>
                    <th>Star Rating</th>
                    <th>Price/Night</th>
                    <th>Rooms</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredHotels.map((hotel) => (
                    <tr key={hotel.id}>
                      <td>
                        <div className="flex items-center gap-3">
                          {hotel.images?.[0] ? (
                            <img
                              src={hotel.images[0]}
                              alt={hotel.name}
                              className="w-12 h-8 rounded object-cover"
                            />
                          ) : (
                            <div className="w-12 h-8 rounded bg-gray-100" />
                          )}
                          <span className="font-medium text-navy-800">{hotel.name}</span>
                        </div>
                      </td>
                      <td>{hotel.city}, {hotel.state}</td>
                      <td>
                        <div className="flex items-center gap-0.5">
                          {Array.from({ length: hotel.starRating }).map((_, i) => (
                            <Star key={i} size={14} className="text-gold-500 fill-gold-500" />
                          ))}
                        </div>
                      </td>
                      <td className="font-medium">INR {hotel.pricePerNight.toLocaleString()}</td>
                      <td>{hotel.rooms?.length ?? 0}</td>
                      <td>
                        <span className={hotel.isActive ? "badge-success" : "badge-neutral"}>
                          {hotel.isActive ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td>
                        <div className="flex items-center gap-1">
                          <Link
                            href={`/hotels/${hotel.id}/edit`}
                            className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500 hover:text-navy-600 transition-colors"
                          >
                            <Edit size={16} />
                          </Link>
                          <button
                            onClick={() => handleDelete(hotel.id)}
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

            {filteredHotels.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">No hotels found.</p>
              </div>
            )}

            <div className="flex items-center justify-between mt-5 pt-4 border-t border-gray-100">
              <p className="text-sm text-gray-500">
                Showing {filteredHotels.length} of {total} hotels
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
