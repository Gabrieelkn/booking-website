"use client";
import styles from "./account.module.css";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser } from "@/utills/redux/features/currentUserSlice";
import { useEffect } from "react";
import supabase from "@/utills/supabaseClient";

const ProfileLink = ({ href, title, isActive }) => (
  <Link href={href}>
    <div
      className={`${styles.accordion_title} ${isActive ? styles.active : ""}`}
    >
      {title}
    </div>
  </Link>
);

function SignOutButton({ signOut }) {
  return (
    <button
      onClick={() => {
        signOut();
      }}
      className={styles.logout_btn}
    >
      Sign out
    </button>
  );
}

export default function UserLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();

  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.currentUser);

  useEffect(() => {
    if (!currentUser) {
      router.push("/");
    }
  }, [currentUser]);

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    dispatch(setCurrentUser(null));
  };

  return (
    <div className={styles.user_dashboard}>
      <div className={styles.profile_links}>
        <h2>My account</h2>
        <ProfileLink
          href="/account/profile"
          title="Profile"
          isActive={pathname === "/account/profile"}
        />
        <ProfileLink
          href="/account/bookings"
          title="My bookings"
          isActive={pathname === "/account/bookings"}
        />
        <SignOutButton signOut={handleSignOut} />
      </div>
      <div className={styles.accordion_content}>{children}</div>
    </div>
  );
}
