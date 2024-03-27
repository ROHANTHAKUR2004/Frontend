import { ArcElement, BarElement, CategoryScale, Chart as ChartJS, Legend , LinearScale, LineElement,PointElement , Title, Tooltip} from "chart.js";
import { useEffect, useState } from "react";

import useTickets from "./useTickets";


ChartJS.register( ArcElement, Tooltip, Legend , Title, CategoryScale,LinearScale,LineElement,PointElement, BarElement);
export default function useCharts(){

    const [ticketState]  = useTickets();
    const [ticketschartdata , setticketschartdata] = useState({
        opentickets : [],
        closedtickets : [], 
        resolvedtickets : [],
        inprogresstickets :[],
        onholdtickets :[],
        openTicketsByMonth : [],
        inProgressTicketsByMonth: [],
        resolvedTicketsByMonth : [],
        cancelledTicketByMonth : [],
        onholdTicketByMonth : []
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
        borderColor : 'rgb(245, 205,95)',
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

    const barChartData = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      datasets: [
        {
          label: 'Open',
          data: Object.values(ticketschartdata.openTicketsByMonth),
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        {
          label: 'In Progress',
          data: Object.values(ticketschartdata.inProgressTicketsByMonth),
          backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
        {
          label: 'Resolved',
          data:Object.values(ticketschartdata.resolvedTicketsByMonth),
          backgroundColor: 'rgba(36, 50, 235, 0.5)',
        },
        {
          label: 'Cancelled',
          data:Object.values(ticketschartdata.cancelledTicketByMonth),
          backgroundColor: 'rgba(600, 80, 500, 0.5)',
        },
        {
          label: 'OnHold',
          data:Object.values(ticketschartdata.onholdTicketByMonth),
          backgroundColor: 'rgba(120, 450, 75, 0.5)',
        },
      ],
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
        let onholdticketdata = {};


        let openTicketsByMonth = {'January': 0, 'February': 0, 'March': 0, 'April': 0, 'May': 0, 'June': 0, 'July': 0, 'August': 0, 'September': 0, 'October': 0, 'November': 0, 'December': 0};
        let inProgressTicketsByMonth = {'January': 0, 'February': 0, 'March': 0, 'April': 0, 'May': 0, 'June': 0, 'July': 0, 'August': 0, 'September': 0, 'October': 0, 'November': 0, 'December': 0};
        let resolvedTicketsByMonth = {'January': 0, 'February': 0, 'March': 0, 'April': 0, 'May': 0, 'June': 0, 'July': 0, 'August': 0, 'September': 0, 'October': 0, 'November': 0, 'December': 0};
        let cancelledTicketByMonth = {'January': 0, 'February': 0, 'March': 0, 'April': 0, 'May': 0, 'June': 0, 'July': 0, 'August': 0, 'September': 0, 'October': 0, 'November': 0, 'December': 0};
        let onholdTicketByMonth = {'January': 0, 'February': 0, 'March': 0, 'April': 0, 'May': 0, 'June': 0, 'July': 0, 'August': 0, 'September': 0, 'October': 0, 'November': 0, 'December': 0};
      

        for(let i=0;i<10;i++){
          const dateobject = new Date();
          dateobject.setDate(currentDate.getDate() - i);
          
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

        let month = TicketDate.toLocaleString('default', { month: 'long' });
                if(ticket.status == "open") {

                    openTicketsByMonth[month] += 1;
                }
                if(ticket.status == "resolved") {

                    resolvedTicketsByMonth[month] += 1;
                }
                if(ticket.status == "inProgress") {

                    inProgressTicketsByMonth[month] += 1;
                }
                if(ticket.status == "cancelled") {

                  cancelledTicketByMonth[month] += 1;
              }
              if(ticket.status == "onHold") {

                onholdTicketByMonth[month] += 1;
            }
        });
       // console.log("next")
       // console.log(openticketdata)
       setticketschartdata({
         opentickets : openticketdata,
         closedtickets : closedticketdata,
         resolvedtickets : resolvedticketdata,
         inprogresstickets : inprogressticketdata,
         onholdtickets : onholdticketdata,
         openTicketsByMonth: openTicketsByMonth,
         resolvedTicketsByMonth: resolvedTicketsByMonth,
         inProgressTicketsByMonth: inProgressTicketsByMonth,
         onholdTicketByMonth : onholdTicketByMonth,
         cancelledTicketByMonth : cancelledTicketByMonth
       });
       
       //setclosedtickets(closedticketdata);
     }
    }
    

    useEffect(()=>{
       processtickets();
    },[ticketState.ticketList]);

    return[piechartdata, linechartdata , barChartData];
}