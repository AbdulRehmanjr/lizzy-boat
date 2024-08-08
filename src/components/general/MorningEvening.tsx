"use client";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import React from "react";

type Props = {
  state: BookingProps;
  setState: React.Dispatch<React.SetStateAction<any>>;
  linkToRedirect: string;
};

const MorningEvening = ({ state, setState, linkToRedirect }: Props) => {
  const router = useRouter();
  return (
    <menu className="grid grid-rows-2 gap-4 text-center md:grid-flow-row md:grid-cols-2 md:grid-rows-1">
      <li
        className={clsx(
          "half-day grid h-[300px] w-[350px] cursor-pointer flex-col place-content-center items-center justify-center gap-3 rounded-lg p-5 text-lg backdrop-blur md:w-[400px] md:text-2xl border-2 border-[#1f788b] hover:text-[#F7FCFC] hover:bg-[#1f788b] text-[#1f788b]",
          {
            "text-[#F7FCFC] bg-[#1f788b]":
              state.timeSlot && state.timeSlot === "morning",
          },
        )}
        onClick={() => {
          setState((prev: BookingProps) => ({ ...prev, timeSlot: "morning" }));
          router.push(linkToRedirect);
        }}
      >
        <h4 className="text-4xl md:text-5xl">Morning</h4>
        <p>09:30 am - 12:30 pm</p>
      </li>
      <li
        className={clsx(
          "full-day flex h-[300px] w-[350px] cursor-pointer flex-col items-center justify-center gap-3 rounded-lg  p-5 text-lg  md:w-[400px] md:text-2xl border-2 border-[#1f788b] hover:text-[#F7FCFC] hover:bg-[#1f788b] text-[#1f788b]",
          {
            "text-[#F7FCFC] bg-[#1f788b]":
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
        <p>13:30 pm - 16:30 pm</p>
      </li>
    </menu>
  );
};

export default MorningEvening;
