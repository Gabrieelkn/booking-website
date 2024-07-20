"use client";
import styles from "./styles.module.css";
import { AiOutlineUser } from "react-icons/ai";
import Link from "next/link";
import { useEffect } from "react";
import { setCurrentUser } from "@/utills/redux/features/currentUserSlice";
import { useDispatch, useSelector } from "react-redux";
import supabase from "@/utills/supabaseClient";

export default function UserIcon() {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.currentUser);

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
    <button className={styles.user_btn}>
      <Link href={currentUser ? "/account/profile" : "/login"}>
        <AiOutlineUser className={styles.icon} />
      </Link>
    </button>
  );
}
