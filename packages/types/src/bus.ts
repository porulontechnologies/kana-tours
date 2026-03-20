export interface BusSearchParams {
  source: string;
  destination: string;
  date: string;
}

export interface BusResult {
  id: string;
  tripId: string;
  operator: string;
  operatorLogo?: string;
  busType: string;
  departure: {
    time: string;
    location: string;
  };
  arrival: {
    time: string;
    location: string;
  };
  duration: string;
  price: number;
  currency: string;
  seatsAvailable: number;
  amenities: string[];
  rating?: number;
  boardingPoints: BoardingPoint[];
  droppingPoints: BoardingPoint[];
}

export interface BoardingPoint {
  id: string;
  name: string;
  address?: string;
  time: string;
}

export interface SeatLayout {
  tripId: string;
  totalSeats: number;
  availableSeats: number;
  rows: SeatRow[];
}

export interface SeatRow {
  rowNumber: number;
  seats: Seat[];
}

export interface Seat {
  seatNumber: string;
  isAvailable: boolean;
  price: number;
  type: "SEATER" | "SLEEPER" | "SEMI_SLEEPER";
  position: "WINDOW" | "AISLE" | "MIDDLE";
}

export interface BusBookingInput {
  tripId: string;
  boardingPointId: string;
  droppingPointId: string;
  seats: string[];
  passengers: BusPassenger[];
  contactEmail: string;
  contactPhone: string;
  paymentGateway: "RAZORPAY" | "PAYU";
}

export interface BusPassenger {
  name: string;
  age: number;
  gender: "M" | "F" | "O";
  seatNumber: string;
}
