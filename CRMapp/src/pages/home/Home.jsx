import { useEffect } from "react";
import { BiSolidLockOpen } from "react-icons/bi";
import { IoCheckmarkDoneCircleSharp } from "react-icons/io5";
import { MdPending } from "react-icons/md";
import { MdCancel } from "react-icons/md";
import { TbProgressBolt } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";

import Cart from "../../components/Cart";
import HomeLayout from "../../Layouts/HomeLayouts";
import { getallticketsfortheuser } from "../../Redux/Slices/TicketSlice";

export default function Home(){

    const authState  = useSelector((state) => state.auth);
    const ticketState  = useSelector((state) => state.tickets);

    const dispatch = useDispatch();


    async function  loadtickets(){
       const response = await dispatch(getallticketsfortheuser());
       console.log(response);
    }

    useEffect(()=>{
       loadtickets();
    },[authState.token]);

    return(
        <HomeLayout>

             <div className='mt-10 flex-wrap flex flex-row justify-center items-center gap-10   '>
    
            <Cart 
            titletext='Open' 
             status={ticketState.ticketDistribution.open / ticketState. ticketList.length}
            quantity={ticketState.ticketDistribution.open}
            background="bg-yellow-300"
             fontcolor="text-black" 
             dividercolor="bg-black" 
             bordercolor="border-green-300">

            <BiSolidLockOpen className='inline mr-2'/>
            </Cart>

            <Cart 
            titletext="Inprogress"
            status={ticketState.ticketDistribution.inProgress / ticketState. ticketList.length}
            quantity={ticketState.ticketDistribution.inProgress}
             background="bg-orange-300"
              fontcolor="text-black"
               dividercolor="bg-black"
                bordercolor="border-red-400">

        <TbProgressBolt className='inline mr-2'/>
            </Cart>

            <Cart 
            titletext="Resolved" 
            status={ticketState.ticketDistribution.resolved / ticketState. ticketList.length}
            quantity={ticketState.ticketDistribution.resolved}
            background="bg-purple-300" 
            fontcolor="text-black" 
            dividercolor="bg-black"
             bordercolor="border-blue-700">

           <IoCheckmarkDoneCircleSharp className='inline mr-2'/>
            </Cart>


            <Cart 
            titletext="Onhold"
            status={ticketState.ticketDistribution.onHold / ticketState. ticketList.length}
            quantity={ticketState.ticketDistribution.onHold}
             background="bg-gray-300"
              fontcolor="text-black" 
              dividercolor="bg-black" 
              bordercolor="border-gray-800">

              <MdPending className='inline mr-2'/>
            </Cart>

            <Cart
             titletext="Cancelled" 
             status={ticketState.ticketDistribution.cancelled / ticketState. ticketList.length}
            quantity={ticketState.ticketDistribution.cancelled}
           
             background="bg-blue-300" 
             fontcolor="text-black"
              dividercolor="bg-black" 
              bordercolor="border-violet-400">

              <MdCancel  className='inline mr-2'/>
            </Cart>

           

            </div>

        </HomeLayout>

        );
}