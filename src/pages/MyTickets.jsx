import { Link } from "react-router-dom";
import { clearAllBookings, getBookings } from "../services/BookingService";
import styles from "../styles/Booking.module.css";
import { useState } from "react";

function MyTickets() {
  const [tickets, setTickets] = useState(getBookings());

  function handleClear() {
    clearAllBookings();
    setTickets([]);
  }

  return (
    <main className={styles.page}>
      <div className={styles.topBar}>
        <Link to="/" className={styles.backLink}>← Back to home</Link>
      </div>

      <div className={styles.ticketsHeader}>
        <h1>My Tickets ✦</h1>
        {tickets.length > 0 && (
          <button className={styles.clearBtn} onClick={handleClear}>
            Clear all
          </button>
        )}
      </div>

      {tickets.length === 0 ? (
        <div className={styles.emptyTickets}>
          <p>You haven’t booked any tickets yet.</p>
        </div>
      ) : (
        <div className={styles.ticketsList}>
          {tickets.map((ticket) => (
            <div key={ticket.id} className={styles.ticketCard}>
              <h3>{ticket.from} → {ticket.to}</h3>
              <p>{ticket.date} | Train {ticket.trainNumber}</p>
              <p>Wagon {ticket.wagonId}, Seat {ticket.seatNumber}</p>
              <p>
                {ticket.passenger.firstName} {ticket.passenger.lastName}
              </p>
              <p>
                {ticket.passenger.bedding ? "Bedding " : ""}
                {ticket.passenger.tea ? "Tea" : ""}
              </p>
              <strong>{ticket.total}₴</strong>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}

export default MyTickets;