import styles from "../styles/SeatMap.module.css";

function SeatMap({ seats, selectedSeats, bookedSeats, onToggleSeat }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.legend}>
        <span><i className={`${styles.dot} ${styles.free}`}></i> Free</span>
        <span><i className={`${styles.dot} ${styles.selected}`}></i> Selected</span>
        <span><i className={`${styles.dot} ${styles.booked}`}></i> Booked</span>
      </div>

      <div className={styles.grid}>
        {seats.map((seat) => {
          const isBooked = bookedSeats.includes(seat);
          const isSelected = selectedSeats.includes(seat);

          let stateClass = styles.freeSeat;
          if (isBooked) stateClass = styles.bookedSeat;
          if (isSelected) stateClass = styles.selectedSeat;

          return (
            <button
              key={seat}
              type="button"
              className={`${styles.seat} ${stateClass}`}
              onClick={() => onToggleSeat(seat)}
              disabled={isBooked}
            >
              {seat}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default SeatMap;