import styles from './update.module.scss';
import { RgbColor, HexColorPicker } from 'react-colorful';
import { IoColorPalette } from "react-icons/io5";
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { handlePicker, setUpdateColor, setUpdateBrand, setCars, getSevenCarsThunk, updateCarThunk, setUpdatingCar } from '../../redux/reducers/garageReducer';
import { PayloadAction } from '@reduxjs/toolkit';
import { CarType } from '../../utils/types';

interface ComponentProps { id: number }

export default function Update({ id }: ComponentProps) {
    const pickerState = useAppSelector(state => state.garageReducer.showPicker);
    const brand = useAppSelector(state => state.garageReducer.update.brand);
    const page = useAppSelector((state => state.garageReducer.page));
    const color = useAppSelector(state => state.garageReducer.update.color);
    const dispatch = useAppDispatch();

    async function getSevenCars(page: number) {
        const data: unknown | PayloadAction<CarType[], string, { arg: number; requestId: string; requestStatus: "fulfilled"; }, never> = await dispatch(getSevenCarsThunk(page));
        const cars = data as PayloadAction<CarType[], string, { arg: number; requestId: string; requestStatus: "fulfilled"; }, never>;

        dispatch(setCars(cars.payload));
    }

    function handlePickerOpening() {
        dispatch(handlePicker());
    }

    function handleColorChange(color: string) {
        dispatch(setUpdateColor(color));
    }

    function handleBrandChange(brand: string) {
        dispatch(setUpdateBrand(brand));
    }

    async function updateCar(id: number, name: string, color: string) {
        await dispatch(updateCarThunk({ id, name, color }));
    }

    function handleUpdate() {
        updateCar(id, brand, color);
        dispatch(setUpdatingCar(-1));
    }

    return (
        <div>
            <input type='text' placeholder='Brand' value={brand} onChange={(event) => handleBrandChange(event.currentTarget.value)} />
            <IoColorPalette size={50} className={styles.pickerOpenerIcon} onClick={() => handlePickerOpening()} />
            <HexColorPicker className={pickerState ? styles.openedPicker : styles.closedPicker} onChange={(color) => handleColorChange(color)} />
            <button onClick={() => handleUpdate()}>Save</button>
        </div>
    );
}