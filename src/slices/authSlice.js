import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    loading : false,
    token: localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null,
    signupData:null,
    //isAuthenticated: !!localStorage.getItem("token"),
};

const authSlice = createSlice({
    name:"auth",
    initialState:initialState,
    reducers : {
        setLoading(state, value){
            state.loading = value.payload;
        },
        setToken(state, value){
            state.Token = value.payload;
        },
        setSignupData(state, value){
            state.signupData = value.payload;
        },
    },
});

export const {setToken, setLoading, setSignupData} = authSlice.actions;
export default authSlice.reducer;