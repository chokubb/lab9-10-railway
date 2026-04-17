import { useMemo, useState } from "react";
import { trains } from "../data/trains";
import TrainList from "../components/TrainList";
import styles from "../styles/Home.module.css";

function Home() {
  const [numberQuery, setNumberQuery] = useState("");
  const [cityQuery, setCityQuery] = useState("");

  const filteredTrains = useMemo(() => {
    return trains.filter((train) => {
      const matchesNumber = train.number
        .toLowerCase()
        .includes(numberQuery.toLowerCase());

      const matchesCity = train.to
        .toLowerCase()
        .includes(cityQuery.toLowerCase());

      return matchesNumber && matchesCity;
    });
  }, [numberQuery, cityQuery]);

  return (
    <main className={styles.page}>
      <header className={styles.hero}>
        <span className={styles.badge}>Artemis Central Hub</span>
        <button className={styles.ticketsButton}>My Tickets</button>
        <h1>
          Find Your <span>"Written in the stars"</span> Train.
        </h1>
        <p>
          Railway system, reliable as Artemis II, comfortable as your bed under the moonlight.
        </p>
      </header>

      <section className={styles.filters}>
        <input
          type="text"
          placeholder="Search by train number (e.g. 001-К)"
          value={numberQuery}
          onChange={(e) => setNumberQuery(e.target.value)}
        />
        <input
          type="text"
          placeholder="Search by arrival city (e.g. Lviv)"
          value={cityQuery}
          onChange={(e) => setCityQuery(e.target.value)}
        />
      </section>

      <section className={styles.routesSection}>
        <div className={styles.sectionHeader}>
          <h2>Available Routes</h2>
          <span>View all schedules</span>
        </div>

        <TrainList trains={filteredTrains} />
      </section>

      <footer className={styles.footer}>
        <p>STARRAIL</p>
        <span>© 2026 RAILWAY SYSTEM — ARTEMIS EDITION</span>
      </footer>
    </main>
  );
}

export default Home;