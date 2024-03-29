import { useEffect } from "react";
import { LuMenuSquare } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { logout } from "../Redux/Slices/AuthSlice";

// eslint-disable-next-line react/prop-types
export default function HomeLayout({children}){

    const authState = useSelector((state) => state.auth);
  
    const dispatch = useDispatch();
    const navigate = useNavigate();
     

    async function onlogout(){
        dispatch(logout());
        navigate("/login");
        
    }

    useEffect(()=>{
            if(!authState.isloggedin) navigate("/login");
    },[]);

    return(
        <div className="min-h-[90vh]">
        <div className="drawer absolute left-0 right-0 cursor-pointer mt-2 ml-2">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
               <div className="drawer-content">
                <label htmlFor="my-drawer">

                <LuMenuSquare
                 size={'32px'}
                 className="cursor-pointer"
                />
                   
                </label>
               </div> 
               <div className="drawer-side">
                 <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                 <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
                  
                 <li><Link to="/">Home</Link></li>
                   
                   <li><Link to="/dashboard">Dashboard</Link></li>

                  {authState.role =="admin" && <li><Link to="/users">All Users</Link></li>}

                  {authState.isloggedin && <li><Link to="/ticket/create">Create Ticket</Link></li>}



                  <li className="absolute bottom-8 w-3/4">
                     <div className="w-full flex justify-center items-center ">
                        {
                            !authState.isloggedin ? (
                                <>
                                <Link to="/login" className="btn btn-primary  px-2 py-1 rounded-md font-semibold w-3/4 "><button>Login</button></Link>
                                <Link to="/signup" className="btn btn-secondary px-2 py-1 rounded-md font-semibold w-3/4 "><button >SignUp</button></Link>
                                </>
                            ): (
                                <>
                               <button onClick={onlogout} className="btn btn-primary  px-2 py-1 rounded-md font-semibold w-3/4 " >Logout</button>
                                 <Link className="btn btn-secondary px-2 py-1 rounded-md font-semibold w-3/4 "><button >Profile</button></Link> 
                                </>
                            )
                        }
                        
                     </div>
                  </li>
                 </ul>
               </div>
        </div>
        <div className="flex align-start justify-center ml-20">
            <div className="w-3/4">
             { children}
            </div>
        </div>
     </div>
    );
}