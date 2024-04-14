import { CarType, EngineParams, HandleEngineType } from '../../utils/types';
import styles from './carContainer.module.scss';
import { FaCarSide } from "react-icons/fa6";
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { PayloadAction } from '@reduxjs/toolkit';
import { deleteCarThunk, setCars, setQuantity, getSevenCarsThunk, getAllCarsThunk, setUpdatingCar, handleEngineThunk, setEngineData } from '../../redux/reducers/garageReducer';
import Update from '../update/Update';
import { useEffect } from 'react';

interface ComponentProps { car: CarType }

export default function CarContainer({ car }: ComponentProps) {
    const dispatch = useAppDispatch();
    const page = useAppSelector((state => state.garageReducer.page));
    const updatingCar = useAppSelector(state => state.garageReducer.updatingCar);
    const engineData = useAppSelector(state => state.garageReducer.engineData)

    async function getAllCars() {
        const data: unknown | PayloadAction<CarType[], string, { arg: number; requestId: string; requestStatus: "fulfilled"; }, never> = await dispatch(getAllCarsThunk());
        const cars = data as PayloadAction<CarType[], string, { arg: number; requestId: string; requestStatus: "fulfilled"; }, never>;

        dispatch(setQuantity(cars.payload.length));
    }

    async function getSevenCars(page: number) {
        const data: unknown | PayloadAction<CarType[], string, { arg: number; requestId: string; requestStatus: "fulfilled"; }, never> = await dispatch(getSevenCarsThunk(page));
        const cars = data as PayloadAction<CarType[], string, { arg: number; requestId: string; requestStatus: "fulfilled"; }, never>;

        dispatch(setCars(cars.payload));
    }

    async function deleteCar(id: number) {
        await dispatch(deleteCarThunk(id));
        getAllCars();
        getSevenCars(page);
    }

    function handleUpdating() {
        if (updatingCar === car.id) {
            dispatch(setUpdatingCar(-1));
        } else {
            dispatch(setUpdatingCar(car.id));
        }
    }

    async function startEngine() {
        const data: unknown | PayloadAction<EngineParams, string, { arg: HandleEngineType; requestId: string; requestStatus: "fulfilled"; }, never> = await dispatch(handleEngineThunk({ id: car.id, status: 'started' }));
        const engineData = await data as PayloadAction<EngineParams, string, { arg: HandleEngineType; requestId: string; requestStatus: "fulfilled"; }, never>;
        
            dispatch(setEngineData([{...engineData.payload, id: car.id}]));
            

    }

    function handleEngineState() {
        startEngine();
    }

    useEffect(() => {
        console.log(engineData);
    }, [engineData])

    return (
        <div className={styles.carContainer}>
            <FaCarSide color={car.color} size={60} />
            <p>{car.name}</p>
            <button onClick={() => deleteCar(car.id)}>Delete</button>
            <button onClick={() => handleUpdating()}>{updatingCar === car.id ? 'Cancel' : 'Update'}</button>
            {updatingCar === car.id && <Update id={car.id} />}
            <button onClick={() => handleEngineState()}>Run Engine</button>
            <button>Start</button>
        </div>
    );
}