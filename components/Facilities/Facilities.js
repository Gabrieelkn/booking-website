import Container from "@/components/container/container";
import styles from "./Facilities.module.css";
import { FaWifi, FaParking, FaTree, FaPaw } from "react-icons/fa";
import { MdFamilyRestroom, MdOutlineFoodBank } from "react-icons/md";

function Facility({ icon, text }) {
  return (
    <div className={styles.facility}>
      <i className={styles.icon}>{icon}</i>
      <p> {text}</p>
    </div>
  );
}

export default function Facilities() {
  return (
    <Container>
      <div className={styles.facilities}>
        <h2>Facilities</h2>
        <i>
          Discover comfort and convenience in our rooms, featuring modern
          amenities such as Wi-Fi, cozy bedding, and more.
        </i>
        <div className={styles.wrapper}>
          <Facility
            icon={<FaWifi className={styles.icon} />}
            text="Free WiFi"
          />
          <Facility
            icon={<FaParking className={styles.icon} />}
            text="Free Parking"
          />
          <Facility
            icon={<MdFamilyRestroom className={styles.icon} />}
            text="Family Rooms"
          />
          <Facility
            icon={<MdOutlineFoodBank className={styles.icon} />}
            text="Food and Drinks"
          />
          <Facility
            icon={<FaTree className={styles.icon} />}
            text="Outdoor Activities"
          />
          <Facility
            icon={<FaPaw className={styles.icon} />}
            text="Pets are Allowed"
          />{" "}
        </div>
      </div>
    </Container>
  );
}
