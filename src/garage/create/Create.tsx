import styles from './create.module.scss';
import { HexColorPicker } from 'react-colorful';
import { IoColorPalette } from "react-icons/io5";
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { handlePicker, setCreateColor, setCreateBrand, createCarThunk, setCars, getSevenCarsThunk } from '../../redux/reducers/garageReducer';
import { PayloadAction } from '@reduxjs/toolkit';
import { CarType } from '../../utils/types';

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
        const brands = ["Audi", "BMW", "Mercedes-Benz", "Toyota", "Honda", "Ford", "Chevrolet", "Volkswagen"];
        const models = ["A3", "A4", "Q5", "3 Series", "5 Series", "X3", "C-Class", "E-Class", "GLC", "Corolla", "Camry", "RAV4"];
        const colors = ["red", "blue", "green", "yellow", "orange", "purple", "pink", "cyan", "magenta", "teal", "lime", "brown"];

        function generateCar() {
            const name = brands[Math.floor(Math.random() * brands.length)] + ' ' + models[Math.floor(Math.random() * models.length)];
            const color = colors[Math.floor(Math.random() * colors.length)];

            createCar(name, color);
        }
        for (let i = 0; i < 100; i++) {
            generateCar();
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
        createCar(brand, color);
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