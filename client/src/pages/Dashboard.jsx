import styles from "./Dashboard.module.css";
import { dashboardStats } from "../data/dashboardData";

function Dashboard() {
  return (
    <div className={styles.dashboard}>
      <section className={styles.heading}>
        <h1>
          Welcome back, <span>Aditya</span> 👋
        </h1>

        <p>Here's where you stand.</p>
      </section>

      <section className={styles.statsGrid}>
        {dashboardStats.map((stat) => (
          <div className={styles.statCard} key={stat.id}>
            <p className={styles.statTitle}>
              {stat.title}
            </p>

            <h2>
              {stat.value}

              {stat.suffix && (
                <span className={styles.suffix}>
                  {" "}
                  {stat.suffix}
                </span>
              )}
            </h2>

            <p className={styles.statInfo}>
              {stat.info}
            </p>
          </div>
        ))}
      </section>
    </div>
  );
}

export default Dashboard;