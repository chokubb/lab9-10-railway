import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { trains } from "../data/trains";
import { getBookedSeatNumbers } from "../services/BookingService";
import WagonSelector from "../components/WagonSelector";
import SeatMap from "../components/SeatMap";
import styles from "../styles/Booking.module.css";

const wagons = [
  { id: "01", type: "Купе", seats: Array.from({ length: 16 }, (_, i) => i + 1) },
  { id: "02", type: "Плацкарт", seats: Array.from({ length: 24 }, (_, i) => i + 1) },
  { id: "03", type: "Люкс", seats: Array.from({ length: 8 }, (_, i) => i + 1) },
];

function Booking() {
  const { trainId } = useParams();
  const train = trains.find((item) => item.id === trainId);

  const [selectedWagonId, setSelectedWagonId] = useState("01");
  const [selectedSeats, setSelectedSeats] = useState([]);

  const selectedWagon = wagons.find((wagon) => wagon.id === selectedWagonId);

  const bookedSeats = useMemo(() => {
    return getBookedSeatNumbers(trainId, selectedWagonId);
  }, [trainId, selectedWagonId]);

  function handleToggleSeat(seatNumber) {
    if (bookedSeats.includes(seatNumber)) return;

    setSelectedSeats((prev) =>
      prev.includes(seatNumber)
        ? prev.filter((seat) => seat !== seatNumber)
        : [...prev, seatNumber]
    );
  }

  function handleChangeWagon(wagonId) {
    setSelectedWagonId(wagonId);
    setSelectedSeats([]);
  }

  if (!train) {
    return <div className={styles.page}>Train not found.</div>;
  }

  return (
    <main className={styles.page}>
      <div className={styles.topBar}>
        <Link to="/" className={styles.backLink}>← Back to schedule</Link>
      </div>

      <div className={styles.layout}>
        <section className={styles.mainColumn}>
          <h1 className={styles.title}>Seat Booking ✦</h1>

          <WagonSelector
            wagons={wagons}
            selectedWagonId={selectedWagonId}
            onSelect={handleChangeWagon}
          />

          <SeatMap
            seats={selectedWagon.seats}
            selectedSeats={selectedSeats}
            bookedSeats={bookedSeats}
            onToggleSeat={handleToggleSeat}
          />
        </section>

        <aside className={styles.sidebar}>
          <h2>{train.from} → {train.to}</h2>
          <p>{train.date}, {train.departure}</p>
          <p>{train.number} ({train.name})</p>

          <div className={styles.summaryBox}>
            {selectedSeats.length === 0 ? (
              <p>No seats selected yet.</p>
            ) : (
              <>
                {selectedSeats.map((seat) => (
                  <div key={seat} className={styles.summaryRow}>
                    <span>Wagon {selectedWagonId}, Seat {seat}</span>
                    <span>{train.price}₴</span>
                  </div>
                ))}

                <div className={styles.totalRow}>
                  <strong>Total</strong>
                  <strong>{selectedSeats.length * train.price}₴</strong>
                </div>

                <Link
                  to={`/booking/${trainId}?step=form&wagon=${selectedWagonId}`}
                  state={{ selectedSeats, selectedWagonId }}
                  className={styles.proceedBtn}
                >
                  Proceed to passenger data
                </Link>
              </>
            )}
          </div>
        </aside>
      </div>
    </main>
  );
}

export default Booking;