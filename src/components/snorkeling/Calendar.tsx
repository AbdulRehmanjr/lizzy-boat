"use client";

import dayjs, { type Dayjs } from "dayjs";
import { useAtom } from "jotai/react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { SnorkelingAtom } from "~/utils/stores";
import { api } from "~/trpc/react";
import { Button } from "../ui/button";
// import { Button } from "../general/Button";

function getTotal(arr: any[], nameField: string, valueField: string) {
  return arr.reduce((acc, curr) => {
    const name = curr[nameField];
    const value = curr[valueField];

    if (!acc[name]) {
      acc[name] = 0;
    }

    acc[name] += value;
    return acc;
  }, {});
}

export const Calendar = () => {
  const router = useRouter();
  const [currentDate, setCurrentDate] = useState<Dayjs>(dayjs());
  const [bookingDate, setBookingDate] = useState<Dayjs>();
  const [seatsAvailable, setSeatsAvailable] = useState({
    ten_seater: 0,
    seventeen_seater: 0,
  });
  const [snorkeling, setSnorkeling] = useAtom(SnorkelingAtom);

  const bookingBlock = api.booking.getSnorkelingBlockDates.useQuery({
    booking_type: snorkeling.daySlot ?? "none",
    booking_time: snorkeling.timeSlot ?? "none",
    adult: snorkeling.adult ?? 0,
  });

  const allBookings = api.booking.getSnorkelingBoatsCapacity.useQuery();

  const blockBookingsAccordingToBoats = api.booking.getBlockedDates.useQuery({
    numberOfPeople:
      snorkeling.adult ??
      0 + snorkeling?.child_0_3 ??
      0 + snorkeling?.child_4_11 ??
      0 + snorkeling?.child_4_8 ??
      0 + snorkeling?.child_9_13 ??
      0,
    bookingType: "snorkeling",
    time: snorkeling.timeSlot ?? "",
  });
  console.log(blockBookingsAccordingToBoats.data?.blockedDateSet);

  // useMemo to calculate isCapacityFull and totalSeatsAvailable
  // const { isCapacityFull, totalSeatsAvailable } = useMemo(() => {
  //   const full_day = allBookings.data?.full_day;
  //   const half_day = allBookings.data?.half_day;
  //   const half_day_morning = half_day?.filter(
  //     (item) => item.time !== "morning",
  //   );
  //   const half_day_afternoon = half_day?.filter(
  //     (item) => item.time !== "afternoon",
  //   );
  //   const total_bookings = [...(full_day || []), ...(half_day || [])];
  //   const total_bookings_morning = [
  //     ...(full_day || []),
  //     ...(half_day_morning || []),
  //   ];
  //   const total_bookings_afternoon = [
  //     ...(full_day || []),
  //     ...(half_day_afternoon || []),
  //   ];
  //   const result_full_day = getTotal(
  //     total_bookings,
  //     "boat",
  //     "total_no_of_people",
  //   );
  //   const result_half_day_morning = getTotal(
  //     total_bookings_morning,
  //     "boat",
  //     "total_no_of_people",
  //   );
  //   const result_half_day_afternoon = getTotal(
  //     total_bookings_afternoon,
  //     "boat",
  //     "total_no_of_people",
  //   );
  //   if (
  //     snorkeling.daySlot === "half_day" &&
  //     snorkeling.timeSlot === "afternoon"
  //   ) {
  //     const availableSeats = {
  //       ten_seater: 10 - (result_half_day_afternoon.ten_seater ?? 0),
  //       seventeen_seater:
  //         17 - (result_half_day_afternoon.seventeen_seater ?? 0),
  //     };

  //     const total_seats =
  //       (result_half_day_afternoon.ten_seater ?? 0) +
  //       (result_half_day_afternoon.seventeen_seater ?? 0);

  //     return {
  //       isCapacityFull: total_seats > 27,
  //       totalSeatsAvailable: availableSeats,
  //     };
  //   }
  //   if (
  //     snorkeling.daySlot === "half_day" &&
  //     snorkeling.timeSlot === "morning"
  //   ) {
  //     const availableSeats = {
  //       ten_seater: 10 - (result_half_day_morning.ten_seater ?? 0),
  //       seventeen_seater: 17 - (result_half_day_morning.seventeen_seater ?? 0),
  //     };

  //     const total_seats =
  //       (result_half_day_morning.ten_seater ?? 0) +
  //       (result_half_day_morning.seventeen_seater ?? 0);

  //     return {
  //       isCapacityFull: total_seats > 27,
  //       totalSeatsAvailable: availableSeats,
  //     };
  //   }

  //   const availableSeats = {
  //     ten_seater: 10 - (result_full_day.ten_seater ?? 0),
  //     seventeen_seater: 17 - (result_full_day.seventeen_seater ?? 0),
  //   };

  //   const total_seats =
  //     (result_full_day.ten_seater ?? 0) +
  //     (result_full_day.seventeen_seater ?? 0);

  //   return {
  //     isCapacityFull: total_seats > 27,
  //     totalSeatsAvailable: availableSeats,
  //   };
  // }, [allBookings.data]);

  // useEffect to update seatsAvailable state
  // useEffect(() => {
  //   setSeatsAvailable(totalSeatsAvailable);
  // }, [totalSeatsAvailable]);

  // Memoized setBoat function
  const setBoat = useCallback(() => {
    console.log(
      ">>>Total No of people Selected<<<",
      snorkeling.total_no_of_people,
    );
    const peopleSelected = snorkeling.total_no_of_people ?? 0;

    if (peopleSelected <= seatsAvailable.ten_seater) {
      setSnorkeling((prev) => ({
        ...prev,
        boat: "ten_seater",
      }));
    } else if (peopleSelected <= seatsAvailable.seventeen_seater) {
      setSnorkeling((prev) => ({
        ...prev,
        boat: "seventeen_seater",
      }));
    } else {
      setSnorkeling((prev) => ({
        ...prev,
        boat: undefined,
      }));
    }
  }, [snorkeling.total_no_of_people, seatsAvailable, setSnorkeling]);

  // useEffect to call setBoat when necessary
  useEffect(() => {
    setBoat();
  }, [setBoat]);
  // console.log(">>>>>", isCapacityFull);
  const currentMonth: Dayjs[][] = useMemo(() => {
    const currentMonth = currentDate ?? dayjs();
    const firstDay = currentMonth.clone().startOf("month").day();
    const daysInMonth = currentMonth.daysInMonth();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const emptyDaysBefore: Dayjs[] = Array(firstDay).fill(null);
    const currentMonthDays: Dayjs[] = Array.from(
      { length: daysInMonth },
      (_, i) => dayjs(currentMonth).date(i + 1),
    );
    const calendarGrid: Dayjs[] = [...emptyDaysBefore, ...currentMonthDays];
    const weekgrid: Dayjs[][] = [];
    const chunkSize = 7;
    for (let i = 0; i < calendarGrid.length; i += chunkSize)
      weekgrid.push(calendarGrid.slice(i, i + chunkSize));
    return weekgrid;
  }, [currentDate]);

  const currentPrice = useMemo(() => {
    const allAdults = snorkeling.adult ?? 1;
    // const child_0_3 = snorkeling.child_0_3 ?? 0;
    const child_4_8 = snorkeling.child_4_8 ?? 0;
    const child_9_13 = snorkeling.child_9_13 ?? 0;
    const child_4_11 = snorkeling.child_4_11 ?? 0;
    const adultPrice =
      snorkeling?.daySlot === "full_day" ? 125 * allAdults : 65 * allAdults;
    // const child_0_3Price = 0;
    const child_4_8Price = child_4_8 * 25;
    const child_9_13Price = child_9_13 * 45;
    const child_4_11Price = child_4_11 * 65;

    switch (snorkeling.daySlot) {
      case "full_day":
        return adultPrice + child_4_11Price;
      case "half_day":
        return adultPrice + child_4_8Price + child_9_13Price;
      default:
        return 0;
    }
  }, [
    snorkeling.adult,
    snorkeling.daySlot,
    snorkeling.child_4_11,
    snorkeling.child_4_8,
    snorkeling.child_9_13,
  ]);

  const handlePreviousMonth = () => {
    const newDate = currentDate ?? dayjs();
    setCurrentDate(newDate.clone().subtract(1, "month"));
  };

  const handleNextMonth = () => {
    const newDate = currentDate ?? dayjs();
    setCurrentDate(newDate.clone().add(1, "month"));
  };

  const isBlocked = (date: Dayjs): boolean => {
    const dayOfWeek = date.day();
    if (snorkeling.daySlot == "full_day")
      return dayOfWeek === 0 || dayOfWeek === 6;
    return false;
  };

  const isBookingTimeOver = (date: Dayjs): boolean => {
    const now = dayjs();
    const hoursLeft = date.diff(now, "hour");

    if (snorkeling.daySlot === "full_day") {
      return hoursLeft < 12;
    } else if (snorkeling.daySlot === "half_day") {
      if (snorkeling.timeSlot === "morning") {
        return hoursLeft < 1;
      } else {
        return false;
      }
    }
    return false;
  };

  const DateTemplate = ({ date }: { date: Dayjs }) => {
    if (!date) return <td className="border-[1px] border-gray-600"></td>;
    const currDate: Dayjs = dayjs(new Date());

    const isPast = date.isBefore(dayjs(), "day");
    const isBlock = isBlocked(date);
    const isReserved = bookingBlock.data?.some(
      (blockDate) => date.format("YYYY-MM-DD") === blockDate,
    );
    const isTimeOver = isBookingTimeOver(date);

    // Disable the date if no boat is available
    const isBoatUnavailable = false;
    // block check for booking if already booked
    const bookingForCurrentDate =
      blockBookingsAccordingToBoats.data?.blockedDateSet?.find(
        (blockDate) => blockDate.date === date.format("YYYY-MM-DD"),
      );
    const isTodayBooked = bookingForCurrentDate
      ? bookingForCurrentDate?.isBlocked
      : false;

    const boat = useMemo(() => {
      return bookingForCurrentDate ? bookingForCurrentDate.boatAvailable : "";
    }, [bookingForCurrentDate]);

    const isDisabled =
      isPast ||
      isBlock ||
      isReserved ||
      isTimeOver ||
      // (isCapacityFull && date.isSame(currDate, "day")) ||
      isBoatUnavailable ||
      isTodayBooked;

    return (
      <td className="relative h-[2.5rem] w-fit border-[1px] border-gray-600 md:h-[6rem] md:w-[2rem]">
        <Button
          variant={"outline"}
          type="button"
          className={`absolute left-0 top-0 h-full w-full p-0 ${
            bookingDate?.isSame(date) &&
            "bg-[#1f788b]/80 text-[#f7fcfc] hover:bg-[#1f788b]/90 hover:text-[#f7fcfc] [&_span]:text-[#f7fcfc]"
          }`}
          disabled={isDisabled}
          onClick={() => {
            setBookingDate(() => date);
            setSnorkeling((prev) => ({
              ...prev,
              price: currentPrice,
              date: date.format("YYYY-MM-DD"),
              boat: boat,
            }));
          }}
        >
          <p
            className={`flex flex-col gap-[1px] text-[10px] md:gap-1 md:text-base`}
          >
            <span className={`font-bold text-[#1f788b]`}>{date.date()}</span>
            {!isDisabled ? <span>{currentPrice} €</span> : <span>N/A</span>}
          </p>
        </Button>
      </td>
    );
  };

  return (
    <div className="grid gap-4 md:p-6">
      <div className="my-6 flex w-full items-center justify-between gap-4">
        <Button
          type="button"
          onClick={handlePreviousMonth}
          className="text-xs md:text-lg"
        >
          Prev
        </Button>
        <p className="text-xs md:text-xl">
          {currentDate
            ? currentDate.format("MMMM YYYY")
            : dayjs().format("MMMM YYYY")}
        </p>
        <Button
          type="button"
          onClick={handleNextMonth}
          className="text-xs md:text-lg"
        >
          Next
        </Button>
      </div>
      <table>
        <thead>
          <tr className="text-xs sm:text-sm md:text-base lg:text-lg">
            <th className="min-w-[3rem] p-2 md:min-w-[6rem]">Sun</th>
            <th className="min-w-[3rem] p-2 md:min-w-[6rem]">Mon</th>
            <th className="min-w-[3rem] p-2 md:min-w-[6rem]">Tue</th>
            <th className="min-w-[3rem] p-2 md:min-w-[6rem]">Wed</th>
            <th className="min-w-[3rem] p-2 md:min-w-[6rem]">Thu</th>
            <th className="min-w-[3rem] p-2 md:min-w-[6rem]">Fri</th>
            <th className="min-w-[3rem] p-2 md:min-w-[6rem]">Sat</th>
          </tr>
        </thead>
        <tbody>
          {currentMonth?.map((data: Dayjs[], index: number) => (
            <tr
              key={index}
              className="text-center text-xs hover:cursor-pointer sm:text-sm md:text-base lg:text-lg"
            >
              {data.map((date: Dayjs, index: number) => (
                <DateTemplate key={index} date={date} />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {bookingDate && (
        <Button
          type="button"
          onClick={() => router.push("/snorkeling/booking-form")}
        >
          Continue
        </Button>
      )}
    </div>
  );
};
