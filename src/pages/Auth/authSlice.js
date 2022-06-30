import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: 'stateUser',
    initialState: {
        isSignedIn: '',
        info: {}
    },
    reducers: {
        getState (state, action) {
            const { isSignedIn } = action.payload
            return state = {
                ...state,
                isSignedIn: isSignedIn
            }
        },
        getInfo (state, action) {
            if (!(state.isSignedIn)) return
            return state = {
                ...state,
                info: {
                    ...state.info,
                    ...action.payload
                }
            }
        },
        updateInfo (state, action) {
            return state = {
                ...state,
                info: {
                    ...state.info,
                    ...action.payload
                }
            }
        }
    }
})


export const { getState, getInfo, updateInfo } = authSlice.actions

export default authSlice.reducer