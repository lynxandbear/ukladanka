import {configureStore} from "@reduxjs/toolkit";
import {enableMapSet} from 'immer'
import {pictureReducer} from "./pictureSlice";

enableMapSet();

const store = configureStore({
    reducer: {
        picture: pictureReducer
    }
});


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store