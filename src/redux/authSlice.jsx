
import { createSlice } from '@reduxjs/toolkit'


const authSlice = createSlice({
    name :  'auth', 
    initialState: {
        role: localStorage.getItem('role'),
        user_id: localStorage.getItem('user_id'),
        access_token: localStorage.getItem('access_token'),
        refresh_token: localStorage.getItem('refresh_token')
    },
    reducers: {
        loginSuccess: (state, action) => {
            state.access_token = action.payload.access_token;
            state.refresh_token = action.payload.refresh_token;
            state.role = action.payload.role;
            state.user_id = action.payload.user_id;
            localStorage.setItem('access_token', action.payload.access_token);
            localStorage.setItem('refresh_token', action.payload.refresh_token);
            localStorage.setItem('role', action.payload.role);
            localStorage.setItem('user_id', action.payload.user_id)
        },
        logout: (state) => {
            state.access_token = null;
            state.refresh_token = null;
            state.role = null;
            state.user_id = null;
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            localStorage.removeItem('role');
            localStorage.removeItem('user_id');
        },
    },
});

export const {loginSuccess, logout} = authSlice.actions
export default authSlice.reducer