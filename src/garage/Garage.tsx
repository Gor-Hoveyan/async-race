import React, { useEffect } from 'react';
import styles from './garage.module.scss';
import { useAppDispatch, useAppSelector } from './../redux/hooks';
import { getAllCarsThunk, setCars, setQuantity, setCurrentPageCars, setEngineData, handleEngineThunk, handleRace, setIsRaceEnable, changeAllCarsStatus } from './../redux/reducers/garageReducer';
import { CarType, EngineParams, HandleEngineType } from './../utils/types';
import { PayloadAction } from '@reduxjs/toolkit';
import Pagination from './pagination/Pagination';
import Create from './create/Create';
import CarContainer from './carContainer/CarContainer';
import Header from '../components/header/Header';

export default function Garage() {
  const dispatch = useAppDispatch();
  const currentPageCars = useAppSelector(state => state.garageReducer.currentPageCars);
  const isRaceEnable = useAppSelector(state => state.garageReducer.isRaceEnable);
  const allEngineData = useAppSelector(state => state.garageReducer.engineData);


  async function getAllCars() {
    const data: unknown | PayloadAction<CarType[], string, { arg: number; requestId: string; requestStatus: "fulfilled"; }, never> = await dispatch(getAllCarsThunk());
    const cars = data as PayloadAction<CarType[], string, { arg: number; requestId: string; requestStatus: "fulfilled"; }, never>;

    dispatch(setCars(cars.payload));
    dispatch(setCurrentPageCars());
    dispatch(setQuantity(cars.payload.length))
  }

  async function getEngineData() {
    async function getData(i: number) {
      await dispatch(handleEngineThunk({ id: currentPageCars[i].id, status: 'started' })).then(data => {
        const engineData = data as PayloadAction<EngineParams, string, { arg: HandleEngineType; requestId: string; requestStatus: "fulfilled"; }, never>;
        dispatch(setEngineData([{ ...engineData.payload, id: currentPageCars[i].id, started: false }]));
        if (i === currentPageCars.length - 1) {
          dispatch(setIsRaceEnable(true));
        }
      });
    }


    for (let i = 0; i < currentPageCars.length; i++) {
      getData(i);

    }
  }

  async function handleRaceMode() {
    if (isRaceEnable) {
      dispatch(changeAllCarsStatus());
      dispatch(handleRace());
    } else {
      getEngineData();
    }

  }

  useEffect(() => {
    getAllCars();
  }, []);

  return (
    <main className={styles.main}>
      <Header />
      <Create />
      <div className={styles.carsTable}>
        <button onClick={() => handleRaceMode()}>{isRaceEnable ? 'Race' : 'Prepare for race'}</button>

        {currentPageCars.length && currentPageCars.map((car: CarType, index) => {
          return (
            <CarContainer car={car} key={index} />
          );
        })}
        <Pagination />
      </div>
    </main>
  );
}