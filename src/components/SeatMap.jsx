import styles from "../styles/SeatMap.module.css";

function SeatMap({
  seats,
  selectedSeats,
  bookedSeats,
  onToggleSeat,
  wagonType,
}) {
  function renderSeat(seatNumber, isUpper = false) {
    const isBooked = bookedSeats.includes(seatNumber);
    const isSelected = selectedSeats.includes(seatNumber);

    let seatClass = styles.freeSeat;
    if (isBooked) seatClass = styles.bookedSeat;
    if (isSelected) seatClass = styles.selectedSeat;

    return (
      <div key={seatNumber} className={styles.seatShell}>
        {isUpper && <span className={styles.upperMarker}></span>}
        <button
          type="button"
          className={`${styles.seat} ${seatClass}`}
          onClick={() => onToggleSeat(seatNumber)}
          disabled={isBooked}
        >
          {seatNumber}
        </button>
      </div>
    );
  }

  function chunkArray(array, chunkSize) {
    const chunks = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      chunks.push(array.slice(i, i + chunkSize));
    }
    return chunks;
  }

  function renderCoupeLayout() {
    const compartments = chunkArray(seats, 4);

    return (
      <div className={styles.compartmentGrid}>
        {compartments.map((group, index) => (
          <div key={index} className={styles.compartment}>
            <div className={styles.compartmentTitle}>Купе {index + 1}</div>

            <div className={styles.fourSeatLayout}>
              {group[0] !== undefined && renderSeat(group[0], true)}
              {group[1] !== undefined && renderSeat(group[1], true)}
              {group[2] !== undefined && renderSeat(group[2], false)}
              {group[3] !== undefined && renderSeat(group[3], false)}
            </div>
          </div>
        ))}
      </div>
    );
  }

    function renderLuxuryLayout() {
    const compartments = chunkArray(seats, 2);

    return (
        <div className={styles.compartmentGrid}>
        {compartments.map((group, index) => (
            <div key={index} className={styles.compartment}>
            <div className={styles.compartmentTitle}>Люкс {index + 1}</div>

            <div className={styles.twoSeatLayout}>
                {group[0] !== undefined && renderSeat(group[0], false)}
                {group[1] !== undefined && renderSeat(group[1], false)}
            </div>
            </div>
        ))}
        </div>
    );
    }

  function renderPlatzkartLayout() {
    const mainSeats = seats.filter((seat) => seat <= 36);
    const sideSeats = seats.filter((seat) => seat > 36);

    const compartments = chunkArray(mainSeats, 4);
    const sidePairs = chunkArray(sideSeats, 2);

    return (
      <div className={styles.platzkartWrapper}>
        <div className={styles.compartmentGrid}>
          {compartments.map((group, index) => (
            <div key={index} className={styles.compartment}>
              <div className={styles.compartmentTitle}>Секція {index + 1}</div>

              <div className={styles.fourSeatLayout}>
                {group[0] !== undefined && renderSeat(group[0], true)}
                {group[1] !== undefined && renderSeat(group[1], true)}
                {group[2] !== undefined && renderSeat(group[2], false)}
                {group[3] !== undefined && renderSeat(group[3], false)}
              </div>
            </div>
          ))}
        </div>

        {sidePairs.length > 0 && (
          <div className={styles.sideSeatsBlock}>
            <div className={styles.sideTitle}>Бокові місця</div>

            <div className={styles.sideSeatsRow}>
              {sidePairs.map((pair, index) => (
                <div key={index} className={styles.sidePair}>
                  {pair[0] !== undefined && renderSeat(pair[0], true)}
                  {pair[1] !== undefined && renderSeat(pair[1], false)}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  function renderLayout() {
    if (wagonType === "Купе") return renderCoupeLayout();
    if (wagonType === "Плацкарт") return renderPlatzkartLayout();
    return renderLuxuryLayout();
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.legend}>
        <span><i className={`${styles.dot} ${styles.free}`}></i> Free</span>
        <span><i className={`${styles.dot} ${styles.selected}`}></i> Selected</span>
        <span><i className={`${styles.dot} ${styles.booked}`}></i> Booked</span>
      </div>

      {renderLayout()}

      <div className={styles.note}>
        Смуга над номером означає верхню полицю.
      </div>
    </div>
  );
}

export default SeatMap;