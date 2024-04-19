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
            <div className={styles.name}>
                <p><span className={styles.firstSpan}>A</span>s<span className={styles.secondSpan}>y</span>nc</p>
                <p>R<span className={styles.thirdSpan}>a</span>c<span className={styles.fourthSpan}>e</span></p>
            </div>
        </header>
    );
}