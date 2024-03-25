import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axiosInstance from "../../config/axiosInstance";

const initialState = {
    role : localStorage.getItem("role") || "",
    data : localStorage.getItem("data")|| undefined,
    token : localStorage.getItem("token") || "",
    isloggedin : localStorage.getItem("isloggedin") || false
};


 export const login = createAsyncThunk("/auth/login" , async (data) =>{
    try {
        const response = await axiosInstance.post("auth/signin", data);
        return response;
    } catch (error) {
         console.log(error);
        
    }


});

export const signup = createAsyncThunk("/auth/signup" , async (data) =>{
    try {
        const response =  await axiosInstance.post("auth/signup", data);
        // toast.promise(response,{
        //     loading: 'Submitting Form',
        //     success: 'Successfully SignedUp',
        //     error : 'Something Wrong , Try Again'
        // });
        return  response;
    } catch (error) {
         console.log(error);
        
    }


});

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout : (state)=>{
            localStorage.clear();
            state.role = '';
            state.isloggedin = false;
            state.data = undefined;
            state.token = '';

        }
    },
    extraReducers:( builder) =>{
        builder
        .addCase(login.fulfilled,( state , action)=>{
            if(!action.payload ) return;
            state.isloggedin = (action.payload?.data?.token != undefined);
            state.data = action.payload?.data?.userData;
            state.token = action.payload?.data?.token;
            state.role = action.payload?.data?.userData?.userType;
            localStorage.setItem("role", action.payload?.data?.userData?.userType);
            localStorage.setItem("isloggedin" ,  (action.payload?.data?.token != undefined));
            localStorage.setItem("data" , JSON.stringify(action.payload?.data?.userData));
            localStorage.setItem("token" , action.payload?.data?.token);
        });
    }

});

export const {logout} = authSlice.actions;
export default authSlice.reducer;