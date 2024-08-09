// /* eslint-disable @typescript-eslint/no-unsafe-member-access */
// /* eslint-disable @typescript-eslint/no-unsafe-assignment */
// /* eslint-disable @typescript-eslint/no-unsafe-return */
// "use client";

// import { PayPalButtons } from "@paypal/react-paypal-js";
// import { useAtom, useAtomValue } from "jotai";
// import { type OnApproveData, type CreateOrderData } from "@paypal/paypal-js";
// import { useRouter } from "next/navigation";
// import { useMemo, useState } from "react";
// import axios, { AxiosError } from "axios";
// import { useToast } from "~/components/ui/use-toast";
// import { FormAtom, PayPalDisbaleAtom } from "~/utils/stores";
// import { PayPalIdAtom } from "~/utils/stores";
// import { clearLocalStorage } from "~/utils/funs";

// type Props = {
//   state: BookingProps;
//   setState: React.Dispatch<React.SetStateAction<any>>;
//   apiLinkEndpoint: string;
// };

// export const PayPalButton = ({ state, setState, apiLinkEndpoint }: Props) => {
//   const { toast } = useToast();
//   const router = useRouter();
//   const formData = useAtomValue(FormAtom);
//   const [paypalId, setPayPalId] = useAtom(PayPalIdAtom);
//   const [isDisable, setDisable] = useAtom(PayPalDisbaleAtom);
//   const [isReady, setIsReady] = useState(false);

//   useMemo(() => {
//     if (paypalId != "") setIsReady(() => true);
//   }, [paypalId]);

//   const createOrder = async (_data: CreateOrderData) => {
//     try {
//       const response = await axios.post("/api/order", {
//         paypal: paypalId,
//         amount: state.price,
//       });
//       return response.data.id;
//     } catch (error) {
//       if (error instanceof AxiosError) {
//         toast({
//           variant: "destructive",
//           description: error.message ?? "Error",
//         });
//       } else {
//         toast({
//           variant: "destructive",
//           description: "Something went wrong",
//         });
//       }
//     }
//   };

//   const approveOrder = async (data: OnApproveData): Promise<void> => {
//     try {
//       await axios.post(`/api/order/${apiLinkEndpoint}`, {
//         orderId: data.orderID,
//         bookingData: state,
//         formData: formData,
//       });
//       clearLocalStorage();
//       setPayPalId(() => "");

//       setState(() => ({
//         boatType: undefined,
//         timeSlot: undefined,
//         daySlot: undefined,
//         date: undefined,
//         price: 0,
//         adult: undefined,
//         child_0_3: 0,
//         child_4_8: 0,
//         child_9_13: 0,
//         child_4_11: 0,
//       }));
//       setDisable(() => true);
//       router.push("/success");
//     } catch (error) {
//       if (error instanceof AxiosError) {
//         toast({
//           variant: "destructive",
//           description: error.message ?? "Error",
//         });
//       } else {
//         toast({
//           variant: "destructive",
//           description: "Something went wrong",
//         });
//       }
//     }
//   };

//   const cancelOrder = (_data: Record<string, unknown>): void => {
//     return;
//   };

//   return (
//     <>
//       <PayPalButtons
//         disabled={isDisable || !isReady}
//         createOrder={(data, _action) => createOrder(data)}
//         onApprove={(data, _actions) => approveOrder(data)}
//         onCancel={(data, _action) => cancelOrder(data)}
//       />
//     </>
//   );
// };
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
"use client";

import { useAtom, useAtomValue } from "jotai";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import axios, { AxiosError } from "axios";
import { useToast } from "~/components/ui/use-toast";
import { FormAtom, PayPalDisbaleAtom } from "~/utils/stores";
import { PayPalIdAtom } from "~/utils/stores";
import { clearLocalStorage } from "~/utils/funs";

type Props = {
  state: BookingProps;
  setState: React.Dispatch<React.SetStateAction<any>>;
  apiLinkEndpoint: string;
};

export const PayPalButton = ({ state, setState, apiLinkEndpoint }: Props) => {
  const { toast } = useToast();
  const router = useRouter();
  const formData = useAtomValue(FormAtom);
  const [paypalId, setPayPalId] = useAtom(PayPalIdAtom);
  const [isDisable, setDisable] = useAtom(PayPalDisbaleAtom);
  const [isReady, setIsReady] = useState(false);

  useMemo(() => {
    if (paypalId != "") setIsReady(() => true);
  }, [paypalId]);

  const handleDummyClick = async () => {
    try {
      // Simulate order creation
      console.log("Dummy create order called");
      const dummyOrderId = "dummy-order-id"; // Dummy order ID for testing

      // Simulate order approval
      console.log("Dummy approve order called with orderID:", dummyOrderId);
      await axios.post(`/api/order/${apiLinkEndpoint}`, {
        orderId: dummyOrderId,
        bookingData: state,
        formData: formData,
      });

      // Clear local storage and reset state
      clearLocalStorage();
      setPayPalId(() => "");

      setState(() => ({
        boatType: undefined,
        timeSlot: undefined,
        daySlot: undefined,
        date: undefined,
        price: 0,
        adult: undefined,
        child_0_3: 0,
        child_4_8: 0,
        child_9_13: 0,
        child_4_11: 0,
      }));
      setDisable(() => true);
      router.push("/success");
    } catch (error) {
      if (error instanceof AxiosError) {
        toast({
          variant: "destructive",
          description: error.message ?? "Error",
        });
      } else {
        toast({
          variant: "destructive",
          description: "Something went wrong",
        });
      }
    }
  };

  return (
    <>
      <button
        onClick={handleDummyClick}
        disabled={isDisable || !isReady}
        className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-700 disabled:bg-gray-400"
      >
        Simulate Payment
      </button>
    </>
  );
};
