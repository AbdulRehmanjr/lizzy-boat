"use client";

import React from "react";
import { TRPCReactProvider } from "~/trpc/react";
import { Provider } from "jotai";
import { env } from "~/env";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <TRPCReactProvider>
      <PayPalScriptProvider
        options={{
          currency: "EUR",
          clientId: env.NEXT_PUBLIC_PAYPAL,
          disableFunding: ["paylater"],
        }}
      >
        <Provider>{children}</Provider>
      </PayPalScriptProvider>
    </TRPCReactProvider>
  );
};

export default Providers;
