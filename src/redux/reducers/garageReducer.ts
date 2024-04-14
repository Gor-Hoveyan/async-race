import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { CarType, CreateCarParams, EngineParams, HandleDriveResponse, HandleEngineType, UpdateCarParams } from "../../utils/types";
import { garageApi } from "../../api/garageApi";
import { carApi } from "../../api/carApi";
import { access } from "fs";


type InitialState = {
    cars: CarType[],
    engineData: EngineParams[]
    page: number,
    quantity: number,
    update: {
        color: string,
        brand: string
    },
    create: {
        color: string,
        brand: string
    }
    showPicker: boolean,
    updatingCar: number,
};

const initialState: InitialState = {
    cars: [],
    engineData: [],
    page: 1,
    quantity: 0,
    update: {
        color: '',
        brand: '',
    },
    create: {
        color: '',
        brand: '',
    },
    showPicker: false,
    updatingCar: -1,
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
        const data: Promise<CarType> = carApi.createCar({ name, color });
        return await data;
    }
);

export const deleteCarThunk = createAsyncThunk<void, number>(
    'garage/deleteCar',
    async (id) => {
        await carApi.deleteCar(id);
    }
);

export const updateCarThunk = createAsyncThunk<CarType, UpdateCarParams>(
    'garage/createCar',
    async ({ name, color, id }) => {
        const data: Promise<CarType> = carApi.updateCar({ name, color, id });
        return await data;
    }
);

export const handleEngineThunk = createAsyncThunk<EngineParams, HandleEngineType>(
    'engine/handle',
    async ({ id, status }) => {
        return await carApi.handleEngine({ id, status })
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
        },
        handlePicker: (state) => {
            state.showPicker = !state.showPicker;
        },
        setCreateColor: (state, action: PayloadAction<string>) => {
            state.create.color = action.payload;
        },
        setCreateBrand: (state, action: PayloadAction<string>) => {
            state.create.brand = action.payload;
        },
        setUpdateColor: (state, action: PayloadAction<string>) => {
            state.update.color = action.payload;
        },
        setUpdateBrand: (state, action: PayloadAction<string>) => {
            state.update.brand = action.payload;
        },
        setUpdatingCar: (state, action: PayloadAction<number>) => {
            state.updatingCar = action.payload;
        },
        setEngineData:(state, action: PayloadAction<EngineParams[]>) => {
            state.engineData.push(...action.payload);
        },
    }
})

export default garageReducer.reducer;
export const {
    setCars,
    setPage,
    setQuantity,
    handlePicker,
    setCreateColor,
    setCreateBrand,
    setUpdateBrand,
    setUpdateColor,
    setUpdatingCar,
    setEngineData
} = garageReducer.actions;