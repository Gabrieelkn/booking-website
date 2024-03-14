import styles from "./page.module.css";
import Rooms from "@/components/Rooms/Rooms";
import Facilities from "@/components/Facilities/Facilities";
import Drinks from "@/public/drinks.png";
import Gym from "@/public/weight.png";
import Events from "@/public/event.png";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <Main />
      <div className={styles.root}>
        <Facilities />
        <Rooms />
      </div>
    </>
  );
}

function Main() {
  return (
    <main className={styles.main}>
      <div className={styles.overlay}>
        <h1>Hotel boooking</h1>
        <div className={styles.wrapper}>
          <Box src={Drinks} text="Free drinks" />
          <Box src={Gym} text="Gym" />
          <Box src={Events} text="Events" />
        </div>
        <CheckAvailabilityButton />
      </div>
    </main>
  );
}

function CheckAvailabilityButton() {
  return (
    <Link href="/bookings" className={styles.button}>
      Check Availability
    </Link>
  );
}

function Box({ src, text }) {
  return (
    <div className={styles.box}>
      <Image
        className={styles.image}
        src={src}
        alt="box"
        width={500}
        height={500}
      />
      <b>{text}</b>
    </div>
  );
}
