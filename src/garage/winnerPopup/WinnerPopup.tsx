import styles from './winnerPopup.module.scss';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { handlePopup } from '../../redux/reducers/garageReducer';

export default function WinnerPopup() {
    const winnerData = useAppSelector(state => state.garageReducer.winnerData);
    const isPopupOpened = useAppSelector(state => state.garageReducer.isPopupOpened);
    const dispatch = useAppDispatch();

    function closePopup() {
        dispatch(handlePopup());
    }

    return (
        <div className={isPopupOpened ? styles.popupContainer : styles.hidenPopupContainer} onClick={() => closePopup()}>
            <div className={styles.popup}>
                <p>WINNER: {winnerData?.name}</p>
                <p>TIME: {String(winnerData?.time).slice(0,4)}s</p>
            </div>
        </div>
    );
}