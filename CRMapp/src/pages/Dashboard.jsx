

import HomeLayout from "../../src/Layouts/HomeLayouts";
import useTickets from "../hooks/useTickets";


export default function Dasboard(){

    const [ticketState] = useTickets();

    return(
        <HomeLayout>
            <div className="min-h-[90vh] ml-20 flex flex-col items-center justify-center gap-2">
                <div className="bg-yellow-500 w-full text-black text-center text-3xl py-4 font-bold hover:bg-yellow-300 transition-all ease-in-out duration-300">
                     Tickets Records
                </div>

                {/* table */}
                <div className="flex flex-col w-full">
                    {/* title row */}
                    <div className="flex justify-between font-bold items-center gap-3 px-2 py-2 bg-purple-600">
                        <div className="table-title basis-[9%] justify-start">Ticket Id</div>
                        <div className="table-title basis-[14%]">Title</div>
                        <div className="table-title basis-[20%]">Description</div>
                        <div className="table-title basis-[20%]">Reporter</div>
                        <div className="table-title basis-[4%]">Priortiy</div>
                        <div className="table-title basis-[21%]">Assignee</div>
                        <div className="table-title basis-[12%]">Status</div>
                    </div>
                {/* ticket details */}
                 
               {ticketState && ticketState.ticketList.map(ticket =>{
                        return(
                            <div key={ticket._id} className=" my-2 py-2 font-normal  text-sm flex justify-between items-center gap-3 px-2 text-black  bg-gray-100 hover:bg-gray-400 transition-all ease-in-out duration-300">
                            <div className="table-title basis-[9%] justify-start">{ticket._id.substring(0,5)+"."}</div>
                            <div className="table-title basis-[14%]">{ticket.title}</div>
                            <div className="table-title basis-[20%]">{ticket.description}</div>
                            <div className="table-title basis-[20%]">{ticket.assignee}</div>
                            <div className="table-title basis-[4%]">{ticket.ticketPriority}</div>
                            <div className="table-title basis-[21%]">{ticket.assignedTo}</div>
                            <div className="table-title basis-[12%]">{ticket.status}</div>
                        </div>
                        );
               })}
               

                </div>



            </div>

        </HomeLayout>
    );
}