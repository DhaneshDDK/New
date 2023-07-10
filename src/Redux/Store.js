import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./Reducer/combineReducers";

const store = configureStore({
    reducer : rootReducer,
})

export default store;