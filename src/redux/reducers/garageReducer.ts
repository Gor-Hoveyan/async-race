import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { CarType, CreateCarParams, EngineParams, GarageWinnerData, HandleDriveResponse, HandleEngineType, UpdateCarParams } from "../../utils/types";
import { garageApi } from "../../api/garageApi";
import { carApi } from "../../api/carApi";

type InitialState = {
    cars: CarType[],
    engineData: EngineParams[],
    page: number,
    quantity: number,
    update: {
        color: string,
        brand: string
    },
    create: {
        color: string,
        brand: string
    },
    showPicker: boolean,
    updatingCar: number,
    currentPageCars: CarType[],
    isRaceStarted: boolean,
    isRaceEnable: boolean,
    winnerData: GarageWinnerData | null,
    isPopupOpened: boolean,
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
    currentPageCars: [],
    isRaceStarted: false,
    isRaceEnable: false,
    winnerData: null,
    isPopupOpened: false
};


export const getAllCarsThunk = createAsyncThunk<CarType[], void>(
    'garage/getCars',
    async () => {
        return await garageApi.getAllCars();
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
        setEngineData: (state, action: PayloadAction<EngineParams[]>) => {
            state.engineData.push(...action.payload);
        },
        setCurrentPageCars: (state) => {
            state.currentPageCars = [];
            if (state.cars.length > 7) {
                for (let i = state.page * 7; i > state.page * 7 - 8; i--) {
                    if (state.cars[i]) {
                        state.currentPageCars.push(state.cars[i]);
                    }
                }
            } else {
                state.currentPageCars = state.cars;
            }

        },
        changeOneCarStatus: (state, action: PayloadAction<number>) => {
            for (let i = 0; i < state.engineData.length; i++) {
                if (state.engineData[i].id === action.payload) {
                    state.engineData[i].started = !state.engineData[i].started;
                    break;
                }
            }
        },
        changeAllCarsStatus: (state) => {
            for(let i = 0; i < state.engineData.length; i++) {
                state.engineData[i].started = !state.engineData[i].started;
            }
        },
        handleRace: (state) => {
            state.isRaceStarted = !state.isRaceStarted;
        },
        setIsRaceEnable: (state, action: PayloadAction<boolean>) => {
            state.isRaceEnable = action.payload;
        },
        setWinnerData: (state, action: PayloadAction<GarageWinnerData>) => {
            state.winnerData = action.payload;
        },
        handlePopup: (state) => {
            state.isPopupOpened = !state.isPopupOpened;
        },
        reset: (state) => {
            state.engineData = [];
            state.isRaceEnable = false;
            state.isRaceStarted = false;
            state.winnerData = null;
        },
        updateEngineData: (state, action: PayloadAction<EngineParams[]>) => {
            state.engineData = JSON.parse(JSON.stringify(action.payload));
        }
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
    setEngineData,
    setCurrentPageCars,
    changeOneCarStatus,
    changeAllCarsStatus,
    handleRace,
    setIsRaceEnable,
    setWinnerData,
    handlePopup,
    reset,
    updateEngineData
} = garageReducer.actions;