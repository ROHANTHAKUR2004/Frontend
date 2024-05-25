import { useState } from 'react';
import DataTable from 'react-data-table-component';
import { FaCloudDownloadAlt } from "react-icons/fa";
import { usePDF } from 'react-to-pdf';

import HomeLayout from "../../src/Layouts/HomeLayouts";
import TicketsDetailModal from '../components/TicketsDetailModal';
import useTickets from "../hooks/useTickets";


export default function Dasboard(){

    const [ticketState] = useTickets();
    const [selectedticket , setselectedticket] = useState({});
    const { toPDF , targetRef}  = usePDF({filename : 'page.pdf'});

    const ExpandedComponent = ({ data }) => <pre>{JSON.stringify(data, null, 2)}</pre>;
    const columns = [
        {
            name: 'Tickect Id',
            selector: row => row._id,
            reorder : true,
        },
        {
            name: 'Title',
            selector: row => row.title,
            reorder : true,
        },
        {
            name: 'Description',
            selector: row => row.description,
            reorder : true,
        },
        {
            name: 'Reporter',
            selector: row => row.assignedTo,
            reorder : true,
        },
        {
            name: 'Priority',
            selector: row => row.ticketPriority,
            sortable : true,
            reorder : true,
        },
        {
            name: 'Assignee',
            selector: row => row.assignee,
            reorder : true,
        }, 
        {
            name: 'Status',
            selector: row => row.status,
            sortable : true,
            reorder : true,
        },
    ];

    
    return(
        <HomeLayout>
            <div className="min-h-[90vh] ml-20 flex flex-col items-center justify-center gap-2" >
              
                <div className="bg-yellow-500 w-full text-black text-center text-3xl py-4 font-bold hover:bg-yellow-300 transition-all ease-in-out duration-300 max-w-[85vh]">
                     Tickets Records <FaCloudDownloadAlt onClick={() => toPDF()} className="inline "/>
                </div>
                 
               <div ref={targetRef}>
                {ticketState && 
                <DataTable
                onRowClicked={(row) =>{
                    setselectedticket(row);
                    document.getElementById('ticket_modal').showModal();
                }}
                columns={columns}
                data={ticketState.ticketList}
                expandableRows
			    // eslint-disable-next-line no-mixed-spaces-and-tabs
			    expandableRowsComponent={ExpandedComponent}
                />
                }
                <TicketsDetailModal ticket={selectedticket} key={selectedticket._id}/>
              </div>
            </div>
        </HomeLayout>
    );
}