import React from 'react';
import {Link, NavLink, useLocation} from "react-router-dom";
import styles from './Header.module.scss'

const Header = () => {
  const location = useLocation()

  return (
      <header className={styles.root} style={{backgroundColor: location.pathname === "/eyeDropperApi" ? "#22232b" : "#f7f7f7" }}>
        <NavLink to={"/pureCanvas"} className={({isActive}) => isActive ? styles.active : styles.btn}>
          Pure Canvas (as required)
        </NavLink>
        <NavLink to={"/eyeDropperApi"} className={({isActive}) => isActive ? styles.active : styles.btn}>
          Eye Dropper API (additional)</NavLink>
      </header>
  );
};

export default Header;