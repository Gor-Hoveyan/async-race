import { configureStore } from "@reduxjs/toolkit";
import garageReducer from "./reducers/garageReducer";
import winnersReducer from "./reducers/winnersReducer";


const store = configureStore({
    reducer: {
        garageReducer,
        winnersReducer,
    },
})


export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;

export default store;