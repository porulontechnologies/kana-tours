export interface Hotel {
  id: string;
  name: string;
  slug: string;
  description: string;
  address: string;
  city: string;
  state: string;
  country: string;
  pincode?: string | null;
  latitude?: number | null;
  longitude?: number | null;
  starRating: number;
  amenities: string[];
  images: string[];
  pricePerNight: number;
  contactEmail?: string | null;
  contactPhone?: string | null;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  rooms?: Room[];
}

export interface Room {
  id: string;
  hotelId: string;
  type: string;
  capacity: number;
  pricePerNight: number;
  amenities: string[];
  images: string[];
  totalRooms: number;
  isActive: boolean;
}

export interface CreateHotelInput {
  name: string;
  description: string;
  address: string;
  city: string;
  state: string;
  country?: string;
  pincode?: string;
  latitude?: number;
  longitude?: number;
  starRating?: number;
  amenities?: string[];
  images?: string[];
  pricePerNight: number;
  contactEmail?: string;
  contactPhone?: string;
}

export interface CreateRoomInput {
  type: string;
  capacity: number;
  pricePerNight: number;
  amenities?: string[];
  images?: string[];
  totalRooms: number;
}

export interface HotelFilters {
  city?: string;
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  amenities?: string[];
  page?: number;
  limit?: number;
}
