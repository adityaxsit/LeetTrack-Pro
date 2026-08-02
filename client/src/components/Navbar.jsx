import styles from './Navbar.module.css'; 

function Navbar({ sidebarOpen, setSidebarOpen }) {
  return (
    <nav className={styles.navbar}>

       <button
        className={styles.menuButton}
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? "✕" : "☰"}
      </button>

      <div className={styles.logo}>
        <span className={styles.logoIcon}>#</span>
        <span>TrackBack</span>
      </div>

      <div className={styles.search}>
        <span>🔍</span>

        <input
          type="text"
          placeholder="Search problems..."
        />
      </div>

      <div className={styles.actions}>
        <button className={styles.iconButton}>
          🔔
        </button>

        <button className={styles.profileButton}>
          👤
        </button>
      </div>

    </nav>
  );
}
export default Navbar;