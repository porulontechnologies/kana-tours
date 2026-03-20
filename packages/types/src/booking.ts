export type BookingStatus =
  | "PENDING"
  | "CONFIRMED"
  | "CANCELLED"
  | "COMPLETED"
  | "REFUNDED";

export type BookingType = "TOUR_PACKAGE" | "HOTEL" | "FLIGHT" | "BUS";

export interface Booking {
  id: string;
  userId: string;
  bookingType: BookingType;
  status: BookingStatus;
  totalAmount: number;
  currency: string;
  hotelId?: string | null;
  roomId?: string | null;
  tourPackageId?: string | null;
  externalRef?: string | null;
  checkIn?: Date | null;
  checkOut?: Date | null;
  guestCount: number;
  specialRequests?: string | null;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  passengerDetails?: PassengerDetail[] | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface PassengerDetail {
  name: string;
  age: number;
  gender: "M" | "F" | "O";
  idType?: string;
  idNumber?: string;
}

export interface CreateBookingInput {
  bookingType: BookingType;
  hotelId?: string;
  roomId?: string;
  tourPackageId?: string;
  checkIn?: string;
  checkOut?: string;
  guestCount?: number;
  specialRequests?: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  passengerDetails?: PassengerDetail[];
  paymentGateway: "RAZORPAY" | "PAYU";
}
