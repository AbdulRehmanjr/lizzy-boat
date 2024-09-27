export const clearLocalStorage = () => {
  localStorage.removeItem("LizzyBoatBooking");
  localStorage.removeItem("LizzyPayPalAtom");
  localStorage.removeItem("LizzyPayPalId");
};

type BoatType = "ten_seater" | "seventeen_seater";

interface Booking {
  date: string;
  boat: BoatType;
  noOfPeople: number;
  bookingType: "snorkeling" | "fishing" | "transfer" | "charter" | "sunset";
  time: "morning" | "afternoon" | "full_day";
}

interface BookingCheckResult {
  canBook: boolean;
  boat?: BoatType;
  message?: string;
}

const boatCapacity: Record<BoatType, number> = {
  ten_seater: 10,
  seventeen_seater: 17,
};

export function canMakeBooking(
  bookings: Booking[],
  newBooking: Omit<Booking, "date" | "boat">,
): BookingCheckResult {
  const { bookingType, time, noOfPeople } = newBooking;

  // Initialize an object to store capacity and booking types for each boat
  const boatStatus: Record<
    BoatType,
    { totalNoOfPeople: number; bookings: Booking[] }
  > = {
    ten_seater: { totalNoOfPeople: 0, bookings: [] },
    seventeen_seater: { totalNoOfPeople: 0, bookings: [] },
  };

  // Separate and summarize bookings for each boat
  bookings.forEach((booking) => {
    boatStatus[booking.boat].totalNoOfPeople += booking.noOfPeople;
    boatStatus[booking.boat].bookings.push(booking);
  });

  // Function to check conflicts for specific booking types and times
  const checkConflicts = (boat: BoatType): boolean => {
    const { totalNoOfPeople, bookings } = boatStatus[boat];

    for (const booking of bookings) {
      // For snorkeling and fishing: check if booking type and time are the same
      if (
        (bookingType === "snorkeling" || bookingType === "fishing") &&
        booking.bookingType === bookingType &&
        booking.time === time
      ) {
        return totalNoOfPeople + noOfPeople <= boatCapacity[boat];
      }

      // For transfer: if any booking of this type exists, return false
      if (bookingType === "transfer" && booking.bookingType === "transfer") {
        return false;
      }

      // For charter: check time conflicts
      if (bookingType === "charter") {
        if (
          booking.time === time ||
          booking.time === "full_day" ||
          time === "full_day"
        ) {
          return false;
        }
      }

      // For sunset: conflicts only with transfer
      if (bookingType === "sunset") {
        if (
          booking.bookingType === "sunset" ||
          booking.bookingType === "transfer"
        ) {
          return false;
        }
      }
    }

    // Check overall capacity
    return totalNoOfPeople + noOfPeople <= boatCapacity[boat];
  };

  // Check both boats
  const availableBoats: BoatType[] = ["ten_seater", "seventeen_seater"];
  for (const boat of availableBoats) {
    if (checkConflicts(boat)) {
      return {
        canBook: true,
        boat: boat,
        message: `Booking can be made on ${boat} boat.`,
      };
    }
  }

  // If no boats are available, return false
  return {
    canBook: false,
    message: "Booking cannot be made on any available boat.",
  };
}

// // Example usage
// const bookings = [
//   {
//     date: "2024-08-27",
//     boat: "ten_seater",
//     noOfPeople: 6,
//     bookingType: "fishing",
//     time: "morning",
//   },
//   {
//     date: "2024-08-27",
//     boat: "ten_seater",
//     noOfPeople: 4,
//     bookingType: "snorkeling",
//     time: "afternoon",
//   },
//   {
//     date: "2024-08-27",
//     boat: "seventeen_seater",
//     noOfPeople: 5,
//     bookingType: "charter",
//     time: "morning",
//   },
// ];

// const newBooking = {
//   noOfPeople: 2,
//   bookingType: "fishing",
//   time: "morning",
// };

// const result = canMakeBooking(bookings, newBooking);
// console.log(result);

export const getTourName = (pathName: string) => {
  if (pathName.includes("charter")) return "Charter";
  if (pathName.includes("transfer")) return "Transfer";
  if (pathName.includes("sunset")) return "Sunset";
  if (pathName.includes("snorkeling")) return "Snorkeling";
  if (pathName.includes("fishing")) return "Fishing";
};
