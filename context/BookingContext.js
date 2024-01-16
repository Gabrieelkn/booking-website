"use client";
import { createContext, useContext, useEffect, useState } from "react";
import format from "date-fns/format";
import supabase from "@/utills/supabaseClient";

const BookingContext = createContext();

export function BookingProvider({ children }) {
  const [booked, setBooked] = useState(null);
  const [freeRooms, setFreeRooms] = useState(null);
  const [room, setRoom] = useState(false);
  const [price, setPrice] = useState("");
  const [startDate, setStartDate] = useState(
    localStorage.getItem("startDate") || ""
  );
  const [endDate, setEndDate] = useState(localStorage.getItem("endDate") || "");
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [formValues, setFormValues] = useState({
    email: "",
    name: "",
    address: "",
    city: "",
    guests: 1,
    children: 0,
  });

  const handleDates = (item) => {
    setDate([item.selection]);
  };

  useEffect(() => {
    setStartDate(format(String(date[0].startDate), "yyyy MM dd"));
    setEndDate(format(String(date[0].endDate), "yyyy MM dd"));

    localStorage.setItem("startDate", startDate);
    localStorage.setItem("endDate", endDate);
  }, [date, endDate, startDate]);

  useEffect(() => {
    async function fetch() {
      if (booked) {
        let { data: rooms } = await supabase.from("Rooms").select("*");

        const availableRooms = rooms.filter((room) => {
          const isRoomAvailable = !booked.some((booking) => {
            const bookingStartDate = format(
              new Date(booking.from),
              "yyyy MM dd"
            );
            const bookingEndDate = format(new Date(booking.to), "yyyy MM dd");

            const isBookingOverlap =
              (bookingStartDate <= startDate && startDate <= bookingEndDate) ||
              (bookingStartDate <= endDate && endDate <= bookingEndDate) ||
              (startDate <= bookingStartDate && bookingEndDate <= endDate);

            return booking.room === room.id && isBookingOverlap;
          });

          return isRoomAvailable;
        });

        setFreeRooms(availableRooms);
      }
    }
    fetch();
  }, [booked, endDate, startDate]);

  const values = {
    startDate,
    endDate,
    date,
    handleDates,
    freeRooms,
    setBooked,
    formValues,
    setFormValues,
    price,
    setPrice,
    room,
    setRoom,
  };
  return (
    <BookingContext.Provider value={values}>{children}</BookingContext.Provider>
  );
}

export function useBooking() {
  return useContext(BookingContext);
}
