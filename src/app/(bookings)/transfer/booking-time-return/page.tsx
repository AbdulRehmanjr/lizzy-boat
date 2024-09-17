"use client";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Button } from "~/components/general/Button";
import { Input } from "~/components/ui/input";
import { TransferAtom } from "~/utils/stores";
import * as z from "zod";

// Define the Zod schema for validating time in "HH:MM" format
const timeSchema = z.string().regex(/^([0-1]\d|2[0-3]):([0-5]\d)$/, {
  message: "Invalid time format. Use HH:MM format.",
});

const BookingTimeReturn = () => {
  const router = useRouter();
  const [transferData, setTransfer] = useAtom(TransferAtom);
  const [timeValue, settimeValue] = useState("");
  const [isTimeValid, setIsTimeValid] = useState(false);

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    settimeValue(value);

    // Validate the time input using Zod
    const validationResult = timeSchema.safeParse(value);
    setIsTimeValid(validationResult.success);
  };

  return (
    <>
      <h1 className={`my-5 text-2xl md:text-4xl`}>
        Choose your departure time (return)
      </h1>
      <Input
        placeholder="Enter time"
        type="time"
        className="mb-2 px-8 w-fit"
        value={timeValue}
        onChange={handleTimeChange}
      />
      <div className="flex justify-center">
        <Button
          disabled={!isTimeValid}
          type="button"
          onClick={() => {
            setTransfer((prev) => ({ ...prev, endTime: timeValue }));
            router.push("/transfer/booking-form");
          }}
        >
          Continue
        </Button>
      </div>
    </>
  );
};

export default BookingTimeReturn;