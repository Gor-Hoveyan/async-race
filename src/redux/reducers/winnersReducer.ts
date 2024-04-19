import { createSlice, createAsyncThunk, PayloadAction} from "@reduxjs/toolkit";
import { CreateWinnerParams, GetWinnersParams, UpdateWinnerData, WinnerData } from "../../utils/types";
import { winnersApi } from "../../api/winnersApi";

type InitialState = {
    winners: WinnerData[],
    page: number,
    quantity: number,
    currentPageWinners: WinnerData[]
}

const initialState: InitialState = {
    winners: [],
    page: 1,
    quantity: 0,
    currentPageWinners: [],
}

export const getWinnersThunk = createAsyncThunk<WinnerData[], GetWinnersParams>(
    'winners/getWinners',
    async ({_page, _limit, _order, _sort}) => {
        return await winnersApi.getWinners({_page, _limit, _order, _sort});
    }
);

export const getWinnerThunk = createAsyncThunk<WinnerData, {id: number}>(
    'winners/getWinner',
    async ({id}) => {
        return await winnersApi.getWinner(id);
    }
);

export const createWinnerThunk = createAsyncThunk<WinnerData, CreateWinnerParams>(
    'winners/createWinner',
    async ({ id, wins, time }) => {
        return await winnersApi.createWinner({ id, wins, time });
    }
);

export const deleteWinnerThunk = createAsyncThunk<void, {id: number}>(
    'winners/deleteWinner',
    async ({id}) => {
        await winnersApi.deleteWinner(id);
    }
);

export const updateWinnerThunk = createAsyncThunk<UpdateWinnerData, UpdateWinnerData>(
    'winners/getWinner',
    async ({id, wins, time}) => {
        return await winnersApi.updateWinner({id, wins, time});
    }
);

const winnersReducer = createSlice({
    name: 'winnersReducer',
    initialState,
    reducers: {
        setWinners: (state, action: PayloadAction<WinnerData[]>) => {
            state.winners = action.payload;
        },
        setPage: (state, action: PayloadAction<number>) => {
            state.page = action.payload;
        },
        setQuantity: (state, action: PayloadAction<number>) => {
            state.quantity = action.payload;
        },
        setCurrentPageWinners: (state) => {
            state.currentPageWinners = [];
            if (state.winners.length > 7) {
                for (let i = state.page * 7; i > state.page * 7 - 8; i--) {
                    if (state.winners[i]) {
                        state.currentPageWinners.push(state.winners[i]);
                    }
                }
            } else {
                state.currentPageWinners = state.winners;
            }
        },
    }
})

export default winnersReducer.reducer;
export const {
    setWinners,
    setPage,
    setQuantity,
    setCurrentPageWinners
} = winnersReducer.actions;