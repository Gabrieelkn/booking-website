"use client";
import styles from "./Booking.module.css";
import React, { useState } from "react";
import format from "date-fns/format";
import { DateRange } from "react-date-range";
import "./styles.css";
import "./theme.css";
import Image from "next/image";
import supabase from "@/utills/supabaseClient";
import Link from "next/link";
import { useBooking } from "@/context/BookingContext";
import { useSelector } from "react-redux";
import Loading from "@/components/loader/Loader";
import toast from "react-hot-toast";
import Container from "@/components/container/container";

export default function Booking() {
  const { startDate, endDate, date, freeRooms, handleDates, setBooked } =
    useBooking();
  const [loading, setLoading] = useState(false);
  const currentUser = useSelector((state) => state.currentUser);

  const handleAvailability = async () => {
    setLoading(true);
    let { data: bookedDays, error } = await supabase
      .from("bookings")
      .select("*")
      .neq("status", "Canceled")
      .neq("status", "Completed");

    if (bookedDays) {
      setBooked(bookedDays);
      setLoading(false);
    } else {
      toast.error("Ups! Try again!");
      setLoading(false);
    }
  };

  return (
    <Container>
      <div className={styles.booking}>
        <span className={styles.checkDate}>
          {!startDate && !endDate
            ? "Check availability"
            : date.map((item) => (
                <React.Fragment key={item.key}>
                  {`${format(item.startDate, "dd, MMM, yyyy")} to ${format(
                    item.endDate,
                    "dd, MMM, yyyy"
                  )}`}
                </React.Fragment>
              ))}
        </span>
        <div className={styles.wrapper}>
          <DateRange
            editableDateInputs={true}
            onChange={handleDates}
            moveRangeOnFirstSelection={false}
            ranges={date}
            minDate={new Date()}
          />
          <CheckAvailabilityButton onClick={handleAvailability} />
        </div>
        {loading ? (
          <Loading />
        ) : (
          freeRooms && (
            <FreeRooms
              freeRooms={freeRooms}
              startDate={startDate}
              endDate={endDate}
              currentUser={currentUser}
            />
          )
        )}
      </div>
    </Container>
  );
}

function CheckAvailabilityButton({ onClick }) {
  return (
    <button onClick={onClick} className={styles.button}>
      Check Availability
    </button>
  );
}

function Room({
  image,
  title,
  amenities,
  facilities,
  price,
  room,
  currentUser,
}) {
  return (
    <div className={styles.room}>
      <Image
        className={styles.image}
        src={image}
        width={1000}
        height={1000}
        alt="bedroom"
      />
      <div className={styles.text}>
        <h3>{title}</h3>
        <i>Available</i>
        <h4>{price}$ / guest</h4>
        <h4>Amenities:</h4>
        <ul>
          {amenities.map((item, index) => (
            <li key={`amenity-${index}`}>{item}</li>
          ))}
        </ul>
        <h4>Facilities:</h4>
        <ul className={styles.facilities}>
          {facilities.map((item, index) => (
            <li key={`facility-${index}`}>{item}</li>
          ))}
        </ul>
        <Link
          href={
            currentUser
              ? `/bookings/${room.title.toLowerCase().replace(/\s+/g, "-")}`
              : "/login"
          }
        >
          <button className={styles.bookingButton}>BOOK NOW</button>
        </Link>{" "}
      </div>
    </div>
  );
}
function FreeRooms({ freeRooms, currentUser }) {
  return (
    <div className={styles.rooms}>
      <h2>Available rooms</h2>
      {freeRooms.length === 0 ? (
        <p>Sorry, all rooms are booked</p>
      ) : (
        freeRooms.map((room, index) => (
          <Room room={room} currentUser={currentUser} key={index} {...room} />
        ))
      )}
    </div>
  );
}
