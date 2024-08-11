"use client";

import dayjs, { type Dayjs } from "dayjs";
import { useAtom } from "jotai/react";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { TransferAtom } from "~/utils/stores";
import { Button } from "../general/Button";
import clsx from "clsx";

export const Calendar = () => {
  const router = useRouter();
  const [currentDate, setCurrentDate] = useState<Dayjs>(dayjs());
  const [bookingDate, setBookingDate] = useState<Dayjs>();
  const [transferData, setTransferData] = useAtom(TransferAtom);

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
    switch (transferMode) {
      case "praslin_one_way":
        return 125;
      case "praslin_back_n_forth":
        return 200;
      case "felicity_one_way":
        return 125;
      case "felicity_back_n_forth":
        return 200;
      case "mahe_one_way":
        return 400;
      case "mahe_back_n_forth":
        return 700;
      default:
        return 0;
    }
  }, [transferData.mode]);

  const DateTemplate = ({ date }: { date: Dayjs }) => {
    if (!date) return <td className="border-[1px] border-[#1f788b]"></td>;

    const isPast = date.isBefore(dayjs(), "day");
    // const price = 100;
    //Check for 12 hours
    const now = dayjs();
    const hoursLeft = date.diff(now, "hour");
    const isLessThan24Hours = hoursLeft < 24;

    return (
      <td
        className={clsx(
          "relative h-[2.5rem] w-fit border-[1px] border-[#1f788b] md:h-[6rem] md:w-[2rem]",
        )}
      >
        <Button
          variant={"outline"}
          type="button"
          className={`absolute left-0 top-0 h-full w-full p-0 ${bookingDate?.isSame(date) && "bg-[#1f788b]/80 text-[#f7fcfc] hover:bg-[#1f788b]/90 hover:text-[#f7fcfc] [&_span]:text-[#f7fcfc]"}`}
          disabled={isPast || isLessThan24Hours}
          onClick={() => {
            setBookingDate(() => date);
            setTransferData((prev) => ({
              ...prev,
              price: currentPrice,
              date: date.format("YYYY-MM-DD"),
            }));
          }}
        >
          <p
            className={`flex flex-col gap-[1px] text-[10px] md:gap-1 md:text-base`}
          >
            <span className={`font-bold text-[#1f788b]`}>{date.date()}</span>
            {!isPast && !isLessThan24Hours ? (
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
      {bookingDate && (
        <Button
          type="button"
          onClick={() => router.push("/transfer/booking-form")}
        >
          Continue
        </Button>
      )}
    </div>
  );
};
