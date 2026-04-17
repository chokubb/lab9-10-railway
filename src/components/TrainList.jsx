import TrainCard from "./TrainCard";
import styles from "../styles/TrainList.module.css";

function TrainList({ trains }) {
  if (trains.length === 0) {
    return (
      <div className={styles.emptyState}>
        За вашим запитом нічого не знайдено.
      </div>
    );
  }

  return (
    <div className={styles.list}>
      {trains.map((train) => (
        <TrainCard key={train.id} train={train} />
      ))}
    </div>
  );
}

export default TrainList;