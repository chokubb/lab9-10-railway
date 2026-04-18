import styles from "../styles/BookingForm.module.css";

function BookingForm({
  selectedSeats,
  passengerData,
  errors,
  onChangePassenger,
  onSubmit,
  onBack,
  totalPrice,
}) {
  return (
    <div className={styles.wrapper}>
      {selectedSeats.map((seat) => {
        const data = passengerData[seat] || {
          firstName: "",
          lastName: "",
          bedding: false,
          tea: false,
        };

        return (
          <div key={seat} className={styles.card}>
            <h3>Passenger — Seat {seat}</h3>

            <div className={styles.row}>
              <input
                type="text"
                placeholder="First name"
                value={data.firstName}
                onChange={(e) =>
                  onChangePassenger(seat, "firstName", e.target.value)
                }
              />
              <input
                type="text"
                placeholder="Last name"
                value={data.lastName}
                onChange={(e) =>
                  onChangePassenger(seat, "lastName", e.target.value)
                }
              />
            </div>

            {errors[seat] && (
              <p className={styles.error}>
                First name and last name are required.
              </p>
            )}

            <div className={styles.options}>
              <label>
                <input
                  type="checkbox"
                  checked={data.bedding}
                  onChange={(e) =>
                    onChangePassenger(seat, "bedding", e.target.checked)
                  }
                />
                Bedding (+95₴)
              </label>

              <label>
                <input
                  type="checkbox"
                  checked={data.tea}
                  onChange={(e) =>
                    onChangePassenger(seat, "tea", e.target.checked)
                  }
                />
                Tea (+20₴)
              </label>
            </div>
          </div>
        );
      })}

      <div className={styles.actions}>
        <button type="button" onClick={onBack} className={styles.secondaryBtn}>
          Back to seats
        </button>
        <button type="button" onClick={onSubmit} className={styles.primaryBtn}>
          Proceed to payment — {totalPrice}₴
        </button>
      </div>
    </div>
  );
}

export default BookingForm;