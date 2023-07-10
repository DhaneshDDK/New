import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

const initialState =  {
    totalItems : localStorage.getItem("totalItems")? JSON.parse(localStorage.getItem("totalItems")) : 0,
    totalPrice : localStorage.getItem("totalPrice")? JSON.parse(localStorage.getItem("totalPrice")) : 0,
    cart : localStorage.getItem("cart")? JSON.parse(localStorage.getItem("cart")) : [],
}

const cartSlice = createSlice({
    name : "cart",
    initialState : initialState,
    reducers : {
        //add to cart 
        addToCart : (state, value) => {
            const course  = value.payload;
            const index = state.cart.findIndex((item) => item._id === course._id);

            //if index >= 0 course exists 
             if(index >= 0) {
                toast.error("Course already in cart")
                return;
             }
             // If the course is not in the cart, add it to the cart
            state.cart.push(course);

            state.totalItems++; 
            state.totalPrice += course.price;
               // Update to localstorage
              localStorage.setItem("cart", JSON.stringify(state.cart))
              localStorage.setItem("totalPrice", JSON.stringify(state.totalPrice))
              localStorage.setItem("totalItems", JSON.stringify(state.totalItems))

              toast.success("Course added to cart")
        },

        //remove from cart
        removeItemsFromCart : (state, value) => {
            const courseId = value.payload;
            const index = state.cart.findIndex((item) => item._id === courseId);
            if(index >= 0){
                state.totalItems--; 
                state.totalPrice -= state.cart[index].price;
                state.cart.splice(index, 1);
                
                localStorage.setItem("cart", JSON.stringify(state.cart));
                localStorage.setItem("totalPrice", JSON.stringify(state.totalPrice));
                localStorage.setItem("totalPrice", JSON.stringify(state.totalPrice));
                toast.success("Course removed from cart")
            }
        },

        resetCart: (state) => {
            console.log('called')
            state.cart = [] 
            state.totalPrice = 0
            state.totalItems = 0
            // Update to localstorage
            localStorage.removeItem("cart")
            localStorage.removeItem("total")
            localStorage.removeItem("totalItems")
          },

    }
})

export const {addToCart, removeItemsFromCart, resetCart } = cartSlice.actions;
export default cartSlice.reducer;