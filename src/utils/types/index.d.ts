type BoatBookingTypeProps = {
  boatType: string | undefined;
  timeSlot: string | undefined;
  daySlot: string | undefined;
  date: string | undefined;
  price: number;
  adult: number | undefined;
  children: number | undefined;
  infants: number | undefined;
};

type FishingBookingProps = {
  boatType: string | undefined;
  timeSlot: string | undefined;
  daySlot: string | undefined;
  date: string | undefined;
  price: number;
  adult: number | undefined;
  infants: number;
  boat: string;
};

type TransferBookingProps = {
  depart_from: string | undefined;
  depart_from_return: string | undefined;
  transferType: string | undefined;
  startTime: string | undefined;
  endTime: string | undefined;
  blockTime: string | undefined;
  date: string | undefined;
  date_return: string | undefined;
  mode: string | undefined;
  price: number;
  adult: number;
  infants: number;
  boat: string;
};

type SunsetBookingProps = {
  date: string | undefined;
  price: number;
  adult: number;
  infants: number;
  boat: string;
};

type PrivateBookingProps = {
  timeSlot: string | undefined;
  daySlot: string | undefined;
  date: string | undefined;
  price: number;
  adult: number | undefined;
  boat: string;
  child_0_3: number,
  child_4_8: number,
  child_9_13: number,
  child_4_11: number,
  total_no_of_people: number,
};

type SnorkelingBookingProps = {
  timeSlot: string | undefined;
  daySlot: string | undefined;
  date: string | undefined;
  price: number;
  adult: number | undefined;
  child_0_3: number;
  child_4_8: number;
  child_9_13: number;
  child_4_11: number;
  total_no_of_people: number | undefined;
  boat: string | undefined;
};

type FormProps = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  information: string;
  extra: string;
  guesthouse: string;
};

type BookingProps = Partial<{
  boatType?: string;
  timeSlot?: string;
  daySlot?: string;
  date?: string;
  price?: number;
  adult?: number;
  child_0_3: number;
  child_4_8: number;
  child_9_13: number;
  child_4_11: number;
  children?: number;
  infants?: number;
  transferType?: string;
  startTime?: string;
  endTime?: string;
  blockTime?: string;
  duration?: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  information?: string;
  extra?: string;
  guesthouse?: string;
  mode?: string;
  date_return: string | undefined;
  depart_from: string | undefined;
  depart_from_return: string | undefined;
}>;

type SelectPeopleAge = {
  tagline: string;
  price: string;
  age_range: string;
};

type SelectPeopleAgeList = Record<string, SelectPeopleAge[]>;
type BoatType = "ten_seater" | "seventeen_seater";

type AdditionalBooking = {
  id?: string;
  paypalBoookingId?: string;
  date: string;
  boat: string;
  noOfPeople: number;
  bookingType: string;
  time: string;
};

interface BookingSummary {
  isBooked: boolean;
  isCapacityAvailable: boolean;
  bookingTypes: string[];
  totalNoOfPeople: number;
  morning: boolean;
  afternoon: boolean;
  full_day: boolean;
  // bookingTypes: string[];
  capacity: number;
}

// { id: string; paypalBoookingId: string; date: string; boat: string; noOfPeople: number; time: string; bookingType: string;
// date: string; bookingType: string; time: string; boat: string; noOfPeople: number;
