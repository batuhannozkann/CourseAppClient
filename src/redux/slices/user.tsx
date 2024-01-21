import { createSlice } from "@reduxjs/toolkit";

const initialState:any = {
    firstName:"",
    pictureUrl:"",
};
export const userSlice = createSlice({
    name: 'userInfo',
    initialState,
    reducers:{
        setUser:(state,action)=>
        {
            state.firstName=action.payload.firstName,
            state.picutreUrl=action.payload.pictureUrl
        }
    }
});
export default userSlice.reducer;
export const {setUser} = userSlice.actions;