import { createSlice } from "@reduxjs/toolkit";

const initialState:any = {
    username:"",
    fullname:""
};
export const userSlice = createSlice({
    name: 'userInfo',
    initialState,
    reducers:{
        setUser:(state,action)=>
        {
            state.username=action.payload.username,
            state.fullname=action.payload.fullname
        }
    }
});
export default userSlice.reducer;
export const {setUser} = userSlice.actions;