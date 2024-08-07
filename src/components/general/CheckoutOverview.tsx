"use client";

import dayjs from "dayjs";
import { PayPalButton } from "./PaypalButton";

type Props = {
  state: BookingProps;
  setState: React.Dispatch<React.SetStateAction<any>>;
  apiLinkEndpoint: string;
  data?: BookingProps;
};

const CheckoutOverview = ({
  state,
  setState,
  apiLinkEndpoint,
  data,
}: Props) => {
  return (
    <div className="text-yellow flex flex-col gap-4">
      <h1 className="font-ibm text-4xl">Booking overview</h1>
      <div className="flex flex-col gap-2 text-[#1f788b]">
        <p className="flex gap-2">
          <span>Date:</span>
          <span>{dayjs(data?.date).format("DD-MM-YYYY")}</span>
        </p>
        <p className="flex gap-2">
          <span>Boat Type:</span>
          <span>{data?.boatType}</span>
        </p>
        <p className="flex gap-2">
          <span>Booking Type:</span>
          <span>{data?.daySlot}</span>
        </p>
        {data?.daySlot === "half_day" && (
          <p className="flex gap-2">
            <span>Booking Time:</span>
            <span>{data?.timeSlot}</span>
          </p>
        )}
        <p className="flex gap-2">
          <span>Adults :</span>
          <span>{data?.adult}</span>
        </p>
        <p className="flex gap-2">
          <span>Infants :</span>
          <span>{data?.infants}</span>
        </p>
        <p className="flex gap-2 border-y-2 py-3 font-extrabold">
          <span>Price:</span>
          <span>{data?.price} €</span>
        </p>
        <PayPalButton
          state={state}
          setState={setState}
          apiLinkEndpoint={apiLinkEndpoint}
        />
      </div>
    </div>
  );
};

export default CheckoutOverview;
