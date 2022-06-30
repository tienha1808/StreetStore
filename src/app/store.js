import { configureStore } from '@reduxjs/toolkit'
import authSlice from '../pages/Auth/authSlice.js'
import listCartSlice from '../pages/Cart/listCartSlice.js'

export default configureStore({
    reducer: {
        listCart: listCartSlice,
        stateUser : authSlice,
    }
})