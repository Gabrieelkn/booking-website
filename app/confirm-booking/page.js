"use client";
import { useEffect } from "react";
import styles from "./confirm-booking.module.css";
import { useBooking } from "@/context/BookingContext";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import supabase from "@/utills/supabaseClient";

export default function Payment() {
  const { startDate, endDate, price, formValues, room } = useBooking();
  const currentUser = useSelector((state) => state.currentUser);
  const router = useRouter();

  useEffect(() => {
    if (!room) {
      router.push("/bookings");
    }
  }, [room, router]);

  const handleConfirm = async () => {
    const { data, error } = await supabase
      .from("bookings")
      .insert([
        {
          from: startDate,
          to: endDate,
          user_id: currentUser ? currentUser.id : null,
          name: formValues.name,
          email: formValues.email,
          address: formValues.address,
          city: formValues.city,
          phone: parseFloat(formValues.phone, 10),
          guests: parseFloat(formValues.guests, 10),
          children: parseFloat(formValues.children, 10),
          room: room[0].id,
          price: price,
        },
      ])
      .select();

    if (error) {
      toast.error("Ups! Something happened");
      return null;
    }
    toast.success("Your request was succesful");

    if (currentUser) {
      router.push("/account/bookings");
    } else {
      router.push("/");
    }
    return { data };
  };

  return (
    <div className={styles.booking}>
      <div className={styles.wrapper}>
        <div className={styles.box}>
          <h3>Your details</h3>
          <p>
            <b>Name: {formValues.name}</b>
          </p>
          <p>
            <b>Email: </b>
            {formValues.email}
          </p>
          <p>
            <b>Phone:</b> {formValues.phone}
          </p>
        </div>
        <div className={styles.box}>
          <h3>Booking details</h3>
          <p>
            <b>Room:</b> {room && room.map((room) => room.title)}
          </p>
          <p>
            <b>Check-in:</b> {startDate}
          </p>
          <p>
            <b>Check-out: </b>
            {endDate}
          </p>
          <p>
            <b>Guests:</b> {formValues.guests}
          </p>
          <p>
            <b>Children:</b> {formValues.children}
          </p>
          <p>
            <b>Price:</b> {price}$
          </p>
        </div>
        <button onClick={handleConfirm} className={styles.button}>
          Confirm
        </button>
      </div>
    </div>
  );
}
