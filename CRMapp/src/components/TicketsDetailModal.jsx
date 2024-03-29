import {  useState } from "react";
import { useDispatch } from "react-redux";

import { updateticket } from "../Redux/Slices/TicketSlice";

export default function TicketsDetailModal({ticket}){

    const [currentticket , setcurrentticket] = useState(ticket);
    const dispatch = useDispatch();

    function handleTicketChange(e){
        const {name , value} = e.target;
        console.log(name , value);
        setcurrentticket({
          ...currentticket,
          [name]: value 
        });
    }

    async function handleFormSubmit(){
         await dispatch(updateticket(currentticket));
          const modal = document.getElementById("ticket_modal");
          modal.close();
    }

  

    return(
        <dialog id="ticket_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">{currentticket.title}</h3>
          {/* <p className="py-4"> </p> */}

          <textarea
          className="bg-white w-full text-black my-2 p-2 rounded-lg resize-none"
           name="description"
           cols="50"
           rows="5"
           value={currentticket.description}
           onChange={handleTicketChange}
          >
          </textarea>

          <h1 className="text-lg text-white ">
            Priority : 
            <select name="ticketPriority" onChange={handleTicketChange} className=" p-0.5 mx-2 bg-white text-black">
                <option value="1" selected={currentticket.ticketPriority == 1} >1</option>
                <option value="2" selected={currentticket.ticketPriority == 2} >2</option>
                <option value="3" selected={currentticket.ticketPriority == 3} >3</option>
                <option value="4" selected={currentticket.ticketPriority >= 4} >4</option>
            </select>
          </h1>

          <h1 className="text-lg mt-4 text-white ">
            Status : 
            <select name="status" onChange={handleTicketChange} className=" p-0.5 mx-2 bg-white text-black">
                <option value="open"       selected={currentticket.status == "open"} >open</option>
                <option value="inProgress" selected={currentticket.status == "inProgress"} >inProgress</option>
                <option value="resolved"   selected={currentticket.status == "resolved"} >resolved</option>
                <option value="onHold"     selected={currentticket.status == "onHold"} >onHold</option>
                <option value="cancelled"  selected={currentticket.status == "cancelled"} >cancelled</option>
            </select>
          </h1>





          <div className="modal-action">
             <button 
               onClick={handleFormSubmit}
             className="btn-success
                       bg-green-600 font-semibold
                      hover:bg-green-300  
                      transition-all ease-in-out
                       duration-300  px-4 py-2 rounded-md">
                     Update Tickets
                </button>
          </div>
        </div>
         <form method="dialog" className="modal-backdrop">
         <button>close</button>
         </form>
      </dialog>
    );
}