import styles from "./Sidebar.module.css";
import { NavLink } from "react-router-dom";

function Sidebar({ sidebarOpen }) {
  return (
    <aside className={`${styles.sidebar} ${sidebarOpen ? styles.open : ""}`}>
      <div className={styles.menu}>
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `${styles.menuItem} ${isActive ? styles.active : ""}`
          }
        >
          <span>▣</span>
          <span>Dashboard</span>
        </NavLink>

        <NavLink
          to="/problems"
          className={({ isActive }) =>
            `${styles.menuItem} ${isActive ? styles.active : ""}`
          }
        >
          <span>✓</span>
          <span>Problems</span>
        </NavLink>

        <NavLink
          to="/revision"
          className={({ isActive }) =>
            `${styles.menuItem} ${isActive ? styles.active : ""}`
          }
        >
          <span>↻</span>
          <span>Revision</span>
        </NavLink>

        <NavLink
          to="/analytics"
          className={({ isActive }) =>
            `${styles.menuItem} ${isActive ? styles.active : ""}`
          }
        >
          <span>📈</span>
          <span>Analytics</span>
        </NavLink>

        <p className={styles.sectionTitle}>PREPARATION</p>

        <NavLink
          to="/preparation"
          className={({ isActive }) =>
            `${styles.menuItem} ${isActive ? styles.active : ""}`
          }
        >
          <span>📈</span>
          <span>Preparation</span>
        </NavLink>

        <p className={styles.sectionTitle}>LIBRARY</p>

        <NavLink
          to="/collections"
          className={({ isActive }) =>
            `${styles.menuItem} ${isActive ? styles.active : ""}`
          }
        >
          <span>▤</span>
          <span>Collections</span>
        </NavLink>
      </div>

      <div className={styles.bottomMenu}>
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `${styles.menuItem} ${isActive ? styles.active : ""}`
          }
        >
          <span>⚙</span>
          <span>Settings</span>
        </NavLink>
      </div>
    </aside>
  );
}

export default Sidebar;
