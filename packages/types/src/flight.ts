export interface FlightSearchParams {
  origin: string;
  destination: string;
  departureDate: string;
  returnDate?: string;
  adults: number;
  children?: number;
  infants?: number;
  travelClass?: "ECONOMY" | "PREMIUM_ECONOMY" | "BUSINESS" | "FIRST";
  nonStop?: boolean;
}

export interface FlightOffer {
  id: string;
  airline: string;
  airlineLogo?: string;
  flightNumber: string;
  departure: {
    airport: string;
    terminal?: string;
    time: string;
  };
  arrival: {
    airport: string;
    terminal?: string;
    time: string;
  };
  duration: string;
  stops: number;
  price: {
    amount: number;
    currency: string;
  };
  seatsAvailable?: number;
  segments: FlightSegment[];
}

export interface FlightSegment {
  airline: string;
  flightNumber: string;
  departure: {
    airport: string;
    terminal?: string;
    time: string;
  };
  arrival: {
    airport: string;
    terminal?: string;
    time: string;
  };
  duration: string;
  aircraft?: string;
}

export interface FlightBookingInput {
  offerId: string;
  passengers: PassengerInfo[];
  contactEmail: string;
  contactPhone: string;
  paymentGateway: "RAZORPAY" | "PAYU";
}

export interface PassengerInfo {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: "MALE" | "FEMALE";
  passportNumber?: string;
  nationality?: string;
}
