import styles from "../styles/WagonSelector.module.css";

function WagonSelector({ wagons, selectedWagonId, onSelect }) {
  return (
    <div className={styles.wrapper}>
      {wagons.map((wagon) => (
        <button
          key={wagon.id}
          type="button"
          className={`${styles.wagonBtn} ${
            selectedWagonId === wagon.id ? styles.active : ""
          }`}
          onClick={() => onSelect(wagon.id)}
        >
          <span>{wagon.id}</span>
          <small>{wagon.type}</small>
        </button>
      ))}
    </div>
  );
}

export default WagonSelector;