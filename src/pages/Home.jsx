import { useEffect, useMemo, useState } from "react";
import { trains } from "../data/trains";
import TrainList from "../components/TrainList";
import styles from "../styles/Home.module.css";
import { Link } from "react-router-dom";

function Home() {
  const [numberQuery, setNumberQuery] = useState("");
  const [cityQuery, setCityQuery] = useState("");

  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("artemisTheme");
    return savedTheme === "dark";
  });

  useEffect(() => {
    localStorage.setItem("artemisTheme", darkMode ? "dark" : "light");
  }, [darkMode]);

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
    <main className={`${styles.page} ${darkMode ? styles.darkPage : ""}`}>
      
      <div className={styles.spaceDots}></div>
      <div className={styles.spaceDotsTwo}></div>
      
      <header className={styles.hero}>
        <div className={styles.topActions}>
          <span className={styles.badge}>Artemis II Transit Hub</span>

          <div className={styles.heroButtons}>
            <button
              className={styles.themeButton}
              onClick={() => setDarkMode((prev) => !prev)}
              type="button"
            >
              {darkMode ? "Light Mode ☼" : "Dark Mode ✦"}
            </button>

            <Link to="/tickets" className={styles.ticketsButton}>
              My Tickets ✦
            </Link>
          </div>
        </div>

        <h1>
          Find Your <span>"Written in the stars"</span> Destination.
        </h1>
        <p>
          Railway system, reliable as Artemis II, comfortable as your bed under the moonlight.
          A night-sky inspired railway system for calm journeys, soft lights, and long-distance routes.</p>
      </header>

      <section className={styles.filters}>
        <input
          type="text"
          placeholder="Search by train number"
          value={numberQuery}
          onChange={(e) => setNumberQuery(e.target.value)}
        />
        <input
          type="text"
          placeholder="Search by arrival city"
          value={cityQuery}
          onChange={(e) => setCityQuery(e.target.value)}
        />
      </section>

      <div className={styles.backgroundOrnaments}>
        <span>✦</span>
        <span>☄️</span>
        <span>☆</span>
      </div>

      <section className={styles.routesSection}>
        <div className={styles.sectionHeader}>
          <h2>Available Routes ✦</h2>
          <span>View all departures</span>
        </div>

        <TrainList trains={filteredTrains} />
      </section>

      <div className={styles.backgroundOrnaments}>
        <span>✦</span>
        <span>☄️</span>
        <span>☆</span>
      </div>

      <footer className={styles.footer}>
        <p>ARTEMIS RAIL</p>
        <span>© 2026 INTERCITY SYSTEM — MOONLINE EDITION</span>
      </footer>
    </main>
  );
}

export default Home;