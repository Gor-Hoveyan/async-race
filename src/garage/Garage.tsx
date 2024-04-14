import React, { useEffect } from 'react';
import styles from './garage.module.scss';
import { useAppDispatch, useAppSelector } from './../redux/hooks';
import { getAllCarsThunk, getOneCarThunk, getSevenCarsThunk,  setCars, setQuantity, updateCarThunk } from './../redux/reducers/garageReducer';

import { CarType } from './../utils/types';
import { PayloadAction } from '@reduxjs/toolkit';
import Pagination from './pagination/Pagination';
import Create from './create/Create';
import CarContainer from './carContainer/CarContainer';

export default function Garage() {
  const dispatch = useAppDispatch();
  const cars: CarType[] = useAppSelector((state) => state.garageReducer.cars);
  const page = useAppSelector((state => state.garageReducer.page));


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

  useEffect(() => {
    getAllCars();
    getSevenCars(page);
  }, []);

  return (
    <main className={styles.main}>
      <div className={styles.carsTable}>
        <Create />

        {cars.length && cars.map((car: CarType, index) => {
          return (
          <CarContainer car={car} key={index}/>
          );
        })}
        <Pagination />
      </div>
    </main>
  );
}