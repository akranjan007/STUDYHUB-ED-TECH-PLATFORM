import { createSlice } from "@reduxjs/toolkit";
import {toast} from "react-hot-toast";

const initialState = {
    cart: localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [],
    total: localStorage.getItem("total") ? JSON.parse(localStorage.getItem("total")) : 0,
    totalItems: localStorage.getItem("totalItems") ? JSON.parse(localStorage.getItem("totalItems")) : 0,
};

const cartSlice = createSlice({
    name:"cart",
    initialState:initialState,
    reducers : {
        setTotalItems(state, value){
            state.totalItems = value.payload;
        },
        //addToCart
        //removeFromCart
        //resetCart
        resetCart: (state) => {
            state.cart = []
            state.total = 0
            state.totalItems = 0
            
            localStorage.removeItem("cart")                // Update to localstorage
            localStorage.removeItem("total")
            localStorage.removeItem("totalItems")
          },
    }
})

export const {setTotalItems, resetCart} = cartSlice.actions;
export default cartSlice.reducer;