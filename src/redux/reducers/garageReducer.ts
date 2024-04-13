import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { CarType, CreateCarParams, EngineParams, HandleDriveResponse, HandleEngineType, UpdateCarParams } from "../../utils/types";
import { garageApi } from "../../api/garageApi";
import { carApi } from "../../api/carApi";


type InitialState = {
    cars: CarType[],
    page: number,
    quantity: number
};

const initialState: InitialState = {
    cars: [],
    page: 1,
    quantity: 0
};


export const getAllCarsThunk = createAsyncThunk<CarType[], void>(
    'garage/getCars',
    async () => {
        return await garageApi.getAllCars();
    }
);

export const getSevenCarsThunk = createAsyncThunk<CarType[], number>(
    'garage/getSevenCars',
    async (page) => {
        return await garageApi.getSevenCars(page);
    }
);

export const getOneCarThunk = createAsyncThunk<CarType, number>(
    'garage/getOneCar',
    async (id) => {
        return await garageApi.getOneCar(id);
    }
);

export const createCarThunk = createAsyncThunk<CarType, CreateCarParams>(
    'garage/createCar',
    async ({ name, color }) => {
        const data: Promise<CarType> = garageApi.createCar({ name, color });
        return await data;
    }
);

export const deleteCarThunk = createAsyncThunk<void, number>(
    'garage/deleteCar',
    async (id) => {
        await garageApi.deleteCar(id);
    }
);

export const updateCarThunk = createAsyncThunk<CarType, UpdateCarParams>(
    'garage/createCar',
    async ({ name, color, id }) => {
        const data: Promise<CarType> = garageApi.updateCar({ name, color, id });
        return await data;
    }
);

export const handleEngineThunk = createAsyncThunk<EngineParams, HandleEngineType>(
    'engine/handle',
    async ({ id, status }) => {
        return await carApi.handleEngine({ id, status });
    }
);

export const handleDriveThunk = createAsyncThunk<HandleDriveResponse, number>(
    'engine/drive',
    async (id) => {
        return await carApi.handleDrive(id);
    }
);

const garageReducer = createSlice({
    name: 'garageReducer',
    initialState,
    reducers: {
        setCars: (state, action: PayloadAction<CarType[]>) => {
            state.cars = action.payload;
        },
        setPage: (state, action: PayloadAction<number>) => {
            state.page = action.payload;
        },
        setQuantity: (state, action: PayloadAction<number>) => {
            state.quantity = action.payload;
        }
    }
})

export default garageReducer.reducer;
export const { setCars, setPage, setQuantity } = garageReducer.actions;