"use client";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import React from "react";

type Props = {
  halfDayPrice: string;
  fullDayPrice: string;
  state: BookingProps;
  setState: React.Dispatch<React.SetStateAction<any>>;
  linkIfHalfDay: string;
  linkIfFullDay: string;
};

const HalfOrFullDay = ({
  halfDayPrice,
  fullDayPrice,
  state,
  setState,
  linkIfHalfDay,
  linkIfFullDay,
}: Props) => {
  const router = useRouter();
  return (
    <menu className="grid grid-rows-2 gap-4 md:grid-flow-row md:grid-cols-2 md:grid-rows-1">
      <li
        className={clsx(
          "half-day grid h-[300px] w-[350px] cursor-pointer flex-col place-content-center items-center justify-center gap-3 rounded-lg border-2 bg-black p-5 text-lg text-white shadow-md md:w-[400px] md:text-2xl",
        )}
        onClick={() => {
          setState(() => ({ ...state, daySlot: "half_day" }));
          router.push(linkIfHalfDay);
        }}
      >
        <h4 className="text-4xl md:text-5xl">Half Day</h4>
        <p>{`${halfDayPrice}€ per tour`}</p>
      </li>
      <li
        className={clsx(
          "full-day flex h-[300px] w-[350px] cursor-pointer flex-col items-center justify-center gap-3 rounded-lg border-2 border-black p-5 text-lg shadow-md md:w-[400px] md:text-2xl",
        )}
        onClick={() => {
          setState(() => ({ ...state, daySlot: "full_day" }));
          router.push(linkIfFullDay);
        }}
      >
        <h4 className="text-4xl md:text-5xl">Full Day</h4>
        <p>{`${fullDayPrice}€ per tour`}</p>
      </li>
    </menu>
  );
};

export default HalfOrFullDay;
