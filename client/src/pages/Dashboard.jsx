import styles from "./Dashboard.module.css";
import { Link } from "react-router-dom";
import {
  dashboardStats,
  continueProblem,
  revisionTopics,
} from "../data/dashboardData";

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
            <p className={styles.statTitle}>{stat.title}</p>

            <h2>
              {stat.value}

              {stat.suffix && (
                <span className={styles.suffix}> {stat.suffix}</span>
              )}
            </h2>

            {stat.info && <p className={styles.statInfo}>{stat.info}</p>}

            {stat.action && (
              <Link to={stat.action.path} className={styles.statAction}>
                {stat.action.label} →
              </Link>
            )}
          </div>
        ))}
      </section>
      <section className={styles.progressGrid}>
        {/* Continue card */}

        <div className={styles.dashboardCard}>
          <p className={styles.cardLabel}>Continue Where You Left Off</p>

          <div className={styles.problemContent}>
            <h2>{continueProblem.title}</h2>

            <p className={styles.problemMeta}>
              {continueProblem.topic}
              <span>•</span>
              {continueProblem.difficulty}
            </p>

            <p className={styles.lastWorked}>
              Last worked on {continueProblem.lastWorkedAt}
            </p>
          </div>

          <button className={styles.resumeButton}>Resume →</button>
        </div>

        {/* Revision card */}

        <div className={styles.dashboardCard}>
          <p className={styles.cardLabel}>Revision Focus</p>

          <h2 className={styles.revisionHeading}>Topics needing attention</h2>

          <div className={styles.revisionList}>
            {revisionTopics.map((item) => (
              <div className={styles.revisionItem} key={item.id}>
                <span>{item.topic}</span>

                <span className={styles.dueCount}>{item.due} due</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Dashboard;
