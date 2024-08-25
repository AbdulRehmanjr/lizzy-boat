"use client";
import React, { useEffect, useMemo, useState } from "react";
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
  const [count, setcount] = useState(0);
  useEffect(() => {
    setcount(state.adult ?? 0 + (state.infants ?? 0));
  }, []);
  const isBlocked = useMemo(() => {
    if (count > 27) {
      return true;
    } else {
      return false;
    }
  }, [count]);
  return (
    <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
      <div className="grid items-center gap-6 text-white">
        <li
          className={clsx(
            "half-day grid h-[300px] w-[350px] cursor-pointer flex-col place-content-center items-center justify-center gap-3 rounded-lg border-2 border-[#1f788b] p-5 text-center text-lg text-[#1f788b] md:w-[400px] md:text-2xl",
          )}
        >
          <h4 className="text-4xl md:text-5xl">Adults</h4>
          <p>(11+ age)</p>
        </li>
        <div className="grid grid-cols-3 grid-rows-1 place-items-center gap-3 px-6">
          <Button
            disabled={
              state.adult === 0 || state.adult === undefined || isBlocked
            }
            onClick={() => {
              setState((prev: any) => ({
                ...prev,
                adult: (state.adult ?? 0) - 1,
              }));
              setcount(() => {
                if (count !== 0) return count - 1;
                else return count;
              });
            }}
          >
            <Minus />
          </Button>
          <p className="text-3xl text-[#1f788b]">{state.adult ?? 0}</p>
          <Button
            disabled={isBlocked}
            onClick={() => {
              setState((prev: any) => ({
                ...prev,
                adult: (state.adult ?? 0) + 1,
              }));
              setcount(() => {
                if (count !== 0) return count - 1;
                else {
                  return 0;
                }
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
            "half-day grid h-[300px] w-[350px] cursor-pointer flex-col place-content-center items-center justify-center gap-3 rounded-lg border-2 border-[#1f788b] p-5 text-center text-lg text-[#1f788b] md:w-[400px] md:text-2xl",
          )}
        >
          <h4 className="text-4xl md:text-5xl">Infants</h4>
          <p>(0 - 10 age)</p>
        </li>
        <div className="grid grid-cols-3 grid-rows-1 place-items-center gap-3 px-6">
          <Button
            disabled={state.infants === 0 || isBlocked}
            onClick={() => {
              setState((prev: any) => ({
                ...prev,
                infants: (state.infants ?? 0) - 1,
              }));
              setcount(() => {
                if (count !== 0) return count - 1;
                else return count;
              });
            }}
          >
            <Minus />
          </Button>
          <p className="text-3xl text-[#1f788b]">{state.infants}</p>
          <Button
            disabled={isBlocked}
            onClick={() => {
              setState((prev: any) => ({
                ...prev,
                infants: (state.infants ?? 0) + 1,
              }));
              setcount(() => {
                if (count !== 0) return count - 1;
                else return count;
              });
            }}
          >
            <Plus />
          </Button>
        </div>
      </div>
      {/* <div className="grid items-center gap-6 text-white">
        <li
          className={clsx(
            "half-day grid h-[300px] w-[350px] cursor-pointer flex-col place-content-center items-center justify-center gap-3 rounded-lg p-5 text-center text-lg  md:w-[400px] md:text-2xl border-2 border-[#1f788b] text-[#1f788b]",
          )}
        >
          <h4 className="text-4xl md:text-5xl">Adults</h4>
          <p>(11+ age)</p>
        </li>
        <div className="grid grid-cols-3 grid-rows-1 place-items-center gap-3 px-6">
          <Button
            disabled={state.adult === 0 || state.adult === undefined}
            onClick={() => {
              setState({
                ...state,
                adult: (state.adult ?? 0) - 1,
              });
            }}
          >
            <Minus />
          </Button>
          <p className="text-3xl text-[#1f788b]">{state.adult ?? 0}</p>
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
            "half-day grid h-[300px] w-[350px] cursor-pointer flex-col place-content-center items-center justify-center gap-3 rounded-lg p-5 text-center text-lg  md:w-[400px] md:text-2xl border-2 border-[#1f788b] text-[#1f788b]",
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
          <p className="text-3xl text-[#1f788b]">{state.infants}</p>
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
      </div> */}
      {state.adult && state.adult !== 0 ? (
        <div className="flex justify-center md:col-span-2">
          <Button asChild disabled={isBlocked}>
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
