"use client";
import React, { useMemo } from "react";
import { Minus, Plus } from "lucide-react";
import clsx from "clsx";
import Link from "next/link";
import { Button } from "../general/Button";
import { useAtom } from "jotai";
import { SnorkelingAtom } from "~/utils/stores";

const SelectPeopleSnorkeling = () => {
  const [snorkeling, setSnorkeling] = useAtom(SnorkelingAtom);

  const totalPeople = useMemo(() => {
    let totalPeople = 0;
    if (snorkeling.daySlot === "half_day") {
      totalPeople =
        (snorkeling.adult ?? 0) +
        (snorkeling.child_0_3 ?? 0) +
        (snorkeling.child_4_8 ?? 0) +
        (snorkeling.child_9_13 ?? 0);
    } else {
      totalPeople =
        (snorkeling.adult ?? 0) +
        (snorkeling.child_0_3 ?? 0) +
        (snorkeling.child_4_11 ?? 0);
    }
    setSnorkeling({ ...snorkeling, total_no_of_people: totalPeople });
  }, [
    snorkeling.adult,
    snorkeling.child_0_3,
    snorkeling.child_4_11,
    snorkeling.child_4_8,
    snorkeling.child_9_13,
    snorkeling.daySlot,
  ]);

  return (
    <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
      {snorkeling.daySlot === "half_day" ? (
        <>
          <div className="grid items-center gap-6 text-white">
            <li
              className={clsx(
                "half-day grid h-[300px] w-[350px] cursor-pointer flex-col place-content-center items-center justify-center gap-3 rounded-lg border-2 border-[#1f788b] p-5 text-center text-lg text-[#1f788b] md:w-[400px] md:text-2xl",
              )}
            >
              <h4 className="text-4xl md:text-5xl">Adults</h4>
              <p>(14+ age)</p>
            </li>
            <div className="grid grid-cols-3 grid-rows-1 place-items-center gap-3 px-6">
              <Button
                disabled={
                  snorkeling.adult === 0 || snorkeling.adult === undefined
                }
                onClick={() => {
                  setSnorkeling({
                    ...snorkeling,
                    adult: (snorkeling.adult ?? 0) - 1,
                    total_no_of_people:
                      (snorkeling.total_no_of_people ?? 0) - 1,
                  });
                }}
              >
                <Minus />
              </Button>
              <p className="text-3xl text-[#1f788b]">{snorkeling.adult ?? 0}</p>
              <Button
                onClick={() => {
                  setSnorkeling({
                    ...snorkeling,
                    adult: (snorkeling.adult ?? 0) + 1,
                    total_no_of_people:
                      (snorkeling.total_no_of_people ?? 0) + 1,
                  });
                }}
              >
                <Plus />
              </Button>
            </div>
          </div>
          <div className="grid items-center gap-6 text-white">
            <li
              className={clsx(
                "half-day grid h-[300px] w-[350px] cursor-pointer flex-col place-content-center items-center justify-center gap-3 rounded-lg border-2 border-[#1f788b] p-5 text-center text-lg text-[#1f788b] md:w-[400px] md:text-2xl",
              )}
            >
              <h4 className="text-4xl md:text-5xl">Child</h4>
              <p>(0-3 age)</p>
            </li>
            <div className="grid grid-cols-3 grid-rows-1 place-items-center gap-3 px-6">
              <Button
                disabled={
                  snorkeling.child_0_3 === 0 ||
                  snorkeling.child_0_3 === undefined
                }
                onClick={() => {
                  setSnorkeling({
                    ...snorkeling,
                    child_0_3: (snorkeling.child_0_3 ?? 0) - 1,
                    total_no_of_people:
                      (snorkeling.total_no_of_people ?? 0) - 1,
                  });
                }}
              >
                <Minus />
              </Button>
              <p className="text-3xl text-[#1f788b]">
                {snorkeling.child_0_3 ?? 0}
              </p>
              <Button
                onClick={() => {
                  setSnorkeling({
                    ...snorkeling,
                    child_0_3: (snorkeling.child_0_3 ?? 0) + 1,
                    total_no_of_people:
                      (snorkeling.total_no_of_people ?? 0) + 1,
                  });
                }}
              >
                <Plus />
              </Button>
            </div>
          </div>
          <div className="grid items-center gap-6 text-white">
            <li
              className={clsx(
                "half-day grid h-[300px] w-[350px] cursor-pointer flex-col place-content-center items-center justify-center gap-3 rounded-lg border-2 border-[#1f788b] p-5 text-center text-lg text-[#1f788b] md:w-[400px] md:text-2xl",
              )}
            >
              <h4 className="text-4xl md:text-5xl">Child</h4>
              <p>(4-8 age)</p>
            </li>
            <div className="grid grid-cols-3 grid-rows-1 place-items-center gap-3 px-6">
              <Button
                disabled={
                  snorkeling.child_4_8 === 0 ||
                  snorkeling.child_4_8 === undefined
                }
                onClick={() => {
                  setSnorkeling({
                    ...snorkeling,
                    child_4_8: (snorkeling.child_4_8 ?? 0) - 1,
                    total_no_of_people:
                      (snorkeling.total_no_of_people ?? 0) - 1,
                  });
                }}
              >
                <Minus />
              </Button>
              <p className="text-3xl text-[#1f788b]">
                {snorkeling.child_4_8 ?? 0}
              </p>
              <Button
                onClick={() => {
                  setSnorkeling({
                    ...snorkeling,
                    child_4_8: (snorkeling.child_4_8 ?? 0) + 1,
                    total_no_of_people:
                      (snorkeling.total_no_of_people ?? 0) + 1,
                  });
                }}
              >
                <Plus />
              </Button>
            </div>
          </div>
          <div className="grid items-center gap-6 text-white">
            <li
              className={clsx(
                "half-day grid h-[300px] w-[350px] cursor-pointer flex-col place-content-center items-center justify-center gap-3 rounded-lg border-2 border-[#1f788b] p-5 text-center text-lg text-[#1f788b] md:w-[400px] md:text-2xl",
              )}
            >
              <h4 className="text-4xl md:text-5xl">Child</h4>
              <p>(9-13 age)</p>
            </li>
            <div className="grid grid-cols-3 grid-rows-1 place-items-center gap-3 px-6">
              <Button
                disabled={
                  snorkeling.child_9_13 === 0 ||
                  snorkeling.child_9_13 === undefined
                }
                onClick={() => {
                  setSnorkeling({
                    ...snorkeling,
                    child_9_13: (snorkeling.child_9_13 ?? 0) - 1,
                    total_no_of_people:
                      (snorkeling.total_no_of_people ?? 0) - 1,
                  });
                }}
              >
                <Minus />
              </Button>
              <p className="text-3xl text-[#1f788b]">
                {snorkeling.child_9_13 ?? 0}
              </p>
              <Button
                onClick={() => {
                  setSnorkeling({
                    ...snorkeling,
                    child_9_13: (snorkeling.child_9_13 ?? 0) + 1,
                    total_no_of_people:
                      (snorkeling.total_no_of_people ?? 0) + 1,
                  });
                }}
              >
                <Plus />
              </Button>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="grid items-center gap-6 text-white">
            <li
              className={clsx(
                "half-day grid h-[300px] w-[350px] cursor-pointer flex-col place-content-center items-center justify-center gap-3 rounded-lg border-2 border-[#1f788b] p-5 text-center text-lg text-[#1f788b] md:w-[400px] md:text-2xl",
              )}
            >
              <h4 className="text-4xl md:text-5xl">Adult</h4>
              <p>(12+ age)</p>
            </li>
            <div className="grid grid-cols-3 grid-rows-1 place-items-center gap-3 px-6">
              <Button
                disabled={
                  snorkeling.adult === 0 || snorkeling.adult === undefined
                }
                onClick={() => {
                  setSnorkeling({
                    ...snorkeling,
                    adult: (snorkeling.adult ?? 0) - 1,
                    total_no_of_people:
                      (snorkeling.total_no_of_people ?? 0) - 1,
                  });
                }}
              >
                <Minus />
              </Button>
              <p className="text-3xl text-[#1f788b]">{snorkeling.adult ?? 0}</p>
              <Button
                onClick={() => {
                  setSnorkeling({
                    ...snorkeling,
                    adult: (snorkeling.adult ?? 0) + 1,
                    total_no_of_people:
                      (snorkeling.total_no_of_people ?? 0) + 1,
                  });
                }}
              >
                <Plus />
              </Button>
            </div>
          </div>
          <div className="grid items-center gap-6 text-white">
            <li
              className={clsx(
                "half-day grid h-[300px] w-[350px] cursor-pointer flex-col place-content-center items-center justify-center gap-3 rounded-lg border-2 border-[#1f788b] p-5 text-center text-lg text-[#1f788b] md:w-[400px] md:text-2xl",
              )}
            >
              <h4 className="text-4xl md:text-5xl">Child</h4>
              <p>(0-3 age)</p>
            </li>
            <div className="grid grid-cols-3 grid-rows-1 place-items-center gap-3 px-6">
              <Button
                disabled={
                  snorkeling.child_0_3 === 0 ||
                  snorkeling.child_0_3 === undefined
                }
                onClick={() => {
                  setSnorkeling({
                    ...snorkeling,
                    child_0_3: (snorkeling.child_0_3 ?? 0) - 1,
                    total_no_of_people:
                      (snorkeling.total_no_of_people ?? 0) - 1,
                  });
                }}
              >
                <Minus />
              </Button>
              <p className="text-3xl text-[#1f788b]">
                {snorkeling.child_0_3 ?? 0}
              </p>
              <Button
                onClick={() => {
                  setSnorkeling({
                    ...snorkeling,
                    child_0_3: (snorkeling.child_0_3 ?? 0) + 1,
                    total_no_of_people:
                      (snorkeling.total_no_of_people ?? 0) + 1,
                  });
                }}
              >
                <Plus />
              </Button>
            </div>
          </div>
          <div className="grid items-center gap-6 text-white">
            <li
              className={clsx(
                "half-day grid h-[300px] w-[350px] cursor-pointer flex-col place-content-center items-center justify-center gap-3 rounded-lg border-2 border-[#1f788b] p-5 text-center text-lg text-[#1f788b] md:w-[400px] md:text-2xl",
              )}
            >
              <h4 className="text-4xl md:text-5xl">Child</h4>
              <p>(4-11 age)</p>
            </li>
            <div className="grid grid-cols-3 grid-rows-1 place-items-center gap-3 px-6">
              <Button
                disabled={
                  snorkeling.child_4_11 === 0 ||
                  snorkeling.child_4_11 === undefined
                }
                onClick={() => {
                  setSnorkeling({
                    ...snorkeling,
                    child_4_11: (snorkeling.child_4_11 ?? 0) - 1,
                    total_no_of_people:
                      (snorkeling.total_no_of_people ?? 0) - 1,
                  });
                }}
              >
                <Minus />
              </Button>
              <p className="text-3xl text-[#1f788b]">
                {snorkeling.child_4_11 ?? 0}
              </p>
              <Button
                onClick={() => {
                  setSnorkeling({
                    ...snorkeling,
                    child_4_11: (snorkeling.child_4_11 ?? 0) + 1,
                    total_no_of_people:
                      (snorkeling.total_no_of_people ?? 0) + 1,
                  });
                }}
              >
                <Plus />
              </Button>
            </div>
          </div>
        </>
      )}

      {snorkeling.adult && snorkeling.adult !== 0 ? (
        <div className="flex justify-center md:col-span-2">
          <Button asChild>
            <Link href={"/snorkeling/booking-date"}>Continue</Link>
          </Button>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default SelectPeopleSnorkeling;
