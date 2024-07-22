"use client";
import styles from "./page.module.css";
import { useBooking } from "@/context/BookingContext";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import FormInput from "@/components/FormInput/FormInput";
import { parse, differenceInCalendarDays } from "date-fns";
import Container from "@/components/container/container";

export default function Room({ params }) {
  const {
    freeRooms,
    startDate,
    endDate,
    formValues,
    setFormValues,
    setPrice,
    setRoom,
    room,
  } = useBooking();
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const parseDate = (dateStr) => {
    return dateStr ? parse(dateStr, "yyyy MM dd", new Date()) : new Date();
  };

  const bookingDays =
    differenceInCalendarDays(parseDate(endDate), parseDate(startDate)) + 1;

  const inputs = [
    {
      id: 1,
      name: "name",
      type: "text",
      placeholder: "Name",
      label: "Name",
      required: true,
    },
    {
      id: 2,
      name: "phone",
      type: "number",
      placeholder: "Phone",
      label: "Phone",
      required: true,
    },
    {
      id: 3,
      name: "email",
      type: "email",
      placeholder: "Email",
      error: "Email address is not valid!",
      label: "Email",
      required: true,
    },
    {
      id: 4,
      name: "guests",
      type: "number",
      min: 1,
      placeholder: "Guests",
      error: "Invalid guests number",
      label: "Guests",
      required: true,
    },
    {
      id: 5,
      name: "children",
      type: "number",
      min: 0,
      placeholder: "Children",
      label: "Children",
      required: true,
    },
  ];

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const price = room.map((room) => room.price);
    setPrice(
      (price * formValues.guests + (price / 2) * formValues.children) *
        bookingDays
    );
    if (price) {
      router.push("/confirm-booking");
    }
  };

  useEffect(() => {
    if (!freeRooms) {
      router.push("/bookings");
    } else {
      setRoom(
        freeRooms.filter(
          (room) =>
            room.title ===
            params.id.charAt(0).toUpperCase() +
              params.id.slice(1).replace(/-/g, " ")
        )
      );
    }
  }, [freeRooms, params.id, router]);

  return (
    <Container>
      <div className={styles.page}>
        {room &&
          room.map((room) => {
            return (
              <div className={styles.room} key={room.id}>
                <Image
                  src={room.image}
                  alt={room.title}
                  width={1000}
                  height={1000}
                />
                <div className={styles.roomDetails}>
                  <h3>{room.title}</h3>
                  <p>
                    <b>Check-in:</b> {startDate}
                  </p>
                  <p>
                    <b>Check-out:</b> {endDate}
                  </p>
                </div>
                <h3 className={styles.formHeader}>Booking details</h3>
                <form className={styles.form} onSubmit={onSubmit}>
                  {inputs.map((input) => (
                    <FormInput
                      key={input.id}
                      {...input}
                      value={formValues[input.name]}
                      onChange={handleChange}
                    />
                  ))}
                  <Price
                    formValues={formValues}
                    room={room}
                    bookingDays={bookingDays}
                  />
                  <button className={styles.login_btn} disabled={loading}>
                    {loading ? "Loading..." : "Checkout"}
                  </button>
                </form>
              </div>
            );
          })}
      </div>
    </Container>
  );
}

function Price({ formValues, room, bookingDays }) {
  if (!room) return null;

  const roomPrice = Number(room.price) || 0;
  const guests = Number(formValues.guests) || 0;
  const children = Number(formValues.children) || 0;
  const days = Number(bookingDays) || 0;

  const totalPrice = (roomPrice * guests + (roomPrice / 2) * children) * days;

  if (isNaN(totalPrice) || totalPrice === Infinity) {
    console.error("Calculated totalPrice is not a valid number:", totalPrice);
    return null;
  }

  return (
    <div className={styles.priceWrapper}>
      <p>
        {days} {days === 1 ? "day" : "days"}
      </p>
      Price for {guests} {guests > 1 ? "guests" : "guest"}{" "}
      {children !== 0 ? `and ${children} children` : ""}
      <b className={styles.price}>{totalPrice}$</b>
    </div>
  );
}
