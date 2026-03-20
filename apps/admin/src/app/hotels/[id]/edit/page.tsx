"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Plus, X, Save, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import apiClient from "@/lib/api-client";

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


export default function EditHotelPage() {
  const router = useRouter();
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    address: "",
    city: "",
    state: "",
    country: "",
    pincode: "",
    starRating: "3",
    pricePerNight: "",
    contactEmail: "",
    contactPhone: "",
  });
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>([""]);

  useEffect(() => {
    async function fetchHotel() {
      try {
        const res = await apiClient.get(`/hotels/id/${params.id}`);
        const hotel = res.data.data;
        setFormData({
          name: hotel.name,
          description: hotel.description,
          address: hotel.address,
          city: hotel.city,
          state: hotel.state,
          country: hotel.country,
          pincode: hotel.pincode || "",
          starRating: String(hotel.starRating),
          pricePerNight: String(hotel.pricePerNight),
          contactEmail: hotel.contactEmail || "",
          contactPhone: hotel.contactPhone || "",
        });
        setSelectedAmenities(hotel.amenities || []);
        setImageUrls(hotel.images?.length ? hotel.images : [""]);
      } catch {
        toast.error("Failed to load hotel details.");
      } finally {
        setPageLoading(false);
      }
    }
    fetchHotel();
  }, [params.id]);

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

  const addImageUrl = () => setImageUrls([...imageUrls, ""]);
  const removeImageUrl = (index: number) => setImageUrls(imageUrls.filter((_, i) => i !== index));
  const updateImageUrl = (index: number, value: string) => {
    const updated = [...imageUrls];
    updated[index] = value;
    setImageUrls(updated);
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
      await apiClient.patch(`/hotels/${params.id}`, payload);
      toast.success("Hotel updated successfully!");
      router.push("/hotels");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to update hotel. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (pageLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 size={32} className="animate-spin text-navy-600" />
      </div>
    );
  }

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
          <h1 className="text-2xl font-bold text-navy-800">Edit Hotel</h1>
          <p className="text-sm text-gray-500 mt-1">
            Update details for {formData.name || "this hotel"}
          </p>
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
                className="admin-input"
                required
              />
            </div>
            <div className="md:col-span-2">
              <label className="admin-label">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="admin-textarea"
                rows={4}
                required
              />
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
                className="admin-input"
                min="0"
                required
              />
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
                className="admin-input"
                required
              />
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
                className="admin-input"
                required
              />
            </div>
            <div>
              <label className="admin-label">Contact Phone</label>
              <input
                type="tel"
                name="contactPhone"
                value={formData.contactPhone}
                onChange={handleInputChange}
                className="admin-input"
                required
              />
            </div>
          </div>
        </div>

        <div className="admin-card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-navy-800">Images</h2>
            <button
              type="button"
              onClick={addImageUrl}
              className="admin-btn-secondary text-sm flex items-center gap-1"
            >
              <Plus size={14} />
              Add Image URL
            </button>
          </div>
          <div className="space-y-3">
            {imageUrls.map((url, index) => (
              <div key={index} className="flex items-center gap-2">
                <input
                  type="url"
                  value={url}
                  onChange={(e) => updateImageUrl(index, e.target.value)}
                  placeholder="https://example.com/image.jpg"
                  className="admin-input"
                />
                {imageUrls.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeImageUrl(index)}
                    className="p-2 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors flex-shrink-0"
                  >
                    <X size={18} />
                  </button>
                )}
              </div>
            ))}
          </div>
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
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}
