import styles from './pagination.module.scss';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { PayloadAction } from '@reduxjs/toolkit';
import { CarType } from '../../utils/types';
import { FaCarSide, FaCaretLeft, FaCaretRight } from "react-icons/fa6";
import { getSevenCarsThunk, setCars, setPage } from '../../redux/reducers/garageReducer';

export default function Pagination() {
    const page = useAppSelector((state => state.garageReducer.page));
    const dispatch = useAppDispatch();
    const quantity = useAppSelector(state => state.garageReducer.quantity);

    async function getSevenCars(page: number) {
        const data: unknown | PayloadAction<CarType[], string, { arg: number; requestId: string; requestStatus: "fulfilled"; }, never> = await dispatch(getSevenCarsThunk(page));
        const cars = data as PayloadAction<CarType[], string, { arg: number; requestId: string; requestStatus: "fulfilled"; }, never>;

        dispatch(setCars(cars.payload));
    }

    function handleLeftPagination() {
        getSevenCars(page - 1);
        dispatch(setPage(page - 1));
    }

    function handleRightPagination() {
        getSevenCars(page + 1);
        dispatch(setPage(page + 1));
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