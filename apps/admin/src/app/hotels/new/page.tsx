"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";
import toast from "react-hot-toast";
import apiClient from "@/lib/api-client";
import MultiImageUploader from "@/components/MultiImageUploader";

const amenitiesList = [
  "WiFi",
  "Swimming Pool",
  "Gym",
  "Spa",
  "Restaurant",
  "Bar",
  "Room Service",
  "Parking",
  "Air Conditioning",
  "Laundry",
  "Conference Room",
  "Airport Shuttle",
  "Pet Friendly",
  "Business Center",
  "Kids Play Area",
];

export default function CreateHotelPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    address: "",
    city: "",
    state: "",
    country: "India",
    pincode: "",
    starRating: "3",
    pricePerNight: "",
    contactEmail: "",
    contactPhone: "",
  });
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  const fieldError = (field: string) =>
    fieldErrors[field]?.length ? (
      <p className="mt-1 text-xs text-red-500">{fieldErrors[field][0]}</p>
    ) : null;

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const toggleAmenity = (amenity: string) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity) ? prev.filter((a) => a !== amenity) : [...prev, amenity]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      ...formData,
      starRating: parseInt(formData.starRating),
      pricePerNight: parseFloat(formData.pricePerNight),
      amenities: selectedAmenities,
      images: imageUrls.filter((url) => url.trim() !== ""),
    };

    try {
      setFieldErrors({});
      await apiClient.post("/hotels", payload);
      toast.success("Hotel created successfully!");
      router.push("/hotels");
    } catch (error: any) {
      const errors = error?.response?.data?.errors;
      if (errors && typeof errors === "object") {
        setFieldErrors(errors);
        toast.error("Please fix the errors below.");
      } else {
        toast.error(error?.response?.data?.message || "Failed to create hotel. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center gap-4">
        <Link
          href="/hotels"
          className="p-2 rounded-lg hover:bg-gray-100 text-navy-600 transition-colors"
        >
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-navy-800">Add New Hotel</h1>
          <p className="text-sm text-gray-500 mt-1">Fill in the details to create a new hotel listing</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="admin-card">
          <h2 className="text-lg font-semibold text-navy-800 mb-4">Basic Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="admin-label">Hotel Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter hotel name"
                className="admin-input"
                required
              />
              {fieldError("name")}
            </div>
            <div className="md:col-span-2">
              <label className="admin-label">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Describe the hotel, its features and unique selling points..."
                className="admin-textarea"
                rows={4}
                required
              />
              {fieldError("description")}
            </div>
            <div>
              <label className="admin-label">Star Rating</label>
              <select
                name="starRating"
                value={formData.starRating}
                onChange={handleInputChange}
                className="admin-select"
              >
                <option value="1">1 Star</option>
                <option value="2">2 Stars</option>
                <option value="3">3 Stars</option>
                <option value="4">4 Stars</option>
                <option value="5">5 Stars</option>
              </select>
            </div>
            <div>
              <label className="admin-label">Price Per Night (INR)</label>
              <input
                type="number"
                name="pricePerNight"
                value={formData.pricePerNight}
                onChange={handleInputChange}
                placeholder="e.g. 5000"
                className="admin-input"
                min="0"
                required
              />
              {fieldError("pricePerNight")}
            </div>
          </div>
        </div>

        <div className="admin-card">
          <h2 className="text-lg font-semibold text-navy-800 mb-4">Location</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="admin-label">Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Street address"
                className="admin-input"
                required
              />
            </div>
            <div>
              <label className="admin-label">City</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                placeholder="City"
                className="admin-input"
                required
              />
            </div>
            <div>
              <label className="admin-label">State</label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleInputChange}
                placeholder="State"
                className="admin-input"
                required
              />
            </div>
            <div>
              <label className="admin-label">Country</label>
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                placeholder="Country"
                className="admin-input"
                required
              />
            </div>
            <div>
              <label className="admin-label">Pincode</label>
              <input
                type="text"
                name="pincode"
                value={formData.pincode}
                onChange={handleInputChange}
                placeholder="Pincode"
                className="admin-input"
              />
              {fieldError("pincode")}
            </div>
          </div>
        </div>

        <div className="admin-card">
          <h2 className="text-lg font-semibold text-navy-800 mb-4">Amenities</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
            {amenitiesList.map((amenity) => (
              <label
                key={amenity}
                className={`flex items-center gap-2 px-3 py-2.5 rounded-lg border cursor-pointer transition-all ${
                  selectedAmenities.includes(amenity)
                    ? "bg-navy-50 border-navy-300 text-navy-700"
                    : "border-gray-200 text-gray-600 hover:border-gray-300"
                }`}
              >
                <input
                  type="checkbox"
                  checked={selectedAmenities.includes(amenity)}
                  onChange={() => toggleAmenity(amenity)}
                  className="w-4 h-4 rounded border-gray-300 text-navy-600 focus:ring-navy-500"
                />
                <span className="text-sm">{amenity}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="admin-card">
          <h2 className="text-lg font-semibold text-navy-800 mb-4">Contact Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="admin-label">Contact Email</label>
              <input
                type="email"
                name="contactEmail"
                value={formData.contactEmail}
                onChange={handleInputChange}
                placeholder="hotel@example.com"
                className="admin-input"
              />
              {fieldError("contactEmail")}
            </div>
            <div>
              <label className="admin-label">Contact Phone</label>
              <input
                type="tel"
                name="contactPhone"
                value={formData.contactPhone}
                onChange={handleInputChange}
                placeholder="+91 9876543210"
                className="admin-input"
              />
              {fieldError("contactPhone")}
            </div>
          </div>
        </div>

        <div className="admin-card">
          <h2 className="text-lg font-semibold text-navy-800 mb-1">Images</h2>
          <p className="text-xs text-gray-500 mb-4">
            Upload photos — each will be cropped to 4:3 to match the hotel listing card display.
          </p>
          <MultiImageUploader
            images={imageUrls}
            onChange={setImageUrls}
            aspect={4 / 3}
            aspectLabel="4:3 (hotel listing)"
            maxImages={10}
          />
        </div>

        <div className="flex items-center justify-end gap-3 pt-2">
          <Link href="/hotels" className="admin-btn-secondary">
            Cancel
          </Link>
          <button
            type="submit"
            disabled={loading}
            className="admin-btn-primary flex items-center gap-2"
          >
            <Save size={18} />
            {loading ? "Creating..." : "Create Hotel"}
          </button>
        </div>
      </form>
    </div>
  );
}
