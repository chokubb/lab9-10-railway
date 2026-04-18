const STORAGE_KEY = "artemisRailBookings";

export function getBookings() {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
}

export function saveBookingBatch(newTickets) {
  const current = getBookings();
  const updated = [...current, ...newTickets];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return updated;
}

export function clearAllBookings() {
  localStorage.removeItem(STORAGE_KEY);
}

export function getBookedSeatNumbers(trainId, wagonId) {
  return getBookings()
    .filter(
      (ticket) => ticket.trainId === trainId && ticket.wagonId === wagonId
    )
    .map((ticket) => ticket.seatNumber);
}