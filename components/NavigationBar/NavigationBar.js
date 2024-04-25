"use client";
import Link from "next/link";
import styles from "./NavigationBar.module.css";
import { RxHamburgerMenu } from "react-icons/rx";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

function NavigationBar() {
  const [visible, setVisible] = useState(false);
  const path = usePathname();

  const toggleMenu = () => {
    setVisible(!visible);
  };
  useEffect(() => {
    setVisible(false);
    window.scrollTo(0, 0);
  }, [path, setVisible]);

  return (
    <>
      <button className={styles.hamburger} onClick={toggleMenu}>
        <RxHamburgerMenu className={styles.icon} />
      </button>
      <nav className={visible ? `${styles.nav} ${styles.active}` : styles.nav}>
        <ul>
          <li onClick={() => setVisible(false)}>
            <Link href="/">Home</Link>
          </li>
          <li onClick={() => setVisible(false)}>
            <Link href="/#rooms">Rooms</Link>
          </li>
          <li>
            <Link href="/bookings">Availability</Link>
          </li>
          <li>
            <Link href="/about-us">About us</Link>
          </li>
          <li>
            <Link href="/conact-us">Contact us</Link>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default NavigationBar;
