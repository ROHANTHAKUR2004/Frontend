import { useEffect } from "react";
import { BsFillPencilFill } from "react-icons/bs";
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
             <div className='mt-10 flex flex-row justify-center items-center gap-5 flex-wrap'>
            <Cart>
            <BsFillPencilFill className='inline mr-2'/>
            </Cart>

            <Cart status={30} background="bg-yellow-300" fontcolor="text-black" dividercolor="bg-black" bordercolor="border-green-300">
            <BsFillPencilFill className='inline mr-2'/>
            </Cart>

            <Cart status={30} background="bg-yellow-300" fontcolor="text-black" dividercolor="bg-black" bordercolor="border-green-300">
            <BsFillPencilFill className='inline mr-2'/>
            </Cart>

            <Cart status={30} background="bg-yellow-300" fontcolor="text-black" dividercolor="bg-black" bordercolor="border-green-300">
            <BsFillPencilFill className='inline mr-2'/>
            </Cart>

           

            </div>

        </HomeLayout>

        );
}