import styles from './create.module.scss';
import { HexColorPicker } from 'react-colorful';
import { IoColorPalette } from "react-icons/io5";
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { handlePicker, setCreateColor, setCreateBrand, createCarThunk, setCars, getSevenCarsThunk } from '../../redux/reducers/garageReducer';
import { PayloadAction } from '@reduxjs/toolkit';
import { CarType } from '../../utils/types';
import { generateCar } from '../../utils/functions';

export default function Create() {
    const pickerState = useAppSelector(state => state.garageReducer.showPicker);
    const brand = useAppSelector(state => state.garageReducer.create.brand);
    const page = useAppSelector((state => state.garageReducer.page));
    const color = useAppSelector(state => state.garageReducer.create.color);
    const dispatch = useAppDispatch();

    async function getSevenCars(page: number) {
        const data: unknown | PayloadAction<CarType[], string, { arg: number; requestId: string; requestStatus: "fulfilled"; }, never> = await dispatch(getSevenCarsThunk(page));
        const cars = data as PayloadAction<CarType[], string, { arg: number; requestId: string; requestStatus: "fulfilled"; }, never>;

        dispatch(setCars(cars.payload));
    }

    async function create100Random() {
        for (let i = 0; i < 100; i++) {
            const {name, color} = generateCar();
            createCar(name, color); 
        }
        getSevenCars(page);
    }

    async function createCar(name: string, color: string) {
        await dispatch(createCarThunk({ name, color }));
    }

    function handlePickerOpening() {
        dispatch(handlePicker());
    }

    function handleColorChange(color: string) {
        dispatch(setCreateColor(color));
    }

    function handleBrandChange(brand: string) {
        dispatch(setCreateBrand(brand));
    }

    function handleCreate() {
        if(!brand.length) {
            const {name} = generateCar();
            createCar(name, color);
        } else {
            createCar(brand, color);
        }
    }
    return (
        <div className={styles.createContainer}>
            <button onClick={() => create100Random()}>Generate 100 random cars</button>
            <input type='text' placeholder='Brand' value={brand} onChange={(event) => handleBrandChange(event.currentTarget.value)} />

            <IoColorPalette size={50} className={styles.pickerOpenerIcon} onClick={() => handlePickerOpening()} />
            <HexColorPicker className={pickerState ? styles.openedPicker : styles.closedPicker} onChange={(color) => handleColorChange(color)} />
            <button onClick={() => handleCreate()}>Create car</button>
        </div>
    );
}