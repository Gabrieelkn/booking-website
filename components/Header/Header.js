import styles from "./Header.module.css";
import NavigationBar from "../NavigationBar/NavigationBar";
import Link from "next/link";
import UserIcon from "../UserIcon/UserIcon";

function Header() {
  return (
    <>
      <header className={styles.header}>
        <div className={styles.container}>
          <Link className={styles.logo} href="/">
            LOGO
          </Link>
          <NavigationBar />
          <UserIcon />
        </div>
      </header>
    </>
  );
}

export default Header;
