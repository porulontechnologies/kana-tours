"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Plus, X, Save } from "lucide-react";
import toast from "react-hot-toast";
import apiClient from "@/lib/api-client";
import MultiImageUploader from "@/components/MultiImageUploader";

interface ItineraryDay {
  day: number;
  title: string;
  description: string;
  activities: string[];
}

export default function CreatePackagePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});

  const fieldError = (field: string) =>
    fieldErrors[field]?.length ? (
      <p className="mt-1 text-xs text-red-500">{fieldErrors[field][0]}</p>
    ) : null;

  const [formData, setFormData] = useState({
    name: "",
    destination: "",
    duration: "",
    nights: "",
    maxGroupSize: "",
    price: "",
    discountedPrice: "",
    category: "Adventure",
    description: "",
    featured: false,
  });

  const [inclusions, setInclusions] = useState<string[]>([""]);
  const [exclusions, setExclusions] = useState<string[]>([""]);
  const [itinerary, setItinerary] = useState<ItineraryDay[]>([
    { day: 1, title: "", description: "", activities: [""] },
  ]);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [startDates, setStartDates] = useState<string[]>([""]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      setFormData({ ...formData, [name]: (e.target as HTMLInputElement).checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const addListItem = (setter: React.Dispatch<React.SetStateAction<string[]>>) => {
    setter((prev) => [...prev, ""]);
  };
  const removeListItem = (setter: React.Dispatch<React.SetStateAction<string[]>>, index: number) => {
    setter((prev) => prev.filter((_, i) => i !== index));
  };
  const updateListItem = (
    setter: React.Dispatch<React.SetStateAction<string[]>>,
    index: number,
    value: string
  ) => {
    setter((prev) => {
      const updated = [...prev];
      updated[index] = value;
      return updated;
    });
  };

  const addItineraryDay = () => {
    setItinerary((prev) => [
      ...prev,
      { day: prev.length + 1, title: "", description: "", activities: [""] },
    ]);
  };
  const removeItineraryDay = (index: number) => {
    setItinerary((prev) =>
      prev.filter((_, i) => i !== index).map((d, i) => ({ ...d, day: i + 1 }))
    );
  };
  const updateItineraryField = (
    index: number,
    field: keyof ItineraryDay,
    value: string
  ) => {
    setItinerary((prev) => {
      const updated = [...prev];
      (updated[index] as unknown as Record<string, unknown>)[field] = value;
      return updated;
    });
  };
  const addItineraryActivity = (dayIndex: number) => {
    setItinerary((prev) => {
      const updated = [...prev];
      updated[dayIndex].activities.push("");
      return updated;
    });
  };
  const removeItineraryActivity = (dayIndex: number, actIndex: number) => {
    setItinerary((prev) => {
      const updated = [...prev];
      updated[dayIndex].activities = updated[dayIndex].activities.filter(
        (_, i) => i !== actIndex
      );
      return updated;
    });
  };
  const updateItineraryActivity = (
    dayIndex: number,
    actIndex: number,
    value: string
  ) => {
    setItinerary((prev) => {
      const updated = [...prev];
      updated[dayIndex].activities[actIndex] = value;
      return updated;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      ...formData,
      isFeatured: formData.featured,
      duration: parseInt(formData.duration),
      nights: parseInt(formData.nights),
      maxGroupSize: parseInt(formData.maxGroupSize),
      price: parseFloat(formData.price),
      discountedPrice: formData.discountedPrice ? parseFloat(formData.discountedPrice) : undefined,
      inclusions: inclusions.filter((i) => i.trim() !== ""),
      exclusions: exclusions.filter((e) => e.trim() !== ""),
      itinerary: itinerary.map((day) => ({
        ...day,
        activities: day.activities.filter((a) => a.trim() !== ""),
      })),
      images: imageUrls.filter((url) => url.trim() !== ""),
      startDates: startDates.filter((d) => d.trim() !== ""),
    };

    try {
      setFieldErrors({});
      await apiClient.post("/packages", payload);
      toast.success("Package created successfully!");
      router.push("/packages");
    } catch (error: any) {
      const errors = error?.response?.data?.errors;
      if (errors && typeof errors === "object") {
        setFieldErrors(errors);
        toast.error("Please fix the errors below.");
      } else {
        toast.error(error?.response?.data?.message || "Failed to create package. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center gap-4">
        <Link
          href="/packages"
          className="p-2 rounded-lg hover:bg-gray-100 text-navy-600 transition-colors"
        >
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-navy-800">Create Tour Package</h1>
          <p className="text-sm text-gray-500 mt-1">Design a new tour package with full itinerary</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="admin-card">
          <h2 className="text-lg font-semibold text-navy-800 mb-4">Basic Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="admin-label">Package Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="e.g. Kashmir Paradise Tour"
                className="admin-input"
                required
              />
              {fieldError("name")}
            </div>
            <div>
              <label className="admin-label">Destination</label>
              <input
                type="text"
                name="destination"
                value={formData.destination}
                onChange={handleInputChange}
                placeholder="e.g. Kashmir"
                className="admin-input"
                required
              />
              {fieldError("destination")}
            </div>
            <div>
              <label className="admin-label">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="admin-select"
              >
                <option value="Adventure">Adventure</option>
                <option value="Nature">Nature</option>
                <option value="Heritage">Heritage</option>
                <option value="Beach">Beach</option>
                <option value="Pilgrimage">Pilgrimage</option>
                <option value="Honeymoon">Honeymoon</option>
                <option value="Wildlife">Wildlife</option>
                <option value="Luxury">Luxury</option>
              </select>
            </div>
            <div>
              <label className="admin-label">Duration (Days)</label>
              <input
                type="number"
                name="duration"
                value={formData.duration}
                onChange={handleInputChange}
                placeholder="e.g. 6"
                className="admin-input"
                min="1"
                required
              />
            </div>
            <div>
              <label className="admin-label">Nights</label>
              <input
                type="number"
                name="nights"
                value={formData.nights}
                onChange={handleInputChange}
                placeholder="e.g. 5"
                className="admin-input"
                min="0"
                required
              />
            </div>
            <div>
              <label className="admin-label">Max Group Size</label>
              <input
                type="number"
                name="maxGroupSize"
                value={formData.maxGroupSize}
                onChange={handleInputChange}
                placeholder="e.g. 20"
                className="admin-input"
                min="1"
                required
              />
            </div>
            <div>
              <label className="admin-label">Price (INR)</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                placeholder="e.g. 45000"
                className="admin-input"
                min="0"
                required
              />
              {fieldError("price")}
            </div>
            <div>
              <label className="admin-label">Discounted Price (INR, optional)</label>
              <input
                type="number"
                name="discountedPrice"
                value={formData.discountedPrice}
                onChange={handleInputChange}
                placeholder="e.g. 38000"
                className="admin-input"
                min="0"
              />
            </div>
            <div className="flex items-center gap-3">
              <label className="admin-label mb-0">Featured Package</label>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, featured: !formData.featured })}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  formData.featured ? "bg-gold-500" : "bg-gray-300"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${
                    formData.featured ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          </div>
          <div className="mt-4">
            <label className="admin-label">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Describe the tour package in detail..."
              className="admin-textarea"
              rows={4}
              required
            />
            {fieldError("description")}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="admin-card">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-navy-800">Inclusions</h2>
              <button
                type="button"
                onClick={() => addListItem(setInclusions)}
                className="text-sm text-navy-600 hover:text-navy-800 font-medium flex items-center gap-1"
              >
                <Plus size={14} />
                Add
              </button>
            </div>
            <div className="space-y-2">
              {inclusions.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => updateListItem(setInclusions, index, e.target.value)}
                    placeholder="e.g. Airport transfers"
                    className="admin-input text-sm py-2"
                  />
                  {inclusions.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeListItem(setInclusions, index)}
                      className="p-1.5 text-gray-400 hover:text-red-500 flex-shrink-0"
                    >
                      <X size={16} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="admin-card">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-navy-800">Exclusions</h2>
              <button
                type="button"
                onClick={() => addListItem(setExclusions)}
                className="text-sm text-navy-600 hover:text-navy-800 font-medium flex items-center gap-1"
              >
                <Plus size={14} />
                Add
              </button>
            </div>
            <div className="space-y-2">
              {exclusions.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => updateListItem(setExclusions, index, e.target.value)}
                    placeholder="e.g. Personal expenses"
                    className="admin-input text-sm py-2"
                  />
                  {exclusions.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeListItem(setExclusions, index)}
                      className="p-1.5 text-gray-400 hover:text-red-500 flex-shrink-0"
                    >
                      <X size={16} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="admin-card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-navy-800">Itinerary</h2>
            <button
              type="button"
              onClick={addItineraryDay}
              className="admin-btn-secondary text-sm flex items-center gap-1"
            >
              <Plus size={14} />
              Add Day
            </button>
          </div>
          <div className="space-y-4">
            {itinerary.map((day, dayIndex) => (
              <div
                key={dayIndex}
                className="border border-gray-200 rounded-lg p-4 bg-gray-50/50"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-navy-600 text-white rounded-lg flex items-center justify-center text-sm font-bold">
                      {day.day}
                    </div>
                    <span className="text-sm font-semibold text-navy-700">
                      Day {day.day}
                    </span>
                  </div>
                  {itinerary.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeItineraryDay(dayIndex)}
                      className="p-1.5 text-gray-400 hover:text-red-500"
                    >
                      <X size={16} />
                    </button>
                  )}
                </div>
                <div className="space-y-3">
                  <div>
                    <label className="admin-label">Title</label>
                    <input
                      type="text"
                      value={day.title}
                      onChange={(e) =>
                        updateItineraryField(dayIndex, "title", e.target.value)
                      }
                      placeholder="e.g. Arrival in Srinagar"
                      className="admin-input text-sm"
                    />
                  </div>
                  <div>
                    <label className="admin-label">Description</label>
                    <textarea
                      value={day.description}
                      onChange={(e) =>
                        updateItineraryField(dayIndex, "description", e.target.value)
                      }
                      placeholder="Describe the day's plan..."
                      className="admin-textarea text-sm"
                      rows={2}
                    />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="admin-label mb-0">Activities</label>
                      <button
                        type="button"
                        onClick={() => addItineraryActivity(dayIndex)}
                        className="text-xs text-navy-600 hover:text-navy-800 font-medium flex items-center gap-0.5"
                      >
                        <Plus size={12} />
                        Add
                      </button>
                    </div>
                    <div className="space-y-2">
                      {day.activities.map((activity, actIndex) => (
                        <div key={actIndex} className="flex items-center gap-2">
                          <input
                            type="text"
                            value={activity}
                            onChange={(e) =>
                              updateItineraryActivity(dayIndex, actIndex, e.target.value)
                            }
                            placeholder="e.g. Shikara ride on Dal Lake"
                            className="admin-input text-sm py-1.5"
                          />
                          {day.activities.length > 1 && (
                            <button
                              type="button"
                              onClick={() =>
                                removeItineraryActivity(dayIndex, actIndex)
                              }
                              className="p-1 text-gray-400 hover:text-red-500 flex-shrink-0"
                            >
                              <X size={14} />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="admin-card">
            <h2 className="text-lg font-semibold text-navy-800 mb-1">Images</h2>
            <p className="text-xs text-gray-500 mb-4">
              Upload photos — each will be cropped to 3:2 to match the tour listing card display.
            </p>
            <MultiImageUploader
              images={imageUrls}
              onChange={setImageUrls}
              aspect={3 / 2}
              aspectLabel="3:2 (tour listing)"
              maxImages={10}
            />
          </div>

          <div className="admin-card">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-navy-800">Start Dates</h2>
              <button
                type="button"
                onClick={() => addListItem(setStartDates)}
                className="text-sm text-navy-600 hover:text-navy-800 font-medium flex items-center gap-1"
              >
                <Plus size={14} />
                Add
              </button>
            </div>
            <div className="space-y-2">
              {startDates.map((date, index) => (
                <div key={index} className="flex items-center gap-2">
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => updateListItem(setStartDates, index, e.target.value)}
                    className="admin-input text-sm py-2"
                  />
                  {startDates.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeListItem(setStartDates, index)}
                      className="p-1.5 text-gray-400 hover:text-red-500 flex-shrink-0"
                    >
                      <X size={16} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-2">
          <Link href="/packages" className="admin-btn-secondary">
            Cancel
          </Link>
          <button
            type="submit"
            disabled={loading}
            className="admin-btn-primary flex items-center gap-2"
          >
            <Save size={18} />
            {loading ? "Creating..." : "Create Package"}
          </button>
        </div>
      </form>
    </div>
  );
}
