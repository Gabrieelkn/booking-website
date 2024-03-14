import styles from "./Header.module.css";
import NavigationBar from "../NavigationBar/NavigationBar";
import Link from "next/link";
import UserWidget from "../UserWidget/UserWidget";

function Header() {
  return (
    <>
      <header className={styles.header}>
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
