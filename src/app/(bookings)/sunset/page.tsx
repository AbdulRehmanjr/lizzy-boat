"use client";
import { useAtom } from "jotai/react";
import React from "react";
import HalfOrFullDay from "~/components/general/HalfOrFullDay";
import SelectPeople from "~/components/general/SelectPeople";
import { SunsetAtom } from "~/utils/stores";

type Props = {};

const Fishing = (props: Props) => {
  const [sunsetData, setSunsetData] = useAtom(SunsetAtom);

  return (
    <>
      <h1 className={`text-2xl font-bold md:text-4xl`}>Choose between</h1>
      <SelectPeople
        state={sunsetData}
        setState={setSunsetData}
        linkToRedirect="/sunset/booking-date"
      />
    </>
  );
};

export default Fishing;
