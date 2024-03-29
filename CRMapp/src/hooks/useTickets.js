import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

import { filtertickets,getallticketsfortheuser,  getcreatedticketsofuser,  resetticketlist } from "../Redux/Slices/TicketSlice";

export default function useTickets(){

    const authState  = useSelector((state) => state.auth);
    const ticketState = useSelector((state) => state.tickets);
    const dispatch = useDispatch();
    const [searchparams] = useSearchParams();


    async function  loadtickets(){
        if(ticketState.downloadedtickets.length == 0){
            if(authState.role == "customer"){
                 await dispatch(getcreatedticketsofuser());
            } else{
            await dispatch(getallticketsfortheuser());
            }
        }
       
        if(searchparams.get("status")){
          dispatch(filtertickets({status :searchparams.get("status")}));
             }else{
             dispatch(resetticketlist());
     }
    }

    useEffect(()=>{
       
            loadtickets();
      
    },[authState.token, searchparams.get("status")]);


    return[ticketState];


}