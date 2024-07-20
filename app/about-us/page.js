import styles from "./styles.module.css";

export default function AboutUs() {
  return (
    <div className={styles.page}>
      <section className={styles.header}>
        <div className={styles.overlay}>
          <h2>About us</h2>
        </div>
      </section>
      <article className={styles.article}>
        <h3> Our Hotel</h3>
        <p>
          {" "}
          Maecenas feugiat mattis ipsum, vitae semper massa porttitor sit amet.
          Nulla mattis, urna et posuere ornare, neque leo dapibus ante, nec
          dignissim massa felis sed nulla. Donec porttitor nulla et tristique
          dignissim. Cras vulputate iaculis metus ac rutrum. Class aptent taciti
          sociosqu ad litora torquent per conubia nostra, per inceptos
          himenaeos. Pellentesque vel justo Nam eget nulla in nibh gravida
          condimentum non sed nisi.
        </p>
        <p>
          Integer ipsum nisl, porta id venenatis quis, fringilla ac est nulla
          lorem nunc, viverra at aliquet at. Nunc et tincidunt nisl. Etiam vitae
          lobortis eros. Cras quis vehicula odio. Ut euismod nunc quis nisi
          facilisis dapibus. Vestibulum dignissim sem id velit dignissim ornare.
        </p>
      </article>
    </div>
  );
}
