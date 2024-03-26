import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getallticketsfortheuser } from "../Redux/Slices/TicketSlice";

export default function useTickets(){

    const authState  = useSelector((state) => state.auth);
    const ticketState = useSelector((state) => state.tickets);
    const dispatch = useDispatch();


    async function  loadtickets(){
        await dispatch(getallticketsfortheuser());
     
    }

    useEffect(()=>{
        if(ticketState.ticketList.length == 0){
            loadtickets();
        }
    },[authState.token]);


    return[ticketState];


}