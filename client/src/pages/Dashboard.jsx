import styles from "./Dashboard.module.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";


function Dashboard() {
  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    fetch("/data/dashboard.json")
      .then((response) => response.json())
      .then((data) => {
        setDashboardData(data);
      });
    //console.log("fetching data from dashboard.json");
  }, []);
  //console.log("fetched data from dashboard.json", dashboardData);
  const stats = dashboardData?.stats;

  const continueStat=dashboardData?.continueProblem;

  const revisionTopics = dashboardData?.revisionTopics;

  const milestones = dashboardData?.milestones ?? [];

  const companyProgress = dashboardData?.companyProgress ?? [];

  const recentProblems = dashboardData?.recentProblems ?? [];

  const dailyQuote = dashboardData?.dailyQuote ?? {
    text: "Discipline is choosing between what you want now and what you want most.",
    author: "Abraham Lincoln"
  };

  const statsCards = stats
    ? [
        {
          id: 1,
          title: "Problems Solved",
          value: stats.problemsSolved,
          info: `+${stats.solvedThisWeek} this week`,
        },
        {
          id: 2,
          title: "Current Streak",
          value: `${stats.currentStreak} days`,
          info: `Best: ${stats.bestStreak} days`,
        },
        {
          id: 3,
          title: "Due for Revision",
          value: stats.revisionDue,
          action: {
            label: "Start revising",
            path: "/revision",
          },
        },
        {
          id: 4,
          title: "Weekly Goal",
          value: `${stats.weeklySolved} / ${stats.weeklyGoal}`,
          info: `${Math.round(
            (stats.weeklySolved / stats.weeklyGoal) * 100,
          )}% complete`,
        },
      ]
    : [];

  return (
    <div className={styles.dashboard}>
      <section className={styles.heading}>
        <h1>
          Welcome back, <span>{dashboardData?.user.name}</span> 👋
        </h1>

        <p>Here's where you stand.</p>
      </section>

      <section className={styles.statsGrid}>
        {statsCards.map((stat) => (
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

        { continueStat && (<div className={styles.dashboardCard}>
          <p className={styles.cardLabel}>Continue Where You Left Off</p>

          <div className={styles.problemContent}>
            <h2>{continueStat.title}</h2>

            <p className={styles.problemMeta}>
              {continueStat.topic}
              <span>•</span>
              {continueStat.difficulty}
            </p>

            <p className={styles.lastWorked}>
              Last worked on {continueStat.lastWorkedAt}
            </p>
          </div>

          <button className={styles.resumeButton}>Resume →</button>
        </div>)}

        {/* Revision card */}

        {revisionTopics &&
        (<div className={styles.dashboardCard}>
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
        </div>)}
      </section>
      <section className={styles.insightsGrid}>

        {/* MILESTONES */}

        <div className={styles.dashboardCard}>
          <p className={styles.cardLabel}>Next Milestones</p>

          <div className={styles.milestoneList}>
            {milestones.map((milestone) => {
              const progress = (milestone.current / milestone.target) * 100;

              return (
                <div className={styles.milestoneItem} key={milestone.id}>
                  <div className={styles.milestoneInfo}>
                    <span>{milestone.title}</span>

                    <span>
                      {milestone.current} / {milestone.target}
                    </span>
                  </div>

                  <div className={styles.progressBar}>
                    <div
                      className={styles.progressFill}
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* COMPANY PROGRESS */}

        <div className={styles.dashboardCard}>
          <p className={styles.cardLabel}>Top Companies Practiced</p>

          <div className={styles.companyList}>
            {companyProgress.map((company) => (
              <div className={styles.companyItem} key={company.id}>
                <span>{company.company}</span>

                <span className={styles.companySolved}>
                  {company.solved} solved
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
  
      {/*recent solved problems section*/}

      <section className={styles.recentSection}>
        <div className={styles.sectionHeader}>
          <p className={styles.cardLabel}>Recent Solved Problems</p>

          <Link to="/problems" className={styles.viewAll}>
            View all →
          </Link>
        </div>

        <div className={styles.problemTable}>
          <div className={styles.tableHeader}>
            <span>Problem</span>
            <span>Topic</span>
            <span>Difficulty</span>
            <span>Solved</span>
          </div>

          {recentProblems.map((problem) => (
            <div className={styles.problemRow} key={problem.id}>
              <span className={styles.problemTitle}>{problem.title}</span>

              <span>{problem.topic}</span>

              <span>{problem.difficulty}</span>

              <span>{problem.solvedAt}</span>
            </div>
          ))}
        </div>
      </section>

      {/*daily quote section*/}
      <section className={styles.quoteSection}>
        <p className={styles.quoteText}>“{dailyQuote.text}”</p>

        <span className={styles.quoteAuthor}>— {dailyQuote.author}</span>
      </section>
    </div>
  );
}

export default Dashboard;
