// PayPalButton.tsx
import React from "react";
import {
  FUNDING,
  PayPalButtons,
  PayPalScriptProvider,
} from "@paypal/react-paypal-js";
import { OnApproveData, OrderResponseBody } from "@paypal/paypal-js";

interface PaypalButtonProps {
  amount: string; // PayPal requires a string amount
  onSuccess: (details: OrderResponseBody) => void;
}

const PayPalButton: React.FC<PaypalButtonProps> = ({ amount, onSuccess }) => {
  return (
    <PayPalScriptProvider
      options={{
        clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "",
        currency: "USD",
      }}
    >
      <PayPalButtons
        fundingSource={FUNDING.PAYPAL}
        createOrder={(_, actions) => {
          return actions.order.create({
            intent: "CAPTURE", // Required by PayPal
            purchase_units: [
              {
                amount: {
                  currency_code: "USD",
                  value: amount,
                },
              },
            ],
          });
        }}
        onApprove={(_: OnApproveData, actions) => {
          if (!actions.order) return Promise.reject();
          return actions.order.capture().then((details: OrderResponseBody) => {
            onSuccess(details);
          });
        }}
      />
    </PayPalScriptProvider>
  );
};

export default PayPalButton;
