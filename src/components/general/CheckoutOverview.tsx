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
        {}
        {data?.boatType && (
          <p className="flex gap-2">
            <span>Boat type:</span>
            <span>{data?.boatType}</span>
          </p>
        )}
        {data?.daySlot && (
          <p className="flex gap-2">
            <span>Booking type:</span>
            <span>{data?.daySlot}</span>
          </p>
        )}
        {data?.daySlot === "half_day" && (
          <p className="flex gap-2">
            <span>Booking Time:</span>
            <span>{data?.timeSlot}</span>
          </p>
        )}
        {data?.adult && (
          <p className="flex gap-2">
            <span>Adults :</span>
            <span>{data?.adult}</span>
          </p>
        )}
        {data?.child_0_3 && (
          <p className="flex gap-2">
            <span>Child (0-3) :</span>
            <span>{data?.child_0_3}</span>
          </p>
        )}
        {data?.child_4_8 && data?.daySlot === "half_day" && (
          <p className="flex gap-2">
            <span>Child (4-8) :</span>
            <span>{data?.child_4_8}</span>
          </p>
        )}
        {data?.child_9_13 && data?.daySlot === "half_day" && (
          <p className="flex gap-2">
            <span>Child (9-13) :</span>
            <span>{data?.child_9_13}</span>
          </p>
        )}
        {data?.child_4_11 && data?.daySlot === "full_day" && (
          <p className="flex gap-2">
            <span>Child (4-11) :</span>
            <span>{data?.child_4_11}</span>
          </p>
        )}
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
