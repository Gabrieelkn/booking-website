"use client";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import supabase from "@/utills/supabaseClient";
import { useSelector } from "react-redux";
import Loading from "@/app/signup/loading";
import toast from "react-hot-toast";

export default function MyBookings() {
  const currentUser = useSelector((state) => state.currentUser);
  const [loading, setLoading] = useState(true);
  const [bookings, setBookings] = useState([]);
  const [modal, setModal] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState(null);

  console.log(selectedBookingId);

  const handleCancelBooking = async (id) => {
    console.log(id);
    const { data, error } = await supabase
      .from("bookings")
      .update({ status: "Canceled" })
      .eq("id", id)
      .select();
    if (!error) {
      console.log(data);
      toast.success("Your booking was canceled");
    } else {
      toast.error("An error happened");
    }
    setModal(false);
    setLoading(true);
  };

  useEffect(() => {
    if (currentUser && currentUser.id && loading) {
      async function fetchBookings() {
        let { data, error } = await supabase
          .from("bookings")
          .select(
            `
          *,
          Rooms (
            *
          )
        `
          )
          .eq("user_id", currentUser.id);

        if (data) {
          setBookings(data);
        }
      }

      fetchBookings();
      setLoading(false);
    }
  }, [currentUser, loading]);

  return (
    <div className={styles.bookings}>
      {loading ? (
        <Loading />
      ) : (
        bookings &&
        bookings.map((booking) => {
          return (
            <div className={styles.booking} key={booking.id}>
              <h3>
                {booking.Rooms.title} -{" "}
                <b
                  className={
                    booking.status === "Pending"
                      ? styles.pending
                      : booking.status === "Completed"
                      ? styles.completed
                      : styles.canceled
                  }
                >
                  {booking.status}
                </b>
              </h3>
              <p>
                <b>Check-in:</b> {booking.from}
              </p>
              <p>
                <b>Check-out:</b> {booking.to}
              </p>
              <p>
                <b>Price:</b> {booking.price}$
              </p>
              <Details booking={booking} />
              {booking.status !== "Canceled" &&
                booking.status !== "Completed" && (
                  <button
                    className={styles.button}
                    onClick={() => {
                      setSelectedBookingId(booking.id);
                      setModal(true);
                    }}
                  >
                    Cancel
                  </button>
                )}
              <ConfirmModal
                modal={modal}
                setModal={setModal}
                handleCancelBooking={() =>
                  handleCancelBooking(selectedBookingId)
                }
              />
            </div>
          );
        })
      )}
    </div>
  );
}

function Details({ booking }) {
  return (
    <div className={styles.details}>
      <b>Details</b>
      <p> {booking.name}</p>
      <p> {booking.address}</p>
      <p> {booking.city}</p>
      <p>
        {" "}
        {booking.guests} {booking.guests > 1 ? "guests" : "guest"}
      </p>
      <p> {booking.children} children</p>
    </div>
  );
}

function ConfirmModal({ modal, setModal, handleCancelBooking }) {
  return (
    <div
      className={
        modal
          ? `${styles.confirmModal} ${styles.activeModal}`
          : styles.confirmModal
      }
    >
      <div className={styles.wrapper}>
        <p>You are about to cancel your reservation. Are you sure?</p>
        <div className={styles.buttons}>
          <button onClick={handleCancelBooking} className={styles.yesButton}>
            Yes
          </button>
          <button onClick={() => setModal(false)} className={styles.noButton}>
            No
          </button>
        </div>
      </div>
    </div>
  );
}
