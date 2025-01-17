"use client";

import dayjs, { type Dayjs } from "dayjs";
import { useAtom } from "jotai/react";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { TransferAtom } from "~/utils/stores";
import { Button } from "../general/Button";
import clsx from "clsx";
import { api } from "~/trpc/react";

export const CalendarReturn = () => {
  const router = useRouter();
  const [currentDate, setCurrentDate] = useState<Dayjs>(dayjs());
  const [bookingDate, setBookingDate] = useState<Dayjs>();
  const [transferData, setTransferData] = useAtom(TransferAtom);

  const blockBookingsAccordingToBoats = api.booking.getBlockedDates.useQuery({
    numberOfPeople: transferData.adult ?? 0 + transferData.infants ?? 0,
    bookingType: "transfer",
    time: "",
  });
  console.log(blockBookingsAccordingToBoats.data?.blockedDateSet);

  const currentMonth: Dayjs[][] = useMemo(() => {
    const currentMonth = currentDate || dayjs();
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

  const handlePreviousMonth = () => {
    const newDate = currentDate || dayjs();
    setCurrentDate(newDate.clone().subtract(1, "month"));
  };

  const handleNextMonth = () => {
    const newDate = currentDate || dayjs();
    setCurrentDate(newDate.clone().add(1, "month"));
  };
  const currentPrice = useMemo(() => {
    const transferMode = transferData.mode;
    const total_people = transferData.adult ?? 0;
    switch (transferMode) {
      case "praslin_one_way":
        return total_people <= 4 ? 125 : (total_people - 4) * 40 + 125;
      case "praslin_back_n_forth":
        return total_people <= 4 ? 200 : (total_people - 4) * 40 + 200;
      case "felicity_one_way":
        return total_people <= 4 ? 125 : (total_people - 4) * 40 + 125;
      case "felicity_back_n_forth":
        return total_people <= 4 ? 200 : (total_people - 4) * 40 + 200;
      case "mahe_one_way":
        return total_people <= 4 ? 400 : (total_people - 4) * 40 + 400;
      case "mahe_back_n_forth":
        return total_people <= 4 ? 700 : (total_people - 4) * 40 + 700;
      default:
        return 0;
    }
  }, [transferData.mode]);

  const DateTemplate = ({ date }: { date: Dayjs }) => {
    if (!date) return <td className="border-[1px] border-gray-600"></td>;

    const isPast = date.isBefore(dayjs(), "day");
    // const price = 100;
    //Check for 12 hours
    const now = dayjs();
    const hoursLeft = date.diff(now, "hour");
    const isLessThan24Hours = hoursLeft < 24;

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

    return (
      <td
        className={clsx(
          "relative h-[2.5rem] w-fit border-[1px] border-gray-600 md:h-[6rem] md:w-[2rem]",
        )}
      >
        <Button
          variant={"outline"}
          type="button"
          className={`absolute left-0 top-0 h-full w-full rounded-none border-0 p-0 ${bookingDate?.isSame(date) && "bg-[#1f788b]/80 text-[#f7fcfc] hover:bg-[#1f788b]/90 hover:text-[#f7fcfc] [&_span]:text-[#f7fcfc]"}`}
          disabled={isPast || isLessThan24Hours || isTodayBooked}
          onClick={() => {
            setBookingDate(() => date);
            setTransferData((prev) => ({
              ...prev,
              // price: currentPrice,
              date_return: date.format("YYYY-MM-DD"),
              boat: boat,
            }));
          }}
        >
          <p
            className={`flex flex-col gap-[1px] text-[10px] text-black/70 md:gap-1 md:text-base`}
          >
            <span className={`font-bold`}>{date.date()}</span>
            {!isPast && !isLessThan24Hours && !isTodayBooked ? (
              <span>{currentPrice} € </span>
            ) : (
              <span>N/A</span>
            )}
          </p>
        </Button>
      </td>
    );
  };

  return (
    <div className="grid gap-4 px-6 pt-6">
      <div className="my-6 flex w-full items-center justify-between gap-4">
        <Button
          type="button"
          onClick={handlePreviousMonth}
          className="text-xs md:text-lg"
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
      <div className="flex justify-center">
        <Button
          type="button"
          onClick={() => router.push("/transfer/booking-time-return")}
          disabled={!bookingDate}
        >
          Continue
        </Button>
      </div>
    </div>
  );
};
