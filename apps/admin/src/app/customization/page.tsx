"use client";

import { useEffect, useState } from "react";
import {
  Image,
  Type,
  Palette,
  Save,
  Loader2,
  ChevronDown,
  ChevronUp,
  Eye,
  RotateCcw,
  Plus,
  Trash2,
  Star,
  MessageSquare,
  Pencil,
  Check,
  X,
} from "lucide-react";
import toast from "react-hot-toast";
import apiClient from "@/lib/api-client";
import SingleImageUploader from "@/components/SingleImageUploader";

// ─── Types ────────────────────────────────────────────────────────────────────

interface TestimonialItem {
  id: string;
  name: string;
  location: string;
  rating: number;
  text: string;
}

interface HeroConfig {
  backgroundImage: string;
  heading: string;
  headingHighlight: string;
  subheading: string;
  primaryButtonText: string;
  primaryButtonLink: string;
  secondaryButtonText: string;
  secondaryButtonLink: string;
}

interface TestimonialsConfig {
  backgroundImage: string;
  items: TestimonialItem[];
}

interface CtaBannerConfig {
  backgroundImage: string;
  heading: string;
  subtext: string;
  primaryButtonText: string;
  secondaryButtonText: string;
}

interface FooterConfig {
  backgroundImage: string;
  companyName: string;
  tagline: string;
  description: string;
  address: string;
  phone: string;
  email: string;
  facebook: string;
  instagram: string;
  twitter: string;
  youtube: string;
}

interface SiteConfig {
  hero: HeroConfig;
  testimonials: TestimonialsConfig;
  ctaBanner: CtaBannerConfig;
  footer: FooterConfig;
}

// ─── Defaults ─────────────────────────────────────────────────────────────────

const DEFAULT_CONFIG: SiteConfig = {
  hero: {
    backgroundImage:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1600&h=900&fit=crop&q=80",
    heading: "Explore the World",
    headingHighlight: "with Kala Travels",
    subheading: "Flights, Buses & Holiday Packages at Best Prices",
    primaryButtonText: "Book Now",
    primaryButtonLink: "/tours",
    secondaryButtonText: "Enquire Now",
    secondaryButtonLink: "/contact",
  },
  testimonials: {
    backgroundImage:
      "https://images.unsplash.com/photo-1506953823976-52e1fdc0149a?w=1600&h=700&fit=crop&q=80",
    items: [],
  },
  ctaBanner: {
    backgroundImage:
      "https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?w=1600&h=500&fit=crop&q=80",
    heading: "Ready to Start Your Journey?",
    subtext:
      "Join thousands of happy travelers who have explored the world with KaNa. Your next adventure awaits.",
    primaryButtonText: "Browse Packages",
    secondaryButtonText: "Contact Us",
  },
  footer: {
    backgroundImage:
      "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=1600&h=600&fit=crop&q=80",
    companyName: "KaNa Travels",
    tagline: "& Holidays",
    description:
      "Your trusted travel partner for unforgettable experiences. We curate the best tour packages, hotels, flights, and bus services to make your journey seamless and memorable.",
    address: "123 Travel Avenue, Tourism District, Bangalore, Karnataka 560001",
    phone: "+91 12345 67890",
    email: "info@kanatravels.com",
    facebook: "https://facebook.com",
    instagram: "https://instagram.com",
    twitter: "https://twitter.com",
    youtube: "https://youtube.com",
  },
};

const EMPTY_TESTIMONIAL: Omit<TestimonialItem, "id"> = {
  name: "",
  location: "",
  rating: 5,
  text: "",
};

// ─── Sub-components ───────────────────────────────────────────────────────────

function SectionHeader({
  icon: Icon,
  title,
  subtitle,
  expanded,
  onToggle,
}: {
  icon: React.ElementType;
  title: string;
  subtitle: string;
  expanded: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="flex w-full items-center justify-between p-5 text-left hover:bg-gray-50 dark:hover:bg-slate-700/30 transition-colors"
    >
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gold/10">
          <Icon size={18} className="text-gold-600" />
        </div>
        <div>
          <p className="text-sm font-semibold text-navy-800 dark:text-slate-100">{title}</p>
          <p className="text-xs text-gray-500 dark:text-slate-400">{subtitle}</p>
        </div>
      </div>
      {expanded ? (
        <ChevronUp size={16} className="text-gray-400 flex-shrink-0" />
      ) : (
        <ChevronDown size={16} className="text-gray-400 flex-shrink-0" />
      )}
    </button>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  textarea,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  textarea?: boolean;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-medium text-gray-600 dark:text-slate-400">
        {label}
      </label>
      {textarea ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={3}
          className="admin-input w-full resize-none text-sm"
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="admin-input w-full text-sm"
        />
      )}
    </div>
  );
}

