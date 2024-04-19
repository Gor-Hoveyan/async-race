import styles from './pagination.module.scss';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { FaCaretLeft, FaCaretRight } from "react-icons/fa6";
import { setCurrentPageWinners, setPage } from '../../redux/reducers/winnersReducer';


export default function Pagination() {
    const page = useAppSelector((state => state.winnersReducer.page));
    const dispatch = useAppDispatch();
    const quantity = useAppSelector(state => state.winnersReducer.quantity);

    function handleLeftPagination() {
        dispatch(setPage(page - 1));
        dispatch(setCurrentPageWinners());
    }

    function handleRightPagination() {
        dispatch(setPage(page + 1));
        dispatch(setCurrentPageWinners());
    }

    return (
        <div className={styles.paginationContainer}>
            <p>Winners({quantity})</p>
            <div className={styles.pages}>
                {page > 1 && <FaCaretLeft onClick={() => handleLeftPagination()} />}
                <p >{page}</p>
                {(Math.ceil(quantity / 7) > page) && <FaCaretRight onClick={() => handleRightPagination()} />}
            </div>
        </div>
    );
}