// Brand colors extracted from KaNa Travels logo
export const BRAND_COLORS = {
  primary: "#1B3A5C",       // Deep Navy Blue
  primaryLight: "#2A5580",
  primaryDark: "#0F2640",
  accent: "#E8A317",        // Golden Amber
  accentLight: "#F0BA45",
  accentDark: "#C48A10",
  secondary: "#4A90D9",     // Sky Blue
  secondaryLight: "#6AADE6",
  secondaryDark: "#3570B0",
  background: "#F0F4F8",
  backgroundDark: "#E2E8F0",
  surface: "#FFFFFF",
  text: "#1A202C",
  textSecondary: "#4A5568",
  textMuted: "#A0AEC0",
  success: "#38A169",
  warning: "#DD6B20",
  error: "#E53E3E",
  info: "#3182CE",
} as const;

export const APP_NAME = "KaNa Travels and Holidays";
export const APP_SHORT_NAME = "KaNa Travels";

export const TOUR_CATEGORIES = [
  "ADVENTURE",
  "LEISURE",
  "PILGRIMAGE",
  "HONEYMOON",
  "FAMILY",
  "WILDLIFE",
  "BEACH",
  "MOUNTAIN",
] as const;

export const ROOM_TYPES = [
  "SINGLE",
  "DOUBLE",
  "TWIN",
  "SUITE",
  "DELUXE",
  "PREMIUM",
] as const;

export const HOTEL_AMENITIES = [
  "WiFi",
  "Parking",
  "Pool",
  "Gym",
  "Restaurant",
  "Bar",
  "Spa",
  "Room Service",
  "Laundry",
  "AC",
  "TV",
  "Hot Water",
  "Power Backup",
  "CCTV",
  "Elevator",
] as const;

export const BUS_AMENITIES = [
  "AC",
  "Non-AC",
  "WiFi",
  "Charging Point",
  "Blanket",
  "Water Bottle",
  "Reading Light",
  "Track My Bus",
] as const;

export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
  MAX_LIMIT: 100,
} as const;
