"use client";

import { useEffect, useState } from "react";
import {
  Plus,
  Trash2,
  Pencil,
  Star,
  Check,
  X,
  Loader2,
  Save,
  MessageSquare,
} from "lucide-react";
import toast from "react-hot-toast";
import apiClient from "@/lib/api-client";

// ─── Types ────────────────────────────────────────────────────────────────────

interface TestimonialItem {
  id: string;
  name: string;
  location: string;
  rating: number;
  text: string;
}

const EMPTY: Omit<TestimonialItem, "id"> = {
  name: "",
  location: "",
  rating: 5,
  text: "",
};

// ─── Star picker ──────────────────────────────────────────────────────────────

function StarPicker({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((n) => (
        <button key={n} type="button" onClick={() => onChange(n)}>
          <Star
            size={22}
            className={n <= value ? "fill-gold text-gold" : "fill-gray-200 text-gray-200 hover:fill-gold/40 hover:text-gold/40"}
          />
        </button>
      ))}
      <span className="ml-2 text-xs text-gray-500">{value} / 5</span>
    </div>
  );
}

// ─── Inline form ──────────────────────────────────────────────────────────────

function TestimonialForm({
  initial,
  onSave,
  onCancel,
  saving,
}: {
  initial: Omit<TestimonialItem, "id">;
  onSave: (data: Omit<TestimonialItem, "id">) => void;
  onCancel: () => void;
  saving: boolean;
}) {
  const [form, setForm] = useState(initial);
  const set = (patch: Partial<typeof form>) => setForm((f) => ({ ...f, ...patch }));
  const valid = form.name.trim() && form.location.trim() && form.text.trim();

  return (
    <div className="rounded-xl border border-gold/40 bg-gold/5 dark:bg-slate-800/60 p-5 space-y-4">
      <p className="text-sm font-semibold text-navy dark:text-slate-100">
        {initial.name ? "Edit Testimonial" : "New Testimonial"}
      </p>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-xs font-medium text-gray-600 dark:text-slate-400">
            Customer Name *
          </label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => set({ name: e.target.value })}
            placeholder="e.g. Priya Sharma"
            className="admin-input w-full"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-medium text-gray-600 dark:text-slate-400">
            Location *
          </label>
          <input
            type="text"
            value={form.location}
            onChange={(e) => set({ location: e.target.value })}
            placeholder="e.g. Mumbai"
            className="admin-input w-full"
          />
        </div>
      </div>

      <div>
        <label className="mb-1.5 block text-xs font-medium text-gray-600 dark:text-slate-400">
          Rating
        </label>
        <StarPicker value={form.rating} onChange={(v) => set({ rating: v })} />
      </div>

      <div>
        <label className="mb-1.5 block text-xs font-medium text-gray-600 dark:text-slate-400">
          Review Text *
        </label>
        <textarea
          value={form.text}
          onChange={(e) => set({ text: e.target.value })}
          placeholder="Write the customer's experience here..."
          rows={4}
          className="admin-input w-full resize-none"
        />
      </div>

      <div className="flex items-center justify-end gap-2 pt-1">
        <button
          type="button"
          onClick={onCancel}
          className="admin-btn-secondary flex items-center gap-1.5 text-sm"
        >
          <X size={14} /> Cancel
        </button>
        <button
          type="button"
          disabled={!valid || saving}
          onClick={() => onSave(form)}
          className="admin-btn-primary flex items-center gap-1.5 text-sm"
        >
          {saving ? <Loader2 size={14} className="animate-spin" /> : <Check size={14} />}
          {saving ? "Saving..." : "Save Testimonial"}
        </button>
      </div>
    </div>
  );
}

// ─── Testimonial card ─────────────────────────────────────────────────────────

