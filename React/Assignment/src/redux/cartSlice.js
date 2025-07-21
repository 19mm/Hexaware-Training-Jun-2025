import {createSlice} from "@reduxjs/toolkit";

const cartSlice=createSlice({
    name:'cart',

    initialState:{
        cartItems:[],
    },

    reducers:{
        addToCart:(state, action)=>{
            const item=action.payload;
            const exists=state.cartItems.find(i=>i.id===item.id);
            if(exists){
                exists.quantity+=1;
            }
            else{
                state.cartItems.push({...item, quantity:1});
            }
        }
    }
})

export const {addToCart}=cartSlice.actions;
export default cartSlice.reducer;