"use client";
import styles from "./page.module.css";
import { useBooking } from "@/context/BookingContext";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import FormInput from "@/components/FormInput/FormInput";
import { differenceInCalendarDays } from "date-fns";
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
  const bookingDays = differenceInCalendarDays(endDate, startDate) + 1;

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
      name: "address",
      type: "text",
      placeholder: "Address",
      label: "Address",
      required: true,
    },
    {
      id: 3,
      name: "city",
      type: "text",
      placeholder: "City",
      label: "City",
      required: true,
    },
    {
      id: 4,
      name: "phone",
      type: "number",
      placeholder: "Phone",
      label: "Phone",
      required: true,
    },
    {
      id: 5,
      name: "email",
      type: "email",
      placeholder: "Email",
      error: "Email address is not valid!",
      label: "Email",
      required: true,
    },
    {
      id: 6,
      name: "guests",
      type: "number",
      min: 1,
      placeholder: "Guests",
      error: "Invalid guests number",
      label: "Guests",
      required: true,
    },
    {
      id: 7,
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
                    {loading ? "Loading..." : "Next"}
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
  return (
    <div className={styles.priceWrapper}>
      Price for {formValues.guests} {formValues.guests > 1 ? "guests" : "guest"}{" "}
      {formValues.children != 0 ? `and ${formValues.children} children` : ""}{" "}
      {bookingDays === 1 ? "for 1 day" : `for ${bookingDays} days`}
      <b className={styles.price}>
        {(room.price * formValues.guests +
          (room.price / 2) * formValues.children) *
          bookingDays}
        $
      </b>
    </div>
  );
}
