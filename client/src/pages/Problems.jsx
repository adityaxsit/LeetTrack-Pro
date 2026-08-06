import { useEffect, useState } from "react";
import styles from "./Problems.module.css";

function Problems() {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/data/problems.json")
      .then((response) => response.json())
      .then((data) => {
        setProblems(data.problems);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div
        className="spinner-grow"
        style={{
          width: "3rem",
          height: "3rem",
          alignSelf: "center",
          marginTop: "2rem",
        }}
        role="status"
      >
        <span className="visually-hidden">Loading...</span>
      </div>
    );
  }

  const totalSolved = problems.length;
  const hardCount = problems.filter((problem) => problem.difficulty === "Hard").length;
  const revisionCount = problems.filter((problem) => problem.revision).length;

  return (
    <div className={styles.problemsPage}>
      <section className={styles.header}>
        <h1>Problems</h1>
        <p>Track all solved problems from different coding platforms.</p>
      </section>

      <section className={styles.statsGrid}>
        <article className={styles.statCard}>
          <p className={styles.statLabel}>Total Solved</p>
          <h2>{totalSolved}</h2>
        </article>

        <article className={styles.statCard}>
          <p className={styles.statLabel}>Hard Problems</p>
          <h2>{hardCount}</h2>
        </article>

        <article className={styles.statCard}>
          <p className={styles.statLabel}>Need Revision</p>
          <h2>{revisionCount}</h2>
        </article>
      </section>

      <section className={styles.controlsCard}>
        <div className={styles.controlsRow}>
          <div className={styles.searchWrap}>
            <label htmlFor="problemSearch">Search</label>
            <input
              id="problemSearch"
              type="text"
              placeholder="Search by title..."
              
            />
          </div>

          <div className={styles.selectWrap}>
            <label htmlFor="platformFilter">Platform</label>
            <select id="platformFilter" >
              <option>All platforms</option>
              <option>LeetCode</option>
              <option>Codeforces</option>
              <option> HackerRank </option>
            </select>
          </div>

          <div className={styles.selectWrap}>
            <label htmlFor="difficultyFilter">Difficulty</label>
            <select id="difficultyFilter" >
              <option>All difficulties</option>
              <option>Easy</option>
              <option>Medium</option>
              <option>Hard</option>
            </select>
          </div>

          <div className={styles.selectWrap}>
            <label htmlFor="revisionFilter">Revision</label>
            <select id="revisionFilter" >
              <option>All</option>
              <option>Needed</option>
              <option>Not Needed</option> 
            </select>
          </div>

          <div className={styles.selectWrap}>
            <label htmlFor="sortBy">Sort</label>
            <select id="sortBy" >
              <option>Newest solved</option>
              <option>Oldest solved</option>
              <option>Company</option>
            </select>
          </div>
        </div>
      </section>

      <section className={styles.tableCard}>
        <div className={styles.tableHeader}>
          <span>Problem</span>
          <span>Platform</span>
          <span>Topic</span>
          <span>Difficulty</span>
          <span>Companies</span>
          <span>Revision</span>
          <span>Solved At</span>
          <span>Notes</span>
        </div>

        {problems.map((problem) => (
          <div className={styles.tableRow} key={problem.id}>
            <a
              className={styles.problemTitle}
              href={problem.problemUrl}
              target="_blank"
              rel="noreferrer"
            >
              {problem.title}
            </a>

            <span className={styles.platformBadge}>{problem.platform}</span>

            <span>{problem.topic}</span>

            <span className={`${styles.difficulty} ${styles[problem.difficulty.toLowerCase()]}`}>
              {problem.difficulty}
            </span>

            <div className={styles.companyTags}>
              {problem.companies.map((company) => (
                <span className={styles.companyTag} key={company}>
                  {company}
                </span>
              ))}
            </div>

            <span className={problem.revision ? styles.revisionYes : styles.revisionNo}>
              {problem.revision ? "Needed" : "Done"}
            </span>

            <span>{new Date(problem.solvedAt).toLocaleDateString()}</span>

            <p className={styles.notes}>{problem.notes}</p>
          </div>
        ))}
      </section>
    </div>
  );
}

export default Problems;