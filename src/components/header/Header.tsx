import styles from './header.module.scss';

export default function Header() {
    return (
        <header className={styles.headerContainer}>
            <div className={styles.name}>
            <p><span className={styles.firstSpan}>A</span>s<span className={styles.secondSpan}>y</span>nc</p>
            <p>R<span className={styles.thirdSpan}>a</span>c<span className={styles.fourthSpan}>e</span></p>
            </div>
        </header>
    );
}