import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    role : localStorage.getItem("role") || "",
    data : localStorage.getItem("data") || {},
    isloggedin : localStorage.getItem("isloggedin") || false
}


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {}

});

export default authSlice.reducer;