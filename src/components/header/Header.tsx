import styles from './header.module.scss';
import { NavLink } from 'react-router-dom';

export default function Header() {
    return (
        <header className={styles.headerContainer}>
            <div className={styles.linksContainer}>
                <NavLink
                    to="/"
                    className={`${styles.links} ${styles.garage}`}>
                    GARAGE</NavLink>
                <NavLink
                    to="/winners"
                    className={`${styles.links} ${styles.winners}`}>
                    WINNERS
                </NavLink>
            </div>
        </header>
    );
}