"use client";

import dayjs, { type Dayjs } from "dayjs";
import { useAtom } from "jotai/react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { FishingAtom } from "~/utils/stores";
import { api } from "~/trpc/react";
import { Button } from "../ui/button";

export const Calendar = () => {
  const router = useRouter();
  const [currentDate, setCurrentDate] = useState<Dayjs>(dayjs());
  const [bookingDate, setBookingDate] = useState<Dayjs>();
  const [fishingData, setFishingData] = useAtom(FishingAtom);

  const bookingBlock = api.booking.getFishingBlockDates.useQuery({
    booking_type: fishingData.daySlot ?? "",
    booking_time: fishingData.timeSlot ?? "",
  });

  const blockBookingsAccordingToBoats = api.booking.getBlockedDates.useQuery({
    numberOfPeople: fishingData.adult ?? 0 + fishingData.infants ?? 0,
    bookingType: "fishing",
    time: fishingData.timeSlot ?? "",
  });
  console.log(blockBookingsAccordingToBoats.data?.blockedDateSet);

  const totalPeople = useMemo(() => {
    return fishingData.adult ?? 0 + fishingData.infants ?? 0;
  }, [fishingData]);

  const currentMonth: Dayjs[][] = useMemo(() => {
    const currentMonth = currentDate ?? dayjs();
    const firstDay = currentMonth.clone().startOf("month").day();
    const daysInMonth = currentMonth.daysInMonth();
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
    const totalPeople = fishingData.adult ?? 1;
    let price = 0;
    switch (fishingData.daySlot) {
      case "full_day":
        if (totalPeople < 2) {
          price = 1100;
        } else {
          price = 1100 + (totalPeople - 2) * 40;
        }
        // return totalPeople  * 1100;
        break;

      case "half_day":
        if (totalPeople < 2) {
          price = 550;
        } else {
          price = 550 + (totalPeople - 2) * 40;
        }
        break;
      // return totalPeople * 550;
      default:
        price = 0;
        return 0;
    }
    return price;
  }, [fishingData.adult, fishingData.daySlot]);

  const handlePreviousMonth = () => {
    const newDate = currentDate ?? dayjs();
    setCurrentDate(newDate.clone().subtract(1, "month"));
  };

  const handleNextMonth = () => {
    const newDate = currentDate ?? dayjs();
    setCurrentDate(newDate.clone().add(1, "month"));
  };

  const isBookingTimeOver = (date: Dayjs): boolean => {
    const now = dayjs();
    const hoursLeft = date.diff(now, "hour");
    if (fishingData.daySlot === "full_day") {
      return hoursLeft < 12;
    } else if (fishingData.daySlot === "half_day") {
      if (fishingData.timeSlot === "morning") {
        return hoursLeft < 1;
      } else {
        return false;
      }
    }
    return true;
  };

  const DateTemplate = ({ date }: { date: Dayjs }) => {
    if (!date) return <td className="border border-gray-600"></td>;

    const isPast = date.isBefore(dayjs(), "day");
    const isReserved = bookingBlock.data?.some(
      (blockDate) => date.format("YYYY-MM-DD") === blockDate,
    );
    // console.log()

    // Memoize bookingForCurrentDate to avoid unnecessary calculations
    const bookingForCurrentDate = useMemo(() => {
      return blockBookingsAccordingToBoats.data?.blockedDateSet?.find(
        (blockDate) => blockDate.date === date.format("YYYY-MM-DD"),
      );
    }, [blockBookingsAccordingToBoats.data, date]);

    // Memoize isTodayBooked to avoid unnecessary calculations
    const isTodayBooked = useMemo(() => {
      return bookingForCurrentDate ? bookingForCurrentDate.isBlocked : false;
    }, [bookingForCurrentDate]);

    const boat = useMemo(() => {
      return bookingForCurrentDate ? bookingForCurrentDate.boatAvailable : "";
    }, [bookingForCurrentDate]);
    // useEffect(() => {
    //   const boat = bookingForCurrentDate
    //     ? bookingForCurrentDate.boatAvailable
    //     : "";
    //   if (fishingData.boat !== boat) {
    //     setFishingData((prev) => ({
    //       ...prev,
    //       boat: boat,
    //     }));
    //   }
    // }, [bookingForCurrentDate, fishingData.boat]);

    // console.log("bookingForCurrentDate", bookingForCurrentDate);
    // console.log(isReserved);
    const isTimeOver = isBookingTimeOver(date);

    return (
      <td className="relative h-[2.5rem] w-fit border-[1px] border-gray-600 md:h-[6rem] md:w-[2rem]">
        <Button
          variant={"outline"}
          type="button"
          className={`absolute left-0 top-0 h-full w-full rounded-none border-0 p-0 ${
            bookingDate?.isSame(date) &&
            "bg-[#1f788b]/80 text-[#f7fcfc] hover:bg-[#1f788b]/90 hover:text-[#f7fcfc] [&_span]:text-[#f7fcfc]"
          }`}
          disabled={
            isPast ||
            isReserved ||
            isTimeOver ||
            isTodayBooked ||
            totalPeople > 27
          }
          onClick={() => {
            setBookingDate(() => date);
            setFishingData((prev) => ({
              ...prev,
              price: currentPrice,
              date: date.format("YYYY-MM-DD"),
              boat: boat,
            }));
          }}
        >
          <p className="flex flex-col gap-[1px] text-[10px] text-black/70 md:gap-1 md:text-base">
            <span className={`font-bold`}>{date.date()}</span>
            {!isPast &&
            !isReserved &&
            !isTimeOver &&
            !isTodayBooked &&
            totalPeople <= 27 ? (
              <span>{currentPrice} €</span>
            ) : (
              <span>N/A</span>
            )}
          </p>
        </Button>
      </td>
    );
  };

  return (
    <div className="grid gap-4 md:px-6 md:pt-6">
      <div className="my-6 flex w-full items-center justify-between gap-4">
        <Button
          type="button"
          className="text-xs md:text-lg"
          onClick={handlePreviousMonth}
        >
          Prev
        </Button>
        <p className="text-base md:text-xl">
          {currentDate
            ? currentDate.format("MMMM YYYY")
            : dayjs().format("MMMM YYYY")}
        </p>
        <Button
          type="button"
          className="text-xs md:text-lg"
          onClick={handleNextMonth}
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
      <div className="flex justify-center">
        <Button
          disabled={!bookingDate}
          type="button"
          onClick={() => router.push("/fishing/booking-form")}
          
        >
          Continue
        </Button>
      </div>
    </div>
  );
};