function TestimonialCard({
  item,
  onEdit,
  onDelete,
}: {
  item: TestimonialItem;
  onEdit: () => void;
  onDelete: () => void;
}) {
  const initials = item.name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="admin-card p-5">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3 min-w-0">
          <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-navy text-sm font-bold text-white">
            {initials || "?"}
          </div>
          <div className="min-w-0">
            <p className="font-semibold text-navy dark:text-slate-100">{item.name}</p>
            <p className="text-xs text-gray-500 dark:text-slate-400">{item.location}</p>
            <div className="mt-1.5 flex items-center gap-0.5">
              {[1, 2, 3, 4, 5].map((n) => (
                <Star
                  key={n}
                  size={13}
                  className={n <= item.rating ? "fill-gold text-gold" : "fill-gray-200 text-gray-200"}
                />
              ))}
              <span className="ml-1.5 text-xs text-gray-500">{item.rating}/5</span>
            </div>
          </div>
        </div>
        <div className="flex gap-2 flex-shrink-0">
          <button
            type="button"
            onClick={onEdit}
            className="flex items-center gap-1.5 rounded-lg border border-gray-200 dark:border-slate-600 px-3 py-1.5 text-xs font-medium text-gray-600 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors"
          >
            <Pencil size={13} /> Edit
          </button>
          <button
            type="button"
            onClick={onDelete}
            className="flex items-center gap-1.5 rounded-lg border border-red-200 px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50 transition-colors"
          >
            <Trash2 size={13} /> Delete
          </button>
        </div>
      </div>
      <p className="mt-4 text-sm leading-relaxed text-gray-600 dark:text-slate-300">
        &ldquo;{item.text}&rdquo;
      </p>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function TestimonialsPage() {
  const [items, setItems] = useState<TestimonialItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Load current testimonials from siteConfig
  useEffect(() => {
    apiClient
      .get("/site-config")
      .then((res) => {
        const cfg = res.data?.data;
        setItems(cfg?.testimonials?.items ?? []);
      })
      .catch(() => toast.error("Failed to load testimonials"))
      .finally(() => setLoading(false));
  }, []);

  // Persist the full testimonials list back to the siteConfig
  const persist = async (updatedItems: TestimonialItem[]) => {
    setSaving(true);
    try {
      // Fetch full config first so we only patch the testimonials.items field
      const res = await apiClient.get("/site-config");
      const current = res.data?.data ?? {};
      await apiClient.put("/site-config", {
        ...current,
        testimonials: {
          ...current.testimonials,
          items: updatedItems,
        },
      });
      setItems(updatedItems);
      return true;
    } catch {
      toast.error("Failed to save. Please try again.");
      return false;
    } finally {
      setSaving(false);
    }
  };

  const handleAdd = async (data: Omit<TestimonialItem, "id">) => {
    const newItem: TestimonialItem = { ...data, id: Date.now().toString() };
    const ok = await persist([...items, newItem]);
    if (ok) {
      setShowAddForm(false);
      toast.success("Testimonial added successfully");
    }
  };

  const handleUpdate = async (id: string, data: Omit<TestimonialItem, "id">) => {
    const updated = items.map((t) => (t.id === id ? { ...data, id } : t));
    const ok = await persist(updated);
    if (ok) {
      setEditingId(null);
      toast.success("Testimonial updated");
    }
  };

  const handleDelete = async (id: string) => {
    const updated = items.filter((t) => t.id !== id);
    const ok = await persist(updated);
    if (ok) toast.success("Testimonial deleted");
  };

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 size={28} className="animate-spin text-gray-400" />
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-3xl">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-navy-800 dark:text-slate-100">Testimonials</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-slate-400">
            Manage customer reviews displayed on the homepage.{" "}
            <span className="font-medium">{items.length} testimonial{items.length !== 1 ? "s" : ""}</span> saved.
          </p>
        </div>
        {!showAddForm && (
          <button
            type="button"
            onClick={() => { setShowAddForm(true); setEditingId(null); }}
            className="admin-btn-primary flex items-center gap-2"
          >
            <Plus size={16} />
            Add Testimonial
          </button>
        )}
      </div>

      {/* Add form */}
      {showAddForm && (
        <TestimonialForm
          initial={EMPTY}
          onSave={handleAdd}
          onCancel={() => setShowAddForm(false)}
          saving={saving}
        />
      )}

      {/* List */}
      {items.length === 0 && !showAddForm ? (
        <div className="admin-card flex flex-col items-center justify-center py-16 text-center">
          <MessageSquare size={40} className="text-gray-300 dark:text-slate-600" />
          <p className="mt-3 text-base font-medium text-gray-500 dark:text-slate-400">
            No testimonials yet
          </p>
          <p className="mt-1 text-sm text-gray-400 dark:text-slate-500">
            Click &ldquo;Add Testimonial&rdquo; above to add your first customer review.
          </p>
          <button
            type="button"
            onClick={() => setShowAddForm(true)}
            className="admin-btn-primary mt-5 flex items-center gap-2"
          >
            <Plus size={15} />
            Add First Testimonial
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {items.map((item) =>
            editingId === item.id ? (
              <TestimonialForm
                key={item.id}
                initial={{ name: item.name, location: item.location, rating: item.rating, text: item.text }}
                onSave={(data) => handleUpdate(item.id, data)}
                onCancel={() => setEditingId(null)}
                saving={saving}
              />
            ) : (
              <TestimonialCard
                key={item.id}
                item={item}
                onEdit={() => { setEditingId(item.id); setShowAddForm(false); }}
                onDelete={() => handleDelete(item.id)}
              />
            )
          )}
        </div>
      )}

      {/* Info note */}
      {items.length > 0 && (
        <div className="rounded-xl border border-blue-100 bg-blue-50 dark:border-slate-700 dark:bg-slate-800/50 px-4 py-3 flex items-start gap-3">
          <Save size={15} className="mt-0.5 flex-shrink-0 text-blue-500" />
          <p className="text-xs text-blue-700 dark:text-slate-400">
            Changes are saved immediately to the database. The customer homepage will reflect updates on the next page load.
          </p>
        </div>
      )}
    </div>
  );
}
