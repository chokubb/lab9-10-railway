import styles from "../styles/TrainCard.module.css";
import { Link } from "react-router-dom";

function TrainCard({ train }) {
  return (
    <article className={styles.card}>
      <div className={styles.leftAccent}></div>

      <div className={styles.mainInfo}>
        <div className={styles.topRow}>
          <span className={styles.number}>{train.number}</span>
          <span className={styles.name}>{train.name}</span>
        </div>

        <div className={styles.routeRow}>
          <div>
            <p className={styles.city}>{train.from}</p>
            <span className={styles.meta}>
              {train.date}, {train.departure}
            </span>
          </div>

          <div className={styles.middleMeta}>
            <span>{train.duration}</span>
          </div>

          <div>
            <p className={styles.city}>{train.to}</p>
            <span className={styles.arrival}>Arrives same orbit</span>
          </div>
        </div>
      </div>

      <div className={styles.sideInfo}>
        <p className={styles.price}>{train.price}₴</p>
        <Link to={`/booking/${train.id}`} className={styles.button}>
          Select Seats ✦
        </Link>
      </div>
    </article>
  );
}

export default TrainCard;