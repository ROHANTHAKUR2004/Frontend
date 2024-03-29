import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

import axiosInstance from "../../config/axiosInstance";

const initialState = {
    downloadedtickets : [],
    ticketList : [],
    ticketDistribution:{
        open: 0,
        inProgress : 0,
        resolved: 0,
        onHold : 0,
        cancelled : 0
    }
};



export const getallticketsfortheuser = createAsyncThunk('tickets/getallticketfortheuser', async ()=>{
      
    try {
        const response = axiosInstance.get("getMyAssignedTickets" , {

              headers :{
                'x-access-token' :  localStorage.getItem('token')
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


export  const updateticket = createAsyncThunk('tickets/updateticket', async (ticket)=>{
      
    try {
        const response =  axiosInstance.patch(`ticket/${ticket._id}`, 
         ticket,
        {
           
            headers :{
                'x-access-token' :  localStorage.getItem('token')
              }
        });
         toast.promise(response ,{
               success : 'sucessfully updating the tickets',
               loading : 'Updating tickets',
               error : 'something went wrong'
         });
         return await response;
    } catch (error) {
        console.log(error);
       
    }
});


export const createTicket = createAsyncThunk('tickets/createTicket', async (ticket)=>{
      
    try {
        const response =  axiosInstance.post("ticket", 
         ticket,
        {
           
            headers :{
                'x-access-token' :  localStorage.getItem('token')
              }
        });
         toast.promise(response ,{
               success : 'Sucessfully created the ticket',
               loading : 'created ticket',
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
    reducers : {

        filtertickets : (state, action)=>{
             let status = action.payload.status.toLowerCase();
             if(status == "inprogress") status = "inProgress";
             if(status == "onhold")  status = "onHold";
             state.ticketList = state.downloadedtickets.filter((ticket)=> ticket.status == status); 
          // console.log('status is' , status);
        },
        
         resetticketlist :(state) =>{
          state.ticketList = state.downloadedtickets;
         }

    },
    extraReducers : (builder) =>{
        builder
        .addCase(getallticketsfortheuser.fulfilled, (state , action)=>{
            if(!action?.payload?.data) return;
            state.ticketList = action?.payload?.data?.result;
            state.downloadedtickets = action?.payload?.data?.result;
            const tickets = action?.payload?.data?.result;
            state.ticketDistribution ={
                open: 0,
                inProgress : 0,
                resolved: 0,
                onHold : 0,
                cancelled : 0
            };
            tickets.forEach(ticket =>{ 
               state.ticketDistribution[ticket.status] = state.ticketDistribution[ticket.status] + 1;
            });
        })
        .addCase(updateticket.fulfilled, (state, action) =>{
            const updatedticket = action.payload.data.result;
            state.ticketList = state.ticketList.map((ticket) =>{
                  if(ticket._id == updatedticket._id) return updatedticket;
                  return ticket;
            });
            state.downloadedtickets = state.downloadedtickets.map((ticket) =>{
                if(ticket._id == updatedticket._id) return updatedticket;
                return ticket;
            });
            state.ticketDistribution ={
                open: 0,
                inProgress : 0,
                resolved: 0,
                onHold : 0,
                cancelled : 0
            };
            state.downloadedtickets.forEach(ticket =>{ 
                state.ticketDistribution[ticket.status] = state.ticketDistribution[ticket.status] + 1;
             });
        })
        .addCase(createTicket.fulfilled, (state , action) =>{
            if(action?.payload?.data == undefined) return;
            const newTicket = action.payload.data;
            state.downloadedtickets.push(newTicket);
            state.ticketList = state.downloadedtickets;
            state.ticketDistribution =  {
                open: 0,
                inProgress: 0,
                resolved: 0,
                onHold: 0,
                cancelled: 0
            };
            state.downloadedtickets.forEach(ticket => {
                state.ticketDistribution[ticket.status] = state.ticketDistribution[ticket.status] + 1;
            });
        });
    }
});


export const {filtertickets,  resetticketlist} = ticketSlice.actions;

export default ticketSlice.reducer;



