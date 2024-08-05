"use client";
import { useAtom } from "jotai/react";
import React from "react";
import MorningEvening from "~/components/general/MorningEvening";
import { PrivateAtom } from "~/utils/stores";

type Props = {};

const BookingTime = (props: Props) => {
  const [privateAtom, setPrivateData] = useAtom(PrivateAtom);

  return (
    <>
      <h1 className={`my-5 text-2xl font-bold md:text-4xl`}>Choose between</h1>
      <MorningEvening
        state={privateAtom}
        setState={setPrivateData}
        linkToRedirect="/charter/booking-people"
      />
    </>
  );
};

export default BookingTime;
