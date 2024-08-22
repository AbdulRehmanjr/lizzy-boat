"use client";

import dayjs, { type Dayjs } from "dayjs";
import { useAtom } from "jotai/react";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { PrivateAtom } from "~/utils/stores";
import { api } from "~/trpc/react";
import { Button } from "../general/Button";

export const Calendar = () => {
  const router = useRouter();
  const [currentDate, setCurrentDate] = useState<Dayjs>(dayjs());
  const [bookingDate, setBookingDate] = useState<Dayjs>();
  const [privateData, setPrivateCharterData] = useAtom(PrivateAtom);

  const bookingBlock = api.booking.getPrivateBlockDates.useQuery({
    booking_type: privateData.daySlot ?? "none",
    booking_time: privateData.timeSlot ?? "none",
  });

  const blockBookingsAccordingToBoats = api.booking.getBlockedDates.useQuery({
    numberOfPeople: privateData.adult ?? 0 + privateData.infants ?? 0,
    bookingType: "charter",
    time: privateData.timeSlot ?? "",
  });
  console.log(blockBookingsAccordingToBoats.data?.blockedDateSet);

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
    const totalPeople = privateData.adult ?? 1;
    switch (privateData.daySlot) {
      case "full_day":
        return totalPeople <= 4
          ? 200 * totalPeople
          : (totalPeople - 4) * 40 + 800;
      case "half_day":
        return totalPeople <= 4
          ? 100 * totalPeople
          : (totalPeople - 4) * 40 + 400;
      default:
        return 0;
    }
  }, [privateData.adult, privateData.daySlot]);

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
    console.log(now);
    const hoursLeft = date.diff(now, "hour");
    if (privateData.daySlot === "full_day") {
      return hoursLeft < 24;
    } else if (privateData.daySlot === "half_day") {
      if (privateData.timeSlot === "morning") {
        return hoursLeft < 1;
      } else {
        return false;
      }
    }
    return true;
  };
  const isBlocked = (date: Dayjs): boolean => {
    const dayOfWeek = date.day();
    if (privateData.daySlot == "full_day")
      return dayOfWeek === 0 || dayOfWeek === 6;
    return false;
  };

  const DateTemplate = ({ date }: { date: Dayjs }) => {
    if (!date) return <td className="border-[1px] border-[#1f788b]"></td>;

    const isPast = date.isBefore(dayjs(), "day");
    const isBlock = isBlocked(date);
    const isReserved = bookingBlock.data?.some(
      (blockDate) => date.format("YYYY-MM-DD") === blockDate.date,
    );

    // block check for booking if already booked
    const bookingForCurrentDate =
      blockBookingsAccordingToBoats.data?.blockedDateSet?.find(
        (blockDate) => blockDate.date === date.format("YYYY-MM-DD"),
      );
    const isTodayBooked = bookingForCurrentDate
      ? bookingForCurrentDate?.isBlocked
      : false;

    const isTimeOver = isBookingTimeOver(date);

    return (
      <td className="relative h-[2.5rem] w-fit border-[1px] border-[#1f788b] md:h-[6rem] md:w-[2rem]">
        <Button
          variant={"outline"}
          type="button"
          className={`absolute left-0 top-0 h-full w-full p-0 ${
            bookingDate?.isSame(date) &&
            "bg-[#1f788b]/80 text-[#f7fcfc] hover:bg-[#1f788b]/90 hover:text-[#f7fcfc] [&_span]:text-[#f7fcfc]"
          }`}
          disabled={
            isPast || isBlock || isReserved || isTimeOver || isTodayBooked
          }
          onClick={() => {
            setBookingDate(() => date);
            setPrivateCharterData((prev) => ({
              ...prev,
              price: currentPrice,
              date: date.format("YYYY-MM-DD"),
            }));
          }}
        >
          <p className={`flex flex-col gap-[1px] text-[10px] md:text-base`}>
            <span className={`font-bold text-[#1f788b]`}>{date.date()}</span>
            {!isPast &&
            !isBlock &&
            !isReserved &&
            !isTimeOver &&
            !isTodayBooked ? (
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
    <div className="grid gap-4 p-6">
      <div className="my-6 flex w-full items-center justify-between gap-4">
        <Button
          type="button"
          onClick={handlePreviousMonth}
          className="text-xs md:text-lg"
        >
          Prev
        </Button>
        <p className="grid place-content-center text-base md:text-xl">
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
          onClick={() => router.push("/charter/booking-form")}
        >
          Continue
        </Button>
      )}
    </div>
  );
};
