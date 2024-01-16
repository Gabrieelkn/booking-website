"use client";
import styles from "./styles.module.css";
import { AiOutlineUser } from "react-icons/ai";
import Link from "next/link";
import { useEffect } from "react";
import { setCurrentUser } from "@/utills/redux/features/currentUserSlice";
import { useSelector, useDispatch } from "react-redux";
import supabase from "@/utills/supabaseClient";

export default function UserWidget() {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.currentUser);

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    dispatch(setCurrentUser(null));
  };

  useEffect(() => {
    async function getCurrentUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        dispatch(setCurrentUser(user));
      }
    }
    getCurrentUser();
  }, []);

  return (
    <>
      <button className={styles.user_btn}>
        <AiOutlineUser className={styles.icon} />
      </button>
      <div className={styles.user_box}>
        {currentUser ? (
          <div className={styles.user_info}>
            <p>{currentUser.email}</p>
            <Link href="/account/profile">
              <button className={styles.my_account_btn}>Profile</button>
            </Link>
            <Link href="/account/bookings">
              <button className={styles.my_account_btn}>My bookings</button>
            </Link>
            <button onClick={handleSignOut} className={styles.logout_btn}>
              Sign out
            </button>
          </div>
        ) : (
          <div className={styles.user_loged_out}>
            <p>You are not connected</p>
            <div className={styles.user_btns}>
              <Link href="/login">
                <button className={styles.user_login_btn}>Sign in</button>
              </Link>
              <Link href="/signup">
                <button className={styles.new_user_btn}>Sign up</button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
