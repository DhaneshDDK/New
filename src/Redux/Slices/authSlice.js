import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    token : localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null,
    signUpData : null,
    loading : false,
    endTime : 0,
    sidebar : false,
}

const authSlice = createSlice({
      name : "auth",
      initialState : initialState,
      reducers : {
        setSignUpData : (state, value) => { state.signUpData = value.payload; },
        setLoading :  (state, value) => { state.loading = value.payload; },
        setToken : (state, value) => { state.token = value.payload; },
        setEndTime : (state, value) => { state.endTime = value.payload; },
        setSideBar : (state, value) => { state.sidebar = value.payload;  },
      }
})

export const {setSignUpData, setToken , setLoading, setEndTime, setSideBar } = authSlice.actions;
export default authSlice.reducer; 