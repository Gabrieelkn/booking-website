"use client";
import NavigationBar from "../NavigationBar/NavigationBar";
import styles from "./Header.module.css";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import UserWidget from "../UserWidget/UserWidget";

function Header() {
  const ref = useRef();
  const [show, setShow] = useState(false);

  const handleSearchBarShow = () => {
    setShow(!show);
  };

  return (
    <>
      <header ref={ref} className={styles.header}>
        <div className={styles.container}>
          <Link className={styles.logo} href="/">
            LOGO
          </Link>
          <NavigationBar />
          <UserWidget />
        </div>
      </header>
    </>
  );
}

export default Header;
