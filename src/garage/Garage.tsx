import { useEffect } from 'react';
import styles from './garage.module.scss';
import { useAppDispatch, useAppSelector } from './../redux/hooks';
import { getAllCarsThunk, setCars, setQuantity, setCurrentPageCars, setEngineData, handleEngineThunk, handleRace, setIsRaceEnable, handleDriveThunk,  setWinnerData, handlePopup, reset, updateEngineData } from './../redux/reducers/garageReducer';
import { CarType, EngineParams, HandleEngineType, WinnerData } from './../utils/types';
import { PayloadAction } from '@reduxjs/toolkit';
import Pagination from './pagination/Pagination';
import Create from './create/Create';
import CarContainer from './carContainer/CarContainer';
import Header from '../components/header/Header';
import WinnerPopup from './winnerPopup/WinnerPopup';
import { createWinnerThunk, getWinnerThunk, updateWinnerThunk } from '../redux/reducers/winnersReducer';

export default function Garage() {
  const dispatch = useAppDispatch();
  const currentPageCars = useAppSelector(state => state.garageReducer.currentPageCars);
  const isRaceEnable = useAppSelector(state => state.garageReducer.isRaceEnable);
  const engineData = useAppSelector(state => state.garageReducer.engineData);
  let dataClone: EngineParams[] = structuredClone(engineData);

  function handleEngineData(updatedData?: EngineParams, updatedEngineId?: number): EngineParams[] {

    if (updatedData && updatedEngineId) {
      for (let i = 0; i < dataClone.length; i++) {
        if (dataClone[i].id === updatedEngineId) {
          dataClone.splice(i, 1, updatedData);
          dispatch(updateEngineData(dataClone));
        }
      }
    }

    return dataClone;
  }

  async function calculateWinner() {
    if (dataClone.length > 0) {
      const max = (dataClone.sort((a, b) => b.velocity - a.velocity));

      await dispatch(getWinnerThunk({ id: dataClone[0].id })).then((data) => {
        const winnerData = data as PayloadAction<WinnerData, string, { requestId: string; requestStatus: "fulfilled"; }, never>;
        for (let i = 0; i < dataClone.length; i++) {
          const car: CarType = currentPageCars.filter(car => car.id === max[i].id)[0];
          if (dataClone[i].started) {
            dispatch(setWinnerData({ time: dataClone[i].distance / dataClone[i].velocity / 1000, id: dataClone[i].id, name: car.name }));
            dispatch(handlePopup());
            if (!winnerData.payload.wins) {
              dispatch(createWinnerThunk({ id: dataClone[i].id, time: dataClone[i].distance / dataClone[i].velocity / 1000, wins: 1 }));
              break;
            } else {
              if (dataClone[i].distance / dataClone[i].velocity / 1000 > winnerData.payload.time) {
                dispatch(updateWinnerThunk({ id: dataClone[i].id, wins: winnerData.payload.wins + 1, time: winnerData.payload.time }));
                break;
              } else {
                dispatch(updateWinnerThunk({ id: dataClone[i].id, wins: winnerData.payload.wins + 1, time: dataClone[i].distance / dataClone[i].velocity / 1000 }));
                break;
              }
            }
          }
        }
      })
    }
  }

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
    if (engineData.length) {
      engineData.map(engine => {
        return handleEngineData({ ...engine, started: true }, engine.id);
      });
    }
    async function drive(i: number) {
      const data = await dispatch(handleDriveThunk(currentPageCars[i].id));
      if (data.payload === undefined) {
        const engine = engineData.filter(engine => engine.id === currentPageCars[i].id)[0];
        handleEngineData({ ...engine, started: false }, currentPageCars[i].id);
      }
      if (i === currentPageCars.length - 1) {
        calculateWinner();
      }
    }
    if (isRaceEnable) {
      dispatch(handleRace());
      for (let i = 0; i < currentPageCars.length; i++) {
        drive(i);
      }
    } else {
      getEngineData();
    }
  }

  function handleReset() {
    dispatch(reset());
  }

  useEffect(() => {
    getAllCars();
  }, []);

  return (
    <main className={styles.main}>
      <Header />
      <Create />
      <div className={styles.carsTable}>
        <div className={styles.driveBtns}>
          <button className={styles.btn} onClick={() => handleRaceMode()}>{isRaceEnable ? 'Race' : 'Prepare for race'}</button>
          <button className={styles.btn} onClick={() => handleReset()} disabled={!isRaceEnable}>Reset</button>
        </div>
        {currentPageCars.length && currentPageCars.map((car: CarType, index) => {
          return (
            <CarContainer car={car} key={index} />
          );
        })}
        <Pagination />
      </div>
      <WinnerPopup />
    </main>
  );
}