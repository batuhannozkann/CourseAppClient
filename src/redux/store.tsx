import { configureStore } from '@reduxjs/toolkit'
import userSlice from './slices/user'

export const store = configureStore({
    reducer:{
        userInfo:userSlice
    },
})