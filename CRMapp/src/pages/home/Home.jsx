
import { BiSolidLockOpen } from "react-icons/bi";
import { IoCheckmarkDoneCircleSharp } from "react-icons/io5";
import { MdPending } from "react-icons/md";
import { MdCancel } from "react-icons/md";
import { TbProgressBolt } from "react-icons/tb";
import { Chart as ChartJS, ArcElement, Tooltip, Legend , Title, CategoryScale, LinearScale, PointElement , LineElement} from "chart.js";
import Cart from "../../components/Cart";
import useTickets from "../../hooks/useTickets";
import HomeLayout from "../../Layouts/HomeLayouts";
import { Pie, Line } from 'react-chartjs-2';
import { useEffect, useState } from "react";


ChartJS.register( ArcElement, Tooltip, Legend , Title, CategoryScale,LinearScale,LineElement,PointElement);

export default function Home(){

    
    const [ticketState]  = useTickets();
    const [ticketschartdata , setticketschartdata] = useState({
        opentickets : [],
        closedtickets : [], 
        resolvedtickets : [],
        inprogresstickets :[],
        onholdtickets :[]
    });

    const piechartdata = {
           labels : Object.keys(ticketState.ticketDistribution),
           fontColor : "white",
           datasets : [
            {
              label : "Tickets data",
              data : Object.values(ticketState.ticketDistribution) ,
               backgroundColor :["yellow" , "red", "green" , "gray", "orange" ],
               borderColor : ["yellow" , "red","green" , "gray", "orange" ]   
            }
           ]
    };

   

    const linechartdata = {
      labels : Object.keys(ticketschartdata.opentickets),
      fontColor : "white",
      datasets : [
       {
        label : "Open Tickets data",
        data : Object.values(ticketschartdata.opentickets) ,
        borderColor : 'rgb(255, 99,132)',
        backgroundColor : 'rgba(255, 99 132 0.5)',
       }, {
        label : "Cancelled Tickets data",
        data : Object.values(ticketschartdata.closedtickets) ,
        borderColor : 'rgb(32, 40,132)',
        backgroundColor : 'rgba(255, 99 132 0.5)',
       },
       {
        label : "Resolved Tickets data",
        data : Object.values(ticketschartdata.resolvedtickets) ,
        borderColor : 'rgb(70, 35,32)',
        backgroundColor : 'rgba(255, 99 132 0.5)',
       },{
        label : "InProgress Tickets data",
        data : Object.values(ticketschartdata.inprogresstickets) ,
        borderColor : 'rgb(100, 80,32)',
        backgroundColor : 'rgba(255, 99 132 0.5)',
       },{
        label : "OnHold Tickets data",
        data : Object.values(ticketschartdata.onholdtickets) ,
        borderColor : 'rgb(200,12,32)',
        backgroundColor : 'rgba(255, 99 132 0.5)',
       }
      ]
         
    };

    function processtickets(){

  
    const currentDate = new Date();
    const tenthDayfromtoday = new Date();
    tenthDayfromtoday.setDate(currentDate.getDate() - 10);
    
  
      if(ticketState.ticketList.length > 0){
        let openticketdata = {};
        let closedticketdata = {};
        let resolvedticketdata = {};
        let inprogressticketdata = {};
        let onholdticketdata = {}
      

        for(let i=0;i<10;i++){
          const dateobject = new Date();
          dateobject.setDate(currentDate.getDate() - i)
          
           openticketdata[dateobject.toLocaleDateString('en-CA').split("/").reverse().join("-")] = 0;
           closedticketdata[dateobject.toLocaleDateString('en-CA').split("/").reverse().join("-")] = 0;
           resolvedticketdata[dateobject.toLocaleDateString('en-CA').split("/").reverse().join("-")] = 0;
           inprogressticketdata[dateobject.toLocaleDateString('en-CA').split("/").reverse().join("-")] = 0;
           onholdticketdata[dateobject.toLocaleDateString('en-CA').split("/").reverse().join("-")] = 0;

           //console.log(openticketdata);
        }

        ticketState.ticketList.forEach(ticket =>{
         const date = ticket.createdAt.split("T")[0];
         const TicketDate = new Date(ticket.createdAt);
         
         if(ticket.status == "open" &&  TicketDate >= tenthDayfromtoday ){
           openticketdata[date] =  openticketdata[date] + 1;
         }
         if(ticket.status == "cancelled" &&  TicketDate >= tenthDayfromtoday ){
          closedticketdata[date] =  closedticketdata[date] + 1;
        }
        if(ticket.status == "resolved" &&  TicketDate >= tenthDayfromtoday ){
          resolvedticketdata[date] =  resolvedticketdata[date] + 1;
        }
        if(ticket.status == "inProgress" &&  TicketDate >= tenthDayfromtoday ){
          inprogressticketdata[date] =  inprogressticketdata[date] + 1;
        }
        if(ticket.status == "onHold" &&  TicketDate >= tenthDayfromtoday ){
          onholdticketdata[date] =  onholdticketdata[date] + 1;
        }
        });
       // console.log("next")
       // console.log(openticketdata)
       setticketschartdata({
         opentickets : openticketdata,
         closedtickets : closedticketdata,
         resolvedtickets : resolvedticketdata,
         inprogresstickets : inprogressticketdata,
         onholdtickets : onholdticketdata
       })
       
       //setclosedtickets(closedticketdata);
     }
    }
    

    useEffect(()=>{
       processtickets();
    },[ticketState.ticketList])




    return(
        <HomeLayout>
              {ticketState && (
             <div className='mt-10 flex-wrap flex flex-row justify-center items-center gap-10   '>
    
            <Cart 
            titletext='Open' 
             status={ticketState.ticketDistribution.open / ticketState.downloadedtickets.length}
            quantity={ticketState.ticketDistribution.open}
            background="bg-yellow-300"
             fontcolor="text-black" 
             dividercolor="bg-black" 
             bordercolor="border-green-300">

            <BiSolidLockOpen className='inline mr-2'/>
            </Cart>

            <Cart 
            titletext="Inprogress"
            status={ticketState.ticketDistribution.inProgress / ticketState.downloadedtickets.length}
            quantity={ticketState.ticketDistribution.inProgress}
             background="bg-orange-300"
              fontcolor="text-black"
               dividercolor="bg-black"
                bordercolor="border-red-400">

        <TbProgressBolt className='inline mr-2'/>
            </Cart>

            <Cart 
            titletext="Resolved" 
            status={ticketState.ticketDistribution.resolved / ticketState.downloadedtickets.length}
            quantity={ticketState.ticketDistribution.resolved}
            background="bg-purple-300" 
            fontcolor="text-black" 
            dividercolor="bg-black"
             bordercolor="border-blue-700">

           <IoCheckmarkDoneCircleSharp className='inline mr-2'/>
            </Cart>


            <Cart 
            titletext="Onhold"
            status={ticketState.ticketDistribution.onHold / ticketState.downloadedtickets.length}
            quantity={ticketState.ticketDistribution.onHold}
             background="bg-gray-300"
              fontcolor="text-black" 
              dividercolor="bg-black" 
              bordercolor="border-gray-800">

              <MdPending className='inline mr-2'/>
            </Cart>

            <Cart
             titletext="Cancelled" 
             status={ticketState.ticketDistribution.cancelled / ticketState.downloadedtickets.length}
            quantity={ticketState.ticketDistribution.cancelled}
           
             background="bg-blue-300" 
             fontcolor="text-black"
              dividercolor="bg-black" 
              bordercolor="border-violet-400">

              <MdCancel  className='inline mr-2'/>
            </Cart>

           

            </div>
          )}

  
        {/*  */}
        <div className="flex justify-center items-center mt-10 gap-10">
        <div className="w-80 h-80" >
          <Pie 
          data={piechartdata}
          />
        </div>
        </div>

        <div className="flex justify-center items-center mt-10 gap-10">
        <div className="w-[40rem] h-[40rem]">
           <Line
           data={linechartdata}
            />
            </div>
        </div>
        
        </HomeLayout>

        );
}