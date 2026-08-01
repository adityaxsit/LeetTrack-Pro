import styles from "./Sidebar.module.css";

function Sidebar() {
  return (
    <aside className={styles.sidebar}>

      <div className={styles.menu}>

        <div className={`${styles.menuItem} ${styles.active}`}>
          <span>▣</span>
          <span>Dashboard</span>
        </div>

        <div className={styles.menuItem}>
          <span>✓</span>
          <span>Problems</span>
        </div>

        <div className={styles.menuItem}>
          <span>↻</span>
          <span>Revision</span>
        </div>

        <div className={styles.menuItem}>
          <span>📈</span>
          <span>Analytics</span>
        </div>

        <p className={styles.sectionTitle}>PREPARATION</p>

        <div className={styles.menuItem}>
          <span>🎯</span>
          <span>Preparation</span>
        </div>

        <p className={styles.sectionTitle}>LIBRARY</p>

        <div className={styles.menuItem}>
          <span>▤</span>
          <span>Collections</span>
        </div>

      </div>

      <div className={styles.bottomMenu}>
        <div className={styles.menuItem}>
          <span>⚙</span>
          <span>Settings</span>
        </div>
      </div>

    </aside>
  );
}

export default Sidebar;