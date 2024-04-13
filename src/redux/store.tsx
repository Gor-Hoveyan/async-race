import { configureStore } from "@reduxjs/toolkit";
import garageReducer from "./reducers/garageReducer";


const store = configureStore({
    reducer: {
        garageReducer,
    },
})


export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;

export default store;