function StarRatingInput({
  value,
  onChange,
}: {
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          onClick={() => onChange(n)}
          className="focus:outline-none"
        >
          <Star
            size={20}
            className={n <= value ? "fill-gold text-gold" : "fill-gray-200 text-gray-200"}
          />
        </button>
      ))}
      <span className="ml-2 text-xs text-gray-500">{value}/5</span>
    </div>
  );
}

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
    <div className="rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3 min-w-0">
          <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-navy text-xs font-bold text-white">
            {initials || "?"}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-navy dark:text-slate-100">{item.name}</p>
            <p className="text-xs text-gray-500 dark:text-slate-400">{item.location}</p>
            <div className="mt-1 flex items-center gap-0.5">
              {[1, 2, 3, 4, 5].map((n) => (
                <Star
                  key={n}
                  size={12}
                  className={n <= item.rating ? "fill-gold text-gold" : "fill-gray-200 text-gray-200"}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="flex gap-1 flex-shrink-0">
          <button
            type="button"
            onClick={onEdit}
            className="flex h-7 w-7 items-center justify-center rounded-lg border border-gray-200 dark:border-slate-600 text-gray-500 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors"
          >
            <Pencil size={13} />
          </button>
          <button
            type="button"
            onClick={onDelete}
            className="flex h-7 w-7 items-center justify-center rounded-lg border border-red-200 text-red-500 hover:bg-red-50 transition-colors"
          >
            <Trash2 size={13} />
          </button>
        </div>
      </div>
      <p className="mt-3 text-xs leading-relaxed text-gray-600 dark:text-slate-300 line-clamp-3">
        &ldquo;{item.text}&rdquo;
      </p>
    </div>
  );
}

function TestimonialForm({
  initial,
  onSave,
  onCancel,
}: {
  initial: Omit<TestimonialItem, "id">;
  onSave: (data: Omit<TestimonialItem, "id">) => void;
  onCancel: () => void;
}) {
  const [form, setForm] = useState(initial);
  const set = (patch: Partial<typeof form>) => setForm((f) => ({ ...f, ...patch }));

  const valid = form.name.trim() && form.location.trim() && form.text.trim();

  return (
    <div className="rounded-xl border border-gold/30 bg-gold/5 dark:bg-slate-800 p-4 space-y-3">
      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-xs font-medium text-gray-600 dark:text-slate-400">
            Name *
          </label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => set({ name: e.target.value })}
            placeholder="e.g. Priya Sharma"
            className="admin-input w-full text-sm"
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
            className="admin-input w-full text-sm"
          />
        </div>
      </div>
      <div>
        <label className="mb-1.5 block text-xs font-medium text-gray-600 dark:text-slate-400">
          Rating
        </label>
        <StarRatingInput value={form.rating} onChange={(v) => set({ rating: v })} />
      </div>
      <div>
        <label className="mb-1.5 block text-xs font-medium text-gray-600 dark:text-slate-400">
          Testimonial Text *
        </label>
        <textarea
          value={form.text}
          onChange={(e) => set({ text: e.target.value })}
          placeholder="Share the customer's experience..."
          rows={3}
          className="admin-input w-full resize-none text-sm"
        />
      </div>
      <div className="flex items-center justify-end gap-2 pt-1">
        <button
          type="button"
          onClick={onCancel}
          className="admin-btn-secondary flex items-center gap-1.5 text-xs px-3 py-1.5"
        >
          <X size={13} /> Cancel
        </button>
        <button
          type="button"
          disabled={!valid}
          onClick={() => onSave(form)}
          className="admin-btn-primary flex items-center gap-1.5 text-xs px-3 py-1.5"
        >
          <Check size={13} /> Save
        </button>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function CustomizationPage() {
  const [config, setConfig] = useState<SiteConfig>(DEFAULT_CONFIG);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({
    hero: true,
    testimonials: false,
    ctaBanner: false,
    footer: false,
  });

  // Testimonials editing state
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    apiClient
      .get("/site-config")
      .then((res) => {
        if (res.data?.data) {
          const data = res.data.data;
          // Ensure items array always exists
          if (!data.testimonials?.items) {
            data.testimonials = { ...data.testimonials, items: [] };
          }
          setConfig(data);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const toggle = (key: string) =>
    setExpanded((prev) => ({ ...prev, [key]: !prev[key] }));

  const setHero = (patch: Partial<HeroConfig>) =>
    setConfig((c) => ({ ...c, hero: { ...c.hero, ...patch } }));

  const setTestimonialsBg = (backgroundImage: string) =>
    setConfig((c) => ({ ...c, testimonials: { ...c.testimonials, backgroundImage } }));

  const setCtaBanner = (patch: Partial<CtaBannerConfig>) =>
    setConfig((c) => ({ ...c, ctaBanner: { ...c.ctaBanner, ...patch } }));

  const setFooter = (patch: Partial<FooterConfig>) =>
    setConfig((c) => ({ ...c, footer: { ...c.footer, ...patch } }));

  // Testimonial CRUD
  const addTestimonial = (data: Omit<TestimonialItem, "id">) => {
    const newItem: TestimonialItem = { ...data, id: Date.now().toString() };
    setConfig((c) => ({
      ...c,
      testimonials: { ...c.testimonials, items: [...c.testimonials.items, newItem] },
    }));
    setShowAddForm(false);
  };

  const updateTestimonial = (id: string, data: Omit<TestimonialItem, "id">) => {
    setConfig((c) => ({
      ...c,
      testimonials: {
        ...c.testimonials,
        items: c.testimonials.items.map((t) => (t.id === id ? { ...data, id } : t)),
      },
    }));
    setEditingId(null);
  };

  const deleteTestimonial = (id: string) => {
    setConfig((c) => ({
      ...c,
      testimonials: {
        ...c.testimonials,
        items: c.testimonials.items.filter((t) => t.id !== id),
      },
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await apiClient.put("/site-config", config);
      toast.success("Customization saved. Changes will reflect on the customer site.");
    } catch {
      toast.error("Failed to save. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleReset = () => {
    setConfig(DEFAULT_CONFIG);
    toast("Reset to defaults. Click Save to apply.", { icon: "↩️" });
  };

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 size={28} className="animate-spin text-navy-400 dark:text-slate-500" />
      </div>
    );
  }

  const items = config.testimonials.items ?? [];

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-navy-800 dark:text-slate-100">
            Customer Page Customization
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-slate-400">
            Update banners, testimonials, backgrounds, text, and branding shown on the customer-facing site.
          </p>
        </div>
        <a
          href={process.env.NEXT_PUBLIC_CUSTOMER_URL || "http://localhost:3000"}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 rounded-lg border border-gray-200 dark:border-slate-700 px-3 py-2 text-xs font-medium text-gray-600 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors"
        >
          <Eye size={14} />
          Preview Site
        </a>
      </div>

      {/* Hero Section */}
      <div className="admin-card overflow-hidden p-0">
        <SectionHeader
          icon={Image}
          title="Hero Banner"
          subtitle="Main homepage banner — background image, headline, and CTA buttons"
          expanded={expanded.hero}
          onToggle={() => toggle("hero")}
        />
        {expanded.hero && (
          <div className="border-t border-gray-100 dark:border-slate-700 p-5 space-y-4">
            <SingleImageUploader
              label="Background Image"
              value={config.hero.backgroundImage}
              onChange={(v) => setHero({ backgroundImage: v })}
              aspect={16 / 9}
              aspectLabel="16:9 (hero banner)"
            />
            <div className="grid gap-4 sm:grid-cols-2">
              <Field
                label="Heading Line 1"
                value={config.hero.heading}
                onChange={(v) => setHero({ heading: v })}
                placeholder="Explore the World"
              />
              <Field
                label="Heading Highlight (line 2)"
                value={config.hero.headingHighlight}
                onChange={(v) => setHero({ headingHighlight: v })}
                placeholder="with Kala Travels"
              />
            </div>
            <Field
              label="Subheading"
              value={config.hero.subheading}
              onChange={(v) => setHero({ subheading: v })}
              placeholder="Flights, Buses & Holiday Packages at Best Prices"
            />
            <div className="grid gap-4 sm:grid-cols-2">
              <Field
                label="Primary Button Text"
                value={config.hero.primaryButtonText}
                onChange={(v) => setHero({ primaryButtonText: v })}
                placeholder="Book Now"
              />
              <Field
                label="Primary Button Link"
                value={config.hero.primaryButtonLink}
                onChange={(v) => setHero({ primaryButtonLink: v })}
                placeholder="/tours"
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field
                label="Secondary Button Text"
                value={config.hero.secondaryButtonText}
                onChange={(v) => setHero({ secondaryButtonText: v })}
                placeholder="Enquire Now"
              />
              <Field
                label="Secondary Button Link"
                value={config.hero.secondaryButtonLink}
                onChange={(v) => setHero({ secondaryButtonLink: v })}
                placeholder="/contact"
              />
            </div>
          </div>
        )}
      </div>

      {/* Testimonials Section */}
      <div className="admin-card overflow-hidden p-0">
        <SectionHeader
          icon={MessageSquare}
          title="Testimonials"
          subtitle={`Background image and customer reviews shown on the homepage (${items.length} testimonial${items.length !== 1 ? "s" : ""})`}
          expanded={expanded.testimonials}
          onToggle={() => toggle("testimonials")}
        />
        {expanded.testimonials && (
          <div className="border-t border-gray-100 dark:border-slate-700 p-5 space-y-5">
            {/* Background image */}
            <SingleImageUploader
              label="Section Background Image"
              value={config.testimonials.backgroundImage}
              onChange={setTestimonialsBg}
              aspect={16 / 9}
              aspectLabel="16:9 (testimonials bg)"
            />

            <div className="border-t border-gray-100 dark:border-slate-700 pt-5">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm font-semibold text-navy-800 dark:text-slate-100">
                    Customer Testimonials
                  </p>
                  <p className="text-xs text-gray-500 dark:text-slate-400 mt-0.5">
                    Add reviews that appear on the homepage. Save page after making changes.
                  </p>
                </div>
                {!showAddForm && (
                  <button
                    type="button"
                    onClick={() => { setShowAddForm(true); setEditingId(null); }}
                    className="admin-btn-primary flex items-center gap-1.5 text-xs px-3 py-1.5"
                  >
                    <Plus size={13} />
                    Add Testimonial
                  </button>
                )}
              </div>

              {/* Add form */}
              {showAddForm && (
                <div className="mb-4">
                  <TestimonialForm
                    initial={EMPTY_TESTIMONIAL}
                    onSave={addTestimonial}
                    onCancel={() => setShowAddForm(false)}
                  />
                </div>
              )}

              {/* List */}
              {items.length === 0 && !showAddForm ? (
                <div className="rounded-xl border border-dashed border-gray-200 dark:border-slate-700 py-10 text-center">
                  <MessageSquare size={28} className="mx-auto text-gray-300 dark:text-slate-600" />
                  <p className="mt-2 text-sm text-gray-400 dark:text-slate-500">
                    No testimonials yet. Add your first one.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {items.map((item) =>
                    editingId === item.id ? (
                      <TestimonialForm
                        key={item.id}
                        initial={{ name: item.name, location: item.location, rating: item.rating, text: item.text }}
                        onSave={(data) => updateTestimonial(item.id, data)}
                        onCancel={() => setEditingId(null)}
                      />
                    ) : (
                      <TestimonialCard
                        key={item.id}
                        item={item}
                        onEdit={() => { setEditingId(item.id); setShowAddForm(false); }}
                        onDelete={() => deleteTestimonial(item.id)}
                      />
                    )
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* CTA Banner */}
      <div className="admin-card overflow-hidden p-0">
        <SectionHeader
          icon={Type}
          title="CTA Banner"
          subtitle="Call-to-action banner near the bottom of the homepage"
          expanded={expanded.ctaBanner}
          onToggle={() => toggle("ctaBanner")}
        />
        {expanded.ctaBanner && (
          <div className="border-t border-gray-100 dark:border-slate-700 p-5 space-y-4">
            <SingleImageUploader
              label="Background Image"
              value={config.ctaBanner.backgroundImage}
              onChange={(v) => setCtaBanner({ backgroundImage: v })}
              aspect={16 / 9}
              aspectLabel="16:9 (CTA banner)"
            />
            <Field
              label="Heading"
              value={config.ctaBanner.heading}
              onChange={(v) => setCtaBanner({ heading: v })}
              placeholder="Ready to Start Your Journey?"
            />
            <Field
              label="Subtext"
              value={config.ctaBanner.subtext}
              onChange={(v) => setCtaBanner({ subtext: v })}
              placeholder="Join thousands of happy travelers..."
              textarea
            />
            <div className="grid gap-4 sm:grid-cols-2">
              <Field
                label="Primary Button Text"
                value={config.ctaBanner.primaryButtonText}
                onChange={(v) => setCtaBanner({ primaryButtonText: v })}
                placeholder="Browse Packages"
              />
              <Field
                label="Secondary Button Text"
                value={config.ctaBanner.secondaryButtonText}
                onChange={(v) => setCtaBanner({ secondaryButtonText: v })}
                placeholder="Contact Us"
              />
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="admin-card overflow-hidden p-0">
        <SectionHeader
          icon={Palette}
          title="Footer"
          subtitle="Footer background, company info, contact details and social links"
          expanded={expanded.footer}
          onToggle={() => toggle("footer")}
        />
        {expanded.footer && (
          <div className="border-t border-gray-100 dark:border-slate-700 p-5 space-y-4">
            <SingleImageUploader
              label="Background Image"
              value={config.footer.backgroundImage}
              onChange={(v) => setFooter({ backgroundImage: v })}
              aspect={16 / 9}
              aspectLabel="16:9 (footer bg)"
            />
            <div className="grid gap-4 sm:grid-cols-2">
              <Field
                label="Company Name"
                value={config.footer.companyName}
                onChange={(v) => setFooter({ companyName: v })}
                placeholder="KaNa Travels"
              />
              <Field
                label="Tagline (below name)"
                value={config.footer.tagline}
                onChange={(v) => setFooter({ tagline: v })}
                placeholder="& Holidays"
              />
            </div>
            <Field
              label="Description"
              value={config.footer.description}
              onChange={(v) => setFooter({ description: v })}
              textarea
            />
            <Field
              label="Address"
              value={config.footer.address}
              onChange={(v) => setFooter({ address: v })}
              textarea
            />
            <div className="grid gap-4 sm:grid-cols-2">
              <Field
                label="Phone"
                value={config.footer.phone}
                onChange={(v) => setFooter({ phone: v })}
                placeholder="+91 12345 67890"
              />
              <Field
                label="Email"
                value={config.footer.email}
                onChange={(v) => setFooter({ email: v })}
                placeholder="info@kanatravels.com"
              />
            </div>
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-slate-500 pt-2">
              Social Links
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field
                label="Facebook URL"
                value={config.footer.facebook}
                onChange={(v) => setFooter({ facebook: v })}
                placeholder="https://facebook.com/yourpage"
              />
              <Field
                label="Instagram URL"
                value={config.footer.instagram}
                onChange={(v) => setFooter({ instagram: v })}
                placeholder="https://instagram.com/yourpage"
              />
              <Field
                label="Twitter / X URL"
                value={config.footer.twitter}
                onChange={(v) => setFooter({ twitter: v })}
                placeholder="https://twitter.com/yourpage"
              />
              <Field
                label="YouTube URL"
                value={config.footer.youtube}
                onChange={(v) => setFooter({ youtube: v })}
                placeholder="https://youtube.com/@yourpage"
              />
            </div>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between pb-4">
        <button
          type="button"
          onClick={handleReset}
          className="flex items-center gap-2 rounded-lg border border-gray-200 dark:border-slate-700 px-4 py-2 text-sm font-medium text-gray-600 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors"
        >
          <RotateCcw size={15} />
          Reset to Defaults
        </button>
        <button
          onClick={handleSave}
          disabled={saving}
          className="admin-btn-primary flex items-center gap-2"
        >
          {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
}
