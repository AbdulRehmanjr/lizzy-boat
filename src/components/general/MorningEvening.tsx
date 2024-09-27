"use client";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import React from "react";

type Props = {
  state: BookingProps;
  setState: React.Dispatch<React.SetStateAction<any>>;
  linkToRedirect: string;
  morningTime?: string;
  eveningTime?: string;
};

const MorningEvening = ({
  state,
  setState,
  linkToRedirect,
  morningTime,
  eveningTime,
}: Props) => {
  const router = useRouter();
  return (
    <menu className="grid grid-rows-2 gap-4 text-center md:grid-flow-row md:grid-cols-2 md:grid-rows-1">
      <li
        className={clsx(
          "half-day grid h-[300px] w-[270px] cursor-pointer flex-col place-content-center items-center justify-center gap-3 rounded-lg border-2 border-[#1f788b] p-5 text-lg text-[#1f788b] backdrop-blur hover:bg-[#1f788b] hover:text-[#F7FCFC] sm:w-[350px] md:w-[400px] md:text-2xl",
          {
            "bg-[#1f788b] text-[#F7FCFC]":
              state.timeSlot && state.timeSlot === "morning",
          },
        )}
        onClick={() => {
          setState((prev: BookingProps) => ({ ...prev, timeSlot: "morning" }));
          router.push(linkToRedirect);
        }}
      >
        <h4 className="text-4xl md:text-5xl">Morning</h4>
        <p>{morningTime || "09:30 am - 12:30 pm"}</p>
      </li>
      <li
        className={clsx(
          "full-day flex h-[300px] w-[270px] cursor-pointer flex-col items-center justify-center gap-3 rounded-lg border-2 border-[#1f788b] p-5 text-lg text-[#1f788b] hover:bg-[#1f788b] hover:text-[#F7FCFC] sm:w-[350px] md:w-[400px] md:text-2xl",
          {
            "bg-[#1f788b] text-[#F7FCFC]":
              state.timeSlot && state.timeSlot === "afternoon",
          },
        )}
        onClick={() => {
          setState((prev: BookingProps) => ({
            ...prev,
            timeSlot: "afternoon",
          }));
          router.push(linkToRedirect);
        }}
      >
        <h4 className="text-4xl md:text-5xl">Afternoon</h4>
        <p>{eveningTime || "13:30 pm - 16:30 pm"}</p>
      </li>
    </menu>
  );
};

export default MorningEvening;
