import styles from "./Rooms.module.css";
import Image from "next/image";
import supabase from "@/utills/supabaseClient";
import Container from "@/components/container/container";

function Room({ image, title, amenities, facilities }) {
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
      </div>
    </div>
  );
}

export default async function Rooms() {
  let { data: rooms } = await supabase.from("Rooms").select("*");

  return (
    <Container>
      <div id="rooms" className={styles.rooms}>
        <h2>Our facilities</h2>
        {rooms.length > 0 &&
          rooms.map((room, index) => <Room key={index} {...room} />)}
      </div>
    </Container>
  );
}
