import styles from './Navbar.module.css'; 

function Navbar() {
  return (
    <nav className={styles.navbar}>

      <div className={styles.logo}>
        <span className={styles.logoIcon}>#</span>
        <span>LeetTrack Pro</span>
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