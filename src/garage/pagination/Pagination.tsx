import styles from './pagination.module.scss';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { FaCaretLeft, FaCaretRight } from "react-icons/fa6";
import { setCurrentPageCars, setPage } from '../../redux/reducers/garageReducer';

export default function Pagination() {
    const page = useAppSelector((state => state.garageReducer.page));
    const dispatch = useAppDispatch();
    const quantity = useAppSelector(state => state.garageReducer.quantity);

    function handleLeftPagination() {
        dispatch(setPage(page - 1));
        dispatch(setCurrentPageCars());
    }

    function handleRightPagination() {
        dispatch(setPage(page + 1));
        dispatch(setCurrentPageCars());
    }

    return (
        <div className={styles.paginationContainer}>
            <p>Garage({quantity})</p>
            <div className={styles.pages}>
                {page > 1 && <FaCaretLeft onClick={() => handleLeftPagination()} />}
                <p >{page}</p>
                {(Math.ceil(quantity / 7) > page) && <FaCaretRight onClick={() => handleRightPagination()} />}
            </div>
        </div>
    );
}