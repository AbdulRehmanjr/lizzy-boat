"use client";
import React, { useEffect, useMemo, useState } from "react";
import { Minus, Plus } from "lucide-react";
import clsx from "clsx";
import Link from "next/link";
import { Button } from "../general/Button";
import { useAtom } from "jotai";
import { PrivateAtom } from "~/utils/stores";

const SelectPeopleCharter = () => {
  const [privateAtom, setPrivateData] = useAtom(PrivateAtom);

  const totalPeople = useMemo(() => {
    let totalPeople = 0;
    if (privateAtom.daySlot === "half_day") {
      totalPeople =
        (privateAtom.adult ?? 0) +
        (privateAtom.child_0_3 ?? 0) +
        (privateAtom.child_4_8 ?? 0) +
        (privateAtom.child_9_13 ?? 0);
    } else {
      totalPeople =
        (privateAtom.adult ?? 0) +
        (privateAtom.child_0_3 ?? 0) +
        (privateAtom.child_4_11 ?? 0);
    }
    setPrivateData({ ...privateAtom, total_no_of_people: totalPeople });
    return totalPeople;
  }, [
    privateAtom.adult,
    privateAtom.child_0_3,
    privateAtom.child_4_11,
    privateAtom.child_4_8,
    privateAtom.child_9_13,
    privateAtom.daySlot,
  ]);

  const isBlocked = useMemo(() => {
    return totalPeople >= 27;
  }, [totalPeople]);

  const [isChildrenShowing, setisChildrenShowing] = useState(false);

  useEffect(() => {
    if (privateAtom.daySlot === "full_day") {
      if (privateAtom.child_0_3 > 0) {
        setisChildrenShowing(true);
      } else if (privateAtom.child_4_11 > 0) {
        setisChildrenShowing(true);
      } else {
        setisChildrenShowing(false);
      }
    } else {
      if (privateAtom.child_0_3 > 0) {
        setisChildrenShowing(true);
      } else if (privateAtom.child_4_8 > 0) {
        setisChildrenShowing(true);
      } else if (privateAtom.child_9_13 > 0) {
        setisChildrenShowing(true);
      } else {
        setisChildrenShowing(false);
      }
    }
  }, [privateAtom]);

  return (
    <div className="flex w-[80vw] flex-col gap-y-6">
      {privateAtom.daySlot === "half_day" ? (
        <>
          <div className="grid w-full gap-10 md:grid-cols-2 lg:grid-cols-2">
            <div className="grid items-center gap-6 text-white">
              <li
                className={clsx(
                  "half-day grid h-[250px] cursor-pointer flex-col place-content-center items-center justify-center gap-3 rounded-lg border-2 border-[#1f788b] p-5 text-center text-lg text-[#1f788b] lg:text-2xl",
                )}
              >
                <h4 className="text-4xl lg:text-5xl">Adults</h4>
                <p>(14+ age)</p>
              </li>
              <div className="grid grid-cols-3 grid-rows-1 place-items-center gap-3 px-6">
                <Button
                  disabled={
                    privateAtom.adult === 0 || privateAtom.adult === undefined
                  }
                  onClick={() => {
                    setPrivateData({
                      ...privateAtom,
                      adult: (privateAtom.adult ?? 0) - 1,
                      total_no_of_people:
                        (privateAtom.total_no_of_people ?? 0) - 1,
                    });
                  }}
                >
                  <Minus />
                </Button>
                <p className="text-3xl text-[#1f788b]">
                  {privateAtom.adult ?? 0}
                </p>
                <Button
                  disabled={isBlocked}
                  onClick={() => {
                    setPrivateData({
                      ...privateAtom,
                      adult: (privateAtom.adult ?? 0) + 1,
                      total_no_of_people:
                        (privateAtom.total_no_of_people ?? 0) + 1,
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
                  "half-day grid h-[250px] cursor-pointer flex-col place-content-center items-center justify-center gap-3 rounded-lg border-2 border-[#1f788b] p-5 text-center text-lg text-[#1f788b] lg:text-2xl",
                )}
              >
                <h4 className="text-4xl lg:text-5xl">Child</h4>
                <p>(0-3 age)</p>
              </li>
              <div className="grid grid-cols-3 grid-rows-1 place-items-center gap-3 px-6">
                <Button
                  disabled={
                    privateAtom.child_0_3 === 0 ||
                    privateAtom.child_0_3 === undefined
                  }
                  onClick={() => {
                    setPrivateData({
                      ...privateAtom,
                      child_0_3: (privateAtom.child_0_3 ?? 0) - 1,
                      total_no_of_people:
                        (privateAtom.total_no_of_people ?? 0) - 1,
                    });
                  }}
                >
                  <Minus />
                </Button>
                <p className="text-3xl text-[#1f788b]">
                  {privateAtom.child_0_3 ?? 0}
                </p>
                <Button
                  disabled={isBlocked}
                  onClick={() => {
                    setPrivateData({
                      ...privateAtom,
                      child_0_3: (privateAtom.child_0_3 ?? 0) + 1,
                      total_no_of_people:
                        (privateAtom.total_no_of_people ?? 0) + 1,
                    });
                  }}
                >
                  <Plus />
                </Button>
              </div>
            </div>
            {isChildrenShowing && (
              <>
                <div className="grid items-center gap-6 text-white">
                  <li
                    className={clsx(
                      "half-day grid h-[250px] cursor-pointer flex-col place-content-center items-center justify-center gap-3 rounded-lg border-2 border-[#1f788b] p-5 text-center text-lg text-[#1f788b] lg:text-2xl",
                    )}
                  >
                    <h4 className="text-4xl lg:text-5xl">Child</h4>
                    <p>(4-8 age)</p>
                  </li>
                  <div className="grid grid-cols-3 grid-rows-1 place-items-center gap-3 px-6">
                    <Button
                      disabled={
                        privateAtom.child_4_8 === 0 ||
                        privateAtom.child_4_8 === undefined
                      }
                      onClick={() => {
                        setPrivateData({
                          ...privateAtom,
                          child_4_8: (privateAtom.child_4_8 ?? 0) - 1,
                          total_no_of_people:
                            (privateAtom.total_no_of_people ?? 0) - 1,
                        });
                      }}
                    >
                      <Minus />
                    </Button>
                    <p className="text-3xl text-[#1f788b]">
                      {privateAtom.child_4_8 ?? 0}
                    </p>
                    <Button
                      disabled={isBlocked}
                      onClick={() => {
                        setPrivateData({
                          ...privateAtom,
                          child_4_8: (privateAtom.child_4_8 ?? 0) + 1,
                          total_no_of_people:
                            (privateAtom.total_no_of_people ?? 0) + 1,
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
                      "half-day grid h-[250px] cursor-pointer flex-col place-content-center items-center justify-center gap-3 rounded-lg border-2 border-[#1f788b] p-5 text-center text-lg text-[#1f788b] lg:text-2xl",
                    )}
                  >
                    <h4 className="text-4xl lg:text-5xl">Child</h4>
                    <p>(9-13 age)</p>
                  </li>
                  <div className="grid grid-cols-3 grid-rows-1 place-items-center gap-3 px-6">
                    <Button
                      disabled={
                        privateAtom.child_9_13 === 0 ||
                        privateAtom.child_9_13 === undefined
                      }
                      onClick={() => {
                        setPrivateData({
                          ...privateAtom,
                          child_9_13: (privateAtom.child_9_13 ?? 0) - 1,
                          total_no_of_people:
                            (privateAtom.total_no_of_people ?? 0) - 1,
                        });
                      }}
                    >
                      <Minus />
                    </Button>
                    <p className="text-3xl text-[#1f788b]">
                      {privateAtom.child_9_13 ?? 0}
                    </p>
                    <Button
                      disabled={isBlocked}
                      onClick={() => {
                        setPrivateData({
                          ...privateAtom,
                          child_9_13: (privateAtom.child_9_13 ?? 0) + 1,
                          total_no_of_people:
                            (privateAtom.total_no_of_people ?? 0) + 1,
                        });
                      }}
                    >
                      <Plus />
                    </Button>
                  </div>
                </div>
              </>
            )}
          </div>
        </>
      ) : (
        <>
          <div className="grid w-full gap-10 md:grid-cols-2">
            <div className="grid items-center gap-6 text-white">
              <li
                className={clsx(
                  "half-day grid h-[250px] cursor-pointer flex-col place-content-center items-center justify-center gap-3 rounded-lg border-2 border-[#1f788b] p-5 text-center text-lg text-[#1f788b] lg:text-2xl",
                )}
              >
                <h4 className="text-4xl lg:text-5xl">Adult</h4>
                <p>(12+ age)</p>
              </li>
              <div className="grid grid-cols-3 grid-rows-1 place-items-center gap-3 px-6">
                <Button
                  disabled={
                    privateAtom.adult === 0 || privateAtom.adult === undefined
                  }
                  onClick={() => {
                    setPrivateData({
                      ...privateAtom,
                      adult: (privateAtom.adult ?? 0) - 1,
                      total_no_of_people:
                        (privateAtom.total_no_of_people ?? 0) - 1,
                    });
                  }}
                >
                  <Minus />
                </Button>
                <p className="text-3xl text-[#1f788b]">
                  {privateAtom.adult ?? 0}
                </p>
                <Button
                  disabled={isBlocked}
                  onClick={() => {
                    setPrivateData({
                      ...privateAtom,
                      adult: (privateAtom.adult ?? 0) + 1,
                      total_no_of_people:
                        (privateAtom.total_no_of_people ?? 0) + 1,
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
                  "half-day grid h-[250px] cursor-pointer flex-col place-content-center items-center justify-center gap-3 rounded-lg border-2 border-[#1f788b] p-5 text-center text-lg text-[#1f788b] lg:text-2xl",
                )}
              >
                <h4 className="text-4xl lg:text-5xl">Child</h4>
                <p>(0-3 age)</p>
              </li>
              <div className="grid grid-cols-3 grid-rows-1 place-items-center gap-3 px-6">
                <Button
                  disabled={
                    privateAtom.child_0_3 === 0 ||
                    privateAtom.child_0_3 === undefined
                  }
                  onClick={() => {
                    setPrivateData({
                      ...privateAtom,
                      child_0_3: (privateAtom.child_0_3 ?? 0) - 1,
                      total_no_of_people:
                        (privateAtom.total_no_of_people ?? 0) - 1,
                    });
                  }}
                >
                  <Minus />
                </Button>
                <p className="text-3xl text-[#1f788b]">
                  {privateAtom.child_0_3 ?? 0}
                </p>
                <Button
                  disabled={isBlocked}
                  onClick={() => {
                    setPrivateData({
                      ...privateAtom,
                      child_0_3: (privateAtom.child_0_3 ?? 0) + 1,
                      total_no_of_people:
                        (privateAtom.total_no_of_people ?? 0) + 1,
                    });
                  }}
                >
                  <Plus />
                </Button>
              </div>
            </div>
            {isChildrenShowing && (
              <>
                <div className="grid items-center gap-6 text-white">
                  <li
                    className={clsx(
                      "half-day grid h-[250px] cursor-pointer flex-col place-content-center items-center justify-center gap-3 rounded-lg border-2 border-[#1f788b] p-5 text-center text-lg text-[#1f788b] lg:text-2xl",
                    )}
                  >
                    <h4 className="text-4xl lg:text-5xl">Child</h4>
                    <p>(4-11 age)</p>
                  </li>
                  <div className="grid grid-cols-3 grid-rows-1 place-items-center gap-3 px-6">
                    <Button
                      disabled={
                        privateAtom.child_4_11 === 0 ||
                        privateAtom.child_4_11 === undefined
                      }
                      onClick={() => {
                        setPrivateData({
                          ...privateAtom,
                          child_4_11: (privateAtom.child_4_11 ?? 0) - 1,
                          total_no_of_people:
                            (privateAtom.total_no_of_people ?? 0) - 1,
                        });
                      }}
                    >
                      <Minus />
                    </Button>
                    <p className="text-3xl text-[#1f788b]">
                      {privateAtom.child_4_11 ?? 0}
                    </p>
                    <Button
                      disabled={isBlocked}
                      onClick={() => {
                        setPrivateData({
                          ...privateAtom,
                          child_4_11: (privateAtom.child_4_11 ?? 0) + 1,
                          total_no_of_people:
                            (privateAtom.total_no_of_people ?? 0) + 1,
                        });
                      }}
                    >
                      <Plus />
                    </Button>
                  </div>
                </div>
              </>
            )}
          </div>
        </>
      )}

      {privateAtom.adult && privateAtom.adult !== 0 ? (
        <div className="flex justify-center md:col-span-2">
          <Button asChild disabled={isBlocked}>
            <Link href={"/charter/booking-date"}>Continue</Link> 
          </Button>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default SelectPeopleCharter;
