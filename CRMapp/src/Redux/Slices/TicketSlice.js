import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

import axiosInstance from "../../config/axiosInstance";

const initialState = {
    ticketList : []
};


export const getallticketsfortheuser = createAsyncThunk('tickets/getallticketfortheuser', async ()=>{
      
    try {
        const response = axiosInstance.get("getMyAssignedTickets" , {

              headers :{
                'x-access-token' : localStorage.getItem('token')
              }

        });
         toast.promise(response ,{
               success : 'sucessfully loaded all the tickets',
               loading : 'Fetching tickets',
               error : 'something went wrong'
         });
         return await response;
    } catch (error) {
        console.log(error);
       
    }
});

const ticketSlice = createSlice({
    name: 'tickets',
    initialState,
    reducers : {},
    extraReducers : (builder) =>{
        builder.addCase(getallticketsfortheuser.fulfilled, (state , action)=>{
            if(!action?.payload?.data) return;
            state.ticketList = action?.payload?.data?.result;
        });
    }
});

export default ticketSlice.reducer;