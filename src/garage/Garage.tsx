import React, { useEffect } from 'react';
import styles from './garage.module.scss';
import { useAppDispatch, useAppSelector } from './../redux/hooks';
import { createCarThunk, deleteCarThunk, getAllCarsThunk, getOneCarThunk, getSevenCarsThunk, setCars, setQuantity, updateCarThunk } from './../redux/reducers/garageReducer';
import { FaCarSide } from "react-icons/fa6";
import { CarType } from './../utils/types';
import { PayloadAction } from '@reduxjs/toolkit';
import Pagination from './../components/pagination/Pagination';

export default function Garage() {
  const dispatch = useAppDispatch();
  const cars: CarType[] = useAppSelector((state) => state.garageReducer.cars);
  const page = useAppSelector((state => state.garageReducer.page));

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
  }

  async function createCar(name: string, color: string) {
    const data = await dispatch(createCarThunk({ name, color }));
  }

  async function create100Random() {
    const brands = ["Audi", "BMW", "Mercedes-Benz", "Toyota", "Honda", "Ford", "Chevrolet", "Volkswagen"];
    const models = ["A3", "A4", "Q5", "3 Series", "5 Series", "X3", "C-Class", "E-Class", "GLC", "Corolla", "Camry", "RAV4"];
    const colors = ["red","blue","green","yellow","orange","purple","pink","cyan","magenta","teal","lime","brown"];

    function generateCar() {
      const name = brands[Math.floor(Math.random() * brands.length)] + ' ' + models[Math.floor(Math.random() * models.length)];
      const color = colors[Math.floor(Math.random() * colors.length)];

      createCar(name, color);
    }
    for(let i = 0; i < 100; i++) {
      generateCar();
    }
  }

  async function updateCar(id: number, name: string, color: string) {
    const data = await dispatch(updateCarThunk({ id, name, color }));
  }



  useEffect(() => {
    getAllCars();
    getSevenCars(page);
  }, []);
  return (
    <main className={styles.main}>
      <div className={styles.carsTable}>
        <button onClick={() => create100Random()}>Generate 100 random cars</button>
        {cars.length && cars.map((car, index) => {
          return (
            <div key={index} className={styles.carContainer}>
              <FaCarSide color={car.color} />
              <p>{car.name}</p>
            </div>
          );
        })}
        <Pagination />
      </div>
    </main>
  );
}