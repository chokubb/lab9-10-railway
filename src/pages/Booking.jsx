import { useMemo, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { trains } from "../data/trains";
import {
  getBookedSeatNumbers,
  saveBookingBatch,
} from "../services/BookingService";
import WagonSelector from "../components/WagonSelector";
import SeatMap from "../components/SeatMap";
import BookingForm from "../components/BookingForm";
import styles from "../styles/Booking.module.css";

const wagons = [
  { id: "01", type: "Купе", seats: Array.from({ length: 36 }, (_, i) => i + 1) },
  { id: "02", type: "Плацкарт", seats: Array.from({ length: 54 }, (_, i) => i + 1) },
  { id: "03", type: "Люкс", seats: Array.from({ length: 16 }, (_, i) => i + 1) },
];

function Booking() {
  const { trainId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const train = trains.find((item) => item.id === trainId);

  const initialSelectedSeats = location.state?.selectedSeats || [];
  const initialWagonId = location.state?.selectedWagonId || "01";

  const [selectedWagonId, setSelectedWagonId] = useState(initialWagonId);
  const [selectedSeats, setSelectedSeats] = useState(initialSelectedSeats);
  const [step, setStep] = useState(initialSelectedSeats.length > 0 ? "form" : "seats");
  const [errors, setErrors] = useState({});

  const [passengerData, setPassengerData] = useState(() => {
    const data = {};
    initialSelectedSeats.forEach((seat) => {
      data[seat] = {
        firstName: "",
        lastName: "",
        bedding: false,
        tea: false,
      };
    });
    return data;
  });

  const selectedWagon = wagons.find((wagon) => wagon.id === selectedWagonId);

  const bookedSeats = useMemo(() => {
    return getBookedSeatNumbers(trainId, selectedWagonId);
  }, [trainId, selectedWagonId]);

  function handleToggleSeat(seatNumber) {
    if (bookedSeats.includes(seatNumber)) return;

    setSelectedSeats((prev) => {
      const exists = prev.includes(seatNumber);

      if (exists) {
        const updated = prev.filter((seat) => seat !== seatNumber);
        setPassengerData((old) => {
          const copy = { ...old };
          delete copy[seatNumber];
          return copy;
        });
        return updated;
      }

      setPassengerData((old) => ({
        ...old,
        [seatNumber]: {
          firstName: "",
          lastName: "",
          bedding: false,
          tea: false,
        },
      }));

      return [...prev, seatNumber];
    });
  }

  function handleChangeWagon(wagonId) {
    setSelectedWagonId(wagonId);
    setSelectedSeats([]);
    setPassengerData({});
    setErrors({});
    setStep("seats");
  }

  function handleChangePassenger(seat, field, value) {
    setPassengerData((prev) => ({
      ...prev,
      [seat]: {
        ...prev[seat],
        [field]: value,
      },
    }));
  }

  const totalPrice = useMemo(() => {
    return selectedSeats.reduce((sum, seat) => {
      const passenger = passengerData[seat];
      const extras =
        (passenger?.bedding ? 95 : 0) +
        (passenger?.tea ? 20 : 0);

      return sum + train.price + extras;
    }, 0);
  }, [selectedSeats, passengerData, train]);

  function handleProceedToForm() {
    if (selectedSeats.length === 0) {
      toast.error("Спочатку оберіть хоча б одне місце.");
      return;
    }
    setStep("form");
  }

  function handleSubmitBooking() {
    const newErrors = {};

    selectedSeats.forEach((seat) => {
      const passenger = passengerData[seat];
      if (!passenger?.firstName.trim() || !passenger?.lastName.trim()) {
        newErrors[seat] = true;
      }
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      toast.error("Заповніть дані всіх пасажирів.");
      return;
    }

    const tickets = selectedSeats.map((seat) => {
      const passenger = passengerData[seat];
      const extras =
        (passenger.bedding ? 95 : 0) +
        (passenger.tea ? 20 : 0);

      return {
        id: `${trainId}-${selectedWagonId}-${seat}-${Date.now()}`,
        trainId,
        trainNumber: train.number,
        trainName: train.name,
        from: train.from,
        to: train.to,
        date: train.date,
        departure: train.departure,
        wagonId: selectedWagonId,
        seatNumber: seat,
        passenger,
        total: train.price + extras,
      };
    });

    saveBookingBatch(tickets);
    toast.success("Бронювання успішно збережено!");

    setTimeout(() => {
      navigate("/tickets");
    }, 1200);
  }

  if (!train) {
    return <div className={styles.page}>Train not found.</div>;
  }

  return (
    <main className={styles.page}>
      <ToastContainer position="top-right" />

      <div className={styles.topBar}>
        <Link to="/" className={styles.backLink}>← Back to schedule</Link>
      </div>

      <div className={styles.layout}>
        <section className={styles.mainColumn}>
          <h1 className={styles.title}>Seat Booking ✦</h1>

          {step === "seats" ? (
            <>
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
                wagonType={selectedWagon.type}
              />
            </>
          ) : (
            <BookingForm
              selectedSeats={selectedSeats}
              passengerData={passengerData}
              errors={errors}
              onChangePassenger={handleChangePassenger}
              onBack={() => setStep("seats")}
              onSubmit={handleSubmitBooking}
              totalPrice={totalPrice}
            />
          )}
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
                {selectedSeats.map((seat) => {
                  const passenger = passengerData[seat];
                  const extras =
                    (passenger?.bedding ? 95 : 0) +
                    (passenger?.tea ? 20 : 0);

                  return (
                    <div key={seat} className={styles.summaryRow}>
                      <span>Wagon {selectedWagonId}, Seat {seat}</span>
                      <span>{train.price + extras}₴</span>
                    </div>
                  );
                })}

                <div className={styles.totalRow}>
                  <strong>Total</strong>
                  <strong>{totalPrice}₴</strong>
                </div>

                {step === "seats" && (
                  <button
                    type="button"
                    className={styles.proceedBtn}
                    onClick={handleProceedToForm}
                  >
                    Proceed to passenger data
                  </button>
                )}
              </>
            )}
          </div>
        </aside>
      </div>
    </main>
  );
}

export default Booking;