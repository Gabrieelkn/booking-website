"use client";
import { useEffect, useCallback } from "react";
import { useBooking } from "@/context/BookingContext";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { loadStripe } from "@stripe/stripe-js";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";
import { parse, differenceInCalendarDays } from "date-fns";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

export default function Checkout() {
  const { startDate, endDate, price, formValues, room } = useBooking();
  const currentUser = useSelector((state) => state.currentUser);
  const router = useRouter();
  const parseDate = (dateStr) => {
    return dateStr ? parse(dateStr, "yyyy MM dd", new Date()) : new Date();
  };

  const bookingDays =
    differenceInCalendarDays(parseDate(endDate), parseDate(startDate)) + 1;
  const fetchClientSecret = useCallback(() => {
    if (currentUser) {
      return fetch("/api/checkout_sessions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          priceId: room[0].stripe_price_id,
          quantity: bookingDays,
          email: currentUser.email,
        }),
      })
        .then((res) => res.json())
        .then((data) => data.clientSecret);
    }
  }, [room, bookingDays, currentUser]);

  const options = { fetchClientSecret };

  useEffect(() => {
    if (!room) {
      router.push("/bookings");
    }
  }, [room, router]);

  return (
    <div style={{ marginTop: "10vh", background: "transparent" }} id="checkout">
      <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  );
}
