"use client";

import dayjs from "dayjs";
import { PayPalButton } from "./PaypalButton";
import { usePathname } from "next/navigation";
import { getTourName } from "~/utils/funs";

type Props = {
  state: BookingProps;
  setState: React.Dispatch<React.SetStateAction<any>>;
  apiLinkEndpoint: string;
  data?: BookingProps;
  hideForm: boolean;
  setHideForm: React.Dispatch<React.SetStateAction<boolean>>;
};

const CheckoutOverview = ({
  state,
  setState,
  apiLinkEndpoint,
  data,
  hideForm,
  setHideForm,
}: Props) => {
  const pathName = usePathname();
  console.log(pathName);
  return (
    <div className="text-yellow flex flex-col gap-4">
      <h1 className="font-ibm text-4xl">Booking overview</h1>
      <div className="flex flex-col gap-2 text-black/70">
        <p className="flex gap-2">
          <span>Date:</span>
          <span>{dayjs(data?.date).format("DD-MM-YYYY")}</span>
        </p>
        {data?.date_return ? (
          <p className="flex gap-2">
            <span>Return date:</span>
            <span>{data?.date_return}</span>
          </p>
        ) : null}
        <p className="flex gap-2">
          <span>Tour:</span>
          <span>{getTourName(pathName)}</span>
        </p>
        {data?.startTime ? (
          <p className="flex gap-2">
            <span>Start time:</span>
            <span>{data?.startTime}</span>
          </p>
        ) : null}
        {data?.endTime ? (
          <p className="flex gap-2">
            <span>End time (return):</span>
            <span>{data?.endTime}</span>
          </p>
        ) : null}
        {data?.boatType ? (
          <p className="flex gap-2">
            <span>Boat type:</span>
            <span>{data?.boatType}</span>
          </p>
        ) : null}
        {data?.depart_from ? (
          <p className="flex gap-2">
            <span>Depart from:</span>
            <span>{data?.depart_from}</span>
          </p>
        ) : null}
        {data?.depart_from_return ? (
          <p className="flex gap-2">
            <span>Depart from (return):</span>
            <span>{data?.depart_from_return}</span>
          </p>
        ) : null}

        {data?.daySlot ? (
          <p className="flex gap-2">
            <span>Booking type:</span>
            <span>{data?.daySlot}</span>
          </p>
        ) : null}
        {data?.daySlot === "half_day" && data?.timeSlot ? (
          <p className="flex gap-2">
            <span>Booking Time:</span>
            <span>
              {data?.timeSlot}{" "}
              ({data?.timeSlot === "morning"
                ? pathName.includes("fishing")
                  ? "07:30 AM"
                  : "10:30 AM"
                : "13:30 "})
            </span>
          </p>
        ) : null}
        {data?.adult ? (
          <p className="flex gap-2">
            <span>Adults :</span>
            <span>{data?.adult}</span>
          </p>
        ) : null}
        {data?.infants ? (
          <p className="flex gap-2">
            <span>Infants :</span>
            <span>{data?.infants}</span>
          </p>
        ) : null}
        {data?.child_0_3 ? (
          <p className="flex gap-2">
            <span>Child (0-3) :</span>
            <span>{data?.child_0_3}</span>
          </p>
        ) : null}
        {data?.child_4_8 && data?.daySlot === "half_day" ? (
          <p className="flex gap-2">
            <span>Child (4-8) :</span>
            <span>{data?.child_4_8}</span>
          </p>
        ) : null}
        {data?.child_9_13 && data?.daySlot === "half_day" ? (
          <p className="flex gap-2">
            <span>Child (9-13) :</span>
            <span>{data?.child_9_13}</span>
          </p>
        ) : null}
        {data?.child_4_11 && data?.daySlot === "full_day" ? (
          <p className="flex gap-2">
            <span>Child (4-11) :</span>
            <span>{data?.child_4_11}</span>
          </p>
        ) : null}
        {data?.mode ? (
          <p className="flex gap-2">
            <span>Transfer Mode :</span>
            <span>{data?.mode}</span>
          </p>
        ) : null}
        <p className="flex items-center justify-between gap-2 border-y-2 py-3 font-extrabold">
          <span className="flex max-w-[50%] flex-col">
            <span>Total Price:</span>
            <span className="text-sm font-normal">
              includes taxes, island fees and port fee
            </span>
          </span>
          <span className="text-3xl">{data?.price} €</span>
        </p>
        {hideForm && (
          <PayPalButton
            state={state}
            setState={setState}
            apiLinkEndpoint={apiLinkEndpoint}
            hideForm={hideForm}
            setHideForm={setHideForm}
          />
        )}
      </div>
    </div>
  );
};

export default CheckoutOverview;
