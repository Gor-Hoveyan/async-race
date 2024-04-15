import { CarType, EngineParams, HandleEngineType } from '../../utils/types';
import styles from './carContainer.module.scss';
import { FaCarSide } from "react-icons/fa6";
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { PayloadAction } from '@reduxjs/toolkit';
import { deleteCarThunk, setCars, setQuantity, getAllCarsThunk, setUpdatingCar, handleEngineThunk, setEngineData, setCurrentPageCars, changeOneCarStatus } from '../../redux/reducers/garageReducer';
import Update from '../update/Update';

interface ComponentProps { car: CarType }

export default function CarContainer({ car }: ComponentProps) {
    const dispatch = useAppDispatch();
    const updatingCar = useAppSelector(state => state.garageReducer.updatingCar);
    const currentEngine = useAppSelector(state => state.garageReducer.engineData.filter(engine => engine.id === car.id));
    const isRaceStarted = useAppSelector(state => state.garageReducer.isRaceStarted);

    async function getAllCars() {
        const data: unknown | PayloadAction<CarType[], string, { arg: number; requestId: string; requestStatus: "fulfilled"; }, never> = await dispatch(getAllCarsThunk());
        const cars = data as PayloadAction<CarType[], string, { arg: number; requestId: string; requestStatus: "fulfilled"; }, never>;

        dispatch(setCars(cars.payload));
        dispatch(setCurrentPageCars());
        dispatch(setQuantity(cars.payload.length));
    }

    async function deleteCar(id: number) {
        await dispatch(deleteCarThunk(id));
        getAllCars();
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

        dispatch(setEngineData([{ ...engineData.payload, id: car.id, started: false }]));
    }

    function handleEngineState() {
        startEngine();
    }

    function handleDriving() {
        dispatch(changeOneCarStatus(car.id));
    }

    return (
        <div className={styles.carContainer}>
            <FaCarSide
                color={car.color}
                size={60}
                className={styles.carElem}
                style={((currentEngine[0] !== undefined && currentEngine[0].started && !isRaceStarted) || (isRaceStarted && currentEngine[0] && currentEngine[0].started)) ? { transform: 'translateX(1000px)', transitionDuration: `${currentEngine[0].distance / currentEngine[0].velocity / 1000}s` } : {}}
            />
            <p>{car.name}</p>
            <button onClick={() => deleteCar(car.id)}>Delete</button>
            <button onClick={() => handleUpdating()}>{updatingCar === car.id ? 'Cancel' : 'Update'}</button>
            {updatingCar === car.id && <Update id={car.id} />}
            <button disabled={(currentEngine[0] && currentEngine[0].distance !== undefined)} onClick={() => handleEngineState()}>Run Engine</button>
            <button  disabled={!(currentEngine[0] && currentEngine[0].distance !== undefined)} onClick={() => handleDriving()}>Start</button>
        </div>
    );
}