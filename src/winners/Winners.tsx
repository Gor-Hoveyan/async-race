import Header from '../components/header/Header';
import styles from './winners.module.scss';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { getWinnersThunk, setCurrentPageWinners, setQuantity, setWinners } from '../redux/reducers/winnersReducer';
import { useEffect } from 'react';
import { PayloadAction } from '@reduxjs/toolkit';
import { CarType, WinnerData } from '../utils/types';
import Pagination from './pagination/Pagination';
import { FaCarSide } from 'react-icons/fa6';
import { getAllCarsThunk, setCars, setCurrentPageCars } from '../redux/reducers/garageReducer';

export default function Winners() {
    const dispatch = useAppDispatch();
    const currentPageWinners = useAppSelector(state => state.winnersReducer.currentPageWinners);
    const cars = useAppSelector(state => state.garageReducer.cars);

    async function getAllCars() {
        const data: unknown | PayloadAction<CarType[], string, { arg: number; requestId: string; requestStatus: "fulfilled"; }, never> = await dispatch(getAllCarsThunk());
        const cars = data as PayloadAction<CarType[], string, { arg: number; requestId: string; requestStatus: "fulfilled"; }, never>;

        dispatch(setCars(cars.payload));
        dispatch(setCurrentPageCars());
        dispatch(setQuantity(cars.payload.length))
    }

    async function getWinners(sort: string = 'id') {
        let data: unknown | PayloadAction<WinnerData[], string, { arg: number; requestId: string; requestStatus: "fulfilled"; }, never>;
        if(sort === 'time') {
            data  = await dispatch(getWinnersThunk({ _page: 1, _limit: 10000, _sort: 'time' }));
        } else if(sort === 'wins') {
            data = await dispatch(getWinnersThunk({ _page: 1, _limit: 10000, _sort: 'wins' }));
        } else {
            data  = await dispatch(getWinnersThunk({ _page: 1, _limit: 10000, _sort: 'id' }));
        }
        const winnersData = data as PayloadAction<WinnerData[], string, { arg: number; requestId: string; requestStatus: "fulfilled"; }, never>;
        dispatch(setWinners(winnersData.payload));
        dispatch(setQuantity(winnersData.payload.length));
        dispatch(setCurrentPageWinners());
    }

    useEffect(() => {
        getWinners();
        if (!cars[0]) {
            getAllCars();
        }
    }, []);

    return (
        <div className={styles.main}>
            <Header />
            <table className={styles.winnersContainer}>
                <tr>
                    <th onClick={() => getWinners()}>Nº</th>
                    <th>Name</th>
                    <th  onClick={() => getWinners('wins')}>Wins</th>
                    <th onClick={() => getWinners('time')}>Time</th>
                </tr>
                {currentPageWinners.map((winner, index) => {
                    const car = cars.filter(car => car.id === winner.id);
                    return (
                        <tr key={index} className={styles.winnerContainer}>
                            <td><div className={styles.cellContainer}><p className={styles.idCell}>{winner.id}</p>
                                <FaCarSide color={car[0] && car[0].color} size={60} className={styles.carElem} /></div></td>
                            <td><div className={styles.cellContainer}>{car[0] ? car[0].name : ""}</div></td>
                            <td><div className={styles.cellContainer}>{winner.wins}</div></td>
                            <td><div className={styles.cellContainer}>{String(winner.time).slice(0, 5)}s</div></td>
                        </tr>)
                })}
            </table>
            <Pagination />
        </div>);
}