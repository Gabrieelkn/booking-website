import styles from "./page.module.css";
import Rooms from "@/components/Rooms/Rooms";
import Facilities from "@/components/Facilities/Facilities";
import Hotel1 from "@/public/hotel1.png";
import Hotel2 from "@/public/hotel2.png";
import Hotel3 from "@/public/hotel3.png";
import Hotel4 from "@/public/hotel4.png";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <Main />
      <div className={styles.root}>
        <Facilities />
        <Rooms />
        <Hotel />
      </div>
    </>
  );
}

function Main() {
  return (
    <main className={styles.main}>
      <div className={styles.overlay}>
        <h1>Hotel boooking</h1>
        <p>Experience the best of our hotel with these exclusive amenities</p>

        <CheckAvailabilityButton />
      </div>
    </main>
  );
}

function CheckAvailabilityButton() {
  return (
    <Link href="/bookings" className={styles.button}>
      Book Now
    </Link>
  );
}

function Hotel() {
  return (
    <section className={styles.hotel}>
      <h2>Our Rooms</h2>
      <p>
        Experience the comfort and luxury of our beautifully designed rooms,
        each tailored to provide you with an unforgettable stay.
      </p>
      <div className={styles.room}>
        <Image src={Hotel1} width={500} height={500} alt="Room with a view" />
        <div className={styles.roomDescription}>
          <h3>Room with a View</h3>
          <p>
            Enjoy a breathtaking view of the city from the comfort of your room,
            complete with modern amenities and a cozy ambiance.
          </p>
        </div>
      </div>
      <div className={`${styles.room} ${styles.reverse}`}>
        <Image src={Hotel2} width={500} height={500} alt="Deluxe Suite" />
        <div className={styles.roomDescription}>
          <h3>Deluxe Suite</h3>
          <p>
            Our Deluxe Suite offers spacious living areas and luxurious
            furnishings, perfect for a relaxing and indulgent stay.
          </p>
        </div>
      </div>
      <div className={styles.room}>
        <Image src={Hotel3} width={500} height={500} alt="Family Room" />
        <div className={styles.roomDescription}>
          <h3>Family Room</h3>
          <p>
            The ideal choice for families, this room features ample space and
            child-friendly amenities to ensure a comfortable stay for everyone.
          </p>
        </div>
      </div>
      <div className={`${styles.room} ${styles.reverse}`}>
        <Image src={Hotel4} width={500} height={500} alt="Single Room" />
        <div className={styles.roomDescription}>
          <h3>Single Room</h3>
          <p>
            Perfect for solo travelers, our Single Room offers a peaceful
            retreat with all the necessary comforts and conveniences.
          </p>
        </div>
      </div>
    </section>
  );
}
