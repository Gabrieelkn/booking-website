import styles from "./styles.module.css";
export default function Loading() {
  return (
    <div className={styles.loader_background}>
      <div className={styles.loader}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}
