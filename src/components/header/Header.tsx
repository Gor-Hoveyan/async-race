import styles from './header.module.scss';
import { NavLink } from 'react-router-dom';

export default function Header() {
    return (
        <header className={styles.headerContainer}>
            <div className={styles.linksContainer}>
                <NavLink
                    to="/"
                    className={`${styles.links} ${styles.garage}`}
                    style={({ isActive }) => {
                        return isActive ? { boxShadow: "0px 0px 25px 3px orangered" } : {};
                    }}
                >
                    GARAGE
                </NavLink>
                <NavLink
                    to="/winners"
                    className={`${styles.links} ${styles.winners}`}
                    style={({ isActive }) => {
                        return isActive ? { boxShadow: "0px 0px 25px 3px orangered" } : {};
                    }}
                    >
                    WINNERS
                </NavLink>
            </div>
        </header>
    );
}