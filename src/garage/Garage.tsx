import React, { useEffect } from 'react';
import styles from './garage.module.scss';
import { useAppDispatch, useAppSelector } from './../redux/hooks';
import { createCarThunk, deleteCarThunk, getAllCarsThunk, getOneCarThunk, getSevenCarsThunk, handlePicker, setBrand, setCars, setColor, setQuantity, updateCarThunk } from './../redux/reducers/garageReducer';
import { FaCarSide } from "react-icons/fa6";
import { CarType } from './../utils/types';
import { PayloadAction } from '@reduxjs/toolkit';
import Pagination from './pagination/Pagination';
import { RgbColor, HexColorPicker } from 'react-colorful';
import { IoColorPalette } from "react-icons/io5";

export default function Garage() {
  const dispatch = useAppDispatch();
  const cars: CarType[] = useAppSelector((state) => state.garageReducer.cars);
  const page = useAppSelector((state => state.garageReducer.page));
  const pickerState = useAppSelector(state => state.garageReducer.showPicker);
  const brand = useAppSelector(state => state.garageReducer.brand);
  const color = useAppSelector(state => state.garageReducer.color);

  async function getAllCars() {
    const data: unknown | PayloadAction<CarType[], string, { arg: number; requestId: string; requestStatus: "fulfilled"; }, never> = await dispatch(getAllCarsThunk());
    const cars = data as PayloadAction<CarType[], string, { arg: number; requestId: string; requestStatus: "fulfilled"; }, never>;

    dispatch(setQuantity(cars.payload.length));
  }

  async function getOneCar(id: number) {
    const data = await dispatch(getOneCarThunk(id));
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

  async function createCar(name: string, color: string) {
    const data = await dispatch(createCarThunk({ name, color }));
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

  async function updateCar(id: number, name: string, color: string) {
    const data = await dispatch(updateCarThunk({ id, name, color }));
  }

  function handlePickerOpening() {
    dispatch(handlePicker());
  }

  function handleColorChange(color: string) {
    dispatch(setColor(color));
  }

  function handleBrandChange(brand: string) {
    dispatch(setBrand(brand));
  }

  function handleCreate() {
    createCar(brand, color);
  }

  useEffect(() => {
    getAllCars();
    getSevenCars(page);
  }, []);
  return (
    <main className={styles.main}>
      <div className={styles.carsTable}>
        <button onClick={() => create100Random()}>Generate 100 random cars</button>
        <br />
        <input type='text' placeholder='Brand' value={brand} onChange={(event) => handleBrandChange(event.currentTarget.value)}/>

        <IoColorPalette size={50} className={styles.pickerOpenerIcon} onClick={() => handlePickerOpening()}/>
        <HexColorPicker className={pickerState ? styles.openedPicker : styles.closedPicker} onChange={(color) => handleColorChange(color)} />
        <button onClick={() => handleCreate()}>Create car</button>

        {cars.length && cars.map((car, index) => {
          return (
            <div key={index} className={styles.carContainer}>
              <FaCarSide color={car.color} size={60} />
              <p>{car.name}</p>
              <button onClick={() => deleteCar(car.id)}>Delete</button>
            </div>
          );
        })}
        <Pagination />
      </div>
    </main>
  );
}