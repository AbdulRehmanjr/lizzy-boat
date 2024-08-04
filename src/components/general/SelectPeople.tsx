"use client";
import React from "react";
import { Minus, Plus } from "lucide-react";
import clsx from "clsx";
import { Button } from "./Button";
import Link from "next/link";

type Props = {
  state: BookingProps;
  setState: React.Dispatch<React.SetStateAction<any>>;
  linkToRedirect: string;
};

const SelectPeople = ({ state, setState, linkToRedirect }: Props) => {
  return (
    <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
      <div className="grid items-center gap-6">
        <li
          className={clsx(
            "half-day grid h-[300px] w-[350px] cursor-pointer flex-col place-content-center items-center justify-center gap-3 rounded-lg border-2 bg-black p-5 text-center text-lg text-white shadow-md md:w-[400px] md:text-2xl",
          )}
        >
          <h4 className="text-4xl md:text-5xl">Adults</h4>
          <p>(11+ age)</p>
        </li>
        <div className="grid grid-cols-3 grid-rows-1 place-items-center gap-3 px-6">
          <Button
            disabled={state.adult === 0}
            onClick={() => {
              setState({
                ...state,
                adult: (state.adult ?? 0) - 1,
              });
            }}
          >
            <Minus />
          </Button>
          <p className="text-3xl">{state.adult ?? 0}</p>
          <Button
            onClick={() => {
              setState({
                ...state,
                adult: (state.adult ?? 0) + 1,
              });
            }}
          >
            <Plus />
          </Button>
        </div>
      </div>
      <div className="grid gap-6">
        <li
          className={clsx(
            "half-day grid h-[300px] w-[350px] cursor-pointer flex-col place-content-center items-center justify-center gap-3 rounded-lg border-2 border-black p-5 text-center text-lg shadow-md md:w-[400px] md:text-2xl",
          )}
        >
          <h4 className="text-4xl md:text-5xl">Infants</h4>
          <p>(0 - 10 age)</p>
        </li>
        <div className="grid grid-cols-3 grid-rows-1 place-items-center gap-3 px-6">
          <Button
            disabled={state.infants === 0}
            onClick={() => {
              setState({
                ...state,
                infants: (state.infants ?? 0) - 1,
              });
            }}
          >
            <Minus />
          </Button>
          <p className="text-3xl">{state.infants}</p>
          <Button
            onClick={() => {
              setState({
                ...state,
                infants: (state.infants ?? 0) + 1,
              });
            }}
          >
            <Plus />
          </Button>
        </div>
      </div>
      {state.adult && state.adult !== 0 ? (
        <div className="flex justify-center md:col-span-2">
          <Button asChild>
            <Link href={linkToRedirect}>Continue</Link>
          </Button>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default SelectPeople;
