import { useState } from "react";
import toast from "react-hot-toast";

import axiosInstance from "../config/axiosInstance";

export default function UserDetailsModal({user, resetTable}){


    const [userdisplay, setuserdisplay] = useState(user);

    async function handleuserchange(e){
        try {
       // console.log(e.target.textContent);
       const ul = e.target.parentNode.parentNode;
       const name = ul.getAttribute("name");
        const dropdown = document.getElementById(`${name}dropdown`);
        dropdown.open = !dropdown.open;
        
        toast("Updating userstatus...");
        const response =  await axiosInstance.patch("user/updateUser", {

            userId : userdisplay.id,
            updates : {
                ...userdisplay,
                [name]: e.target.textContent
            }
        },{
            headers :{
                'x-access-token' : localStorage.getItem('token')
              }
        });
        if(response?.data?.result){
            toast.success("Succefully updated user status");
            const user = response?.data?.result;
            setuserdisplay({
                ...userdisplay,
                name : user.name,
                email : user.email,
                userStatus : user.userStatus,
                userType : user.userType,
                clientName : user.clientName
               
            });
            resetTable();
        }
    } catch (error) {
           toast.error("something went wrong..");
    }
    }


   return(
    <dialog id="user_details_modal" className="modal">
    <div className="modal-box text-lg font-semibold">
      <h3 className="font-bold text-lg">User Details!</h3>
      <p className="py-4">Name :   <span className="text-yellow-500">{userdisplay.name}</span></p>
      <p className="py-4">Email:   <span className="text-yellow-500">{userdisplay.email}</span></p>
      <p className="py-4">Status :
         <span className="text-yellow-500">
         <details className="dropdown ml-2" id="userStatusdropdown">
              <summary className="m-1 btn">{userdisplay.userStatus}</summary>
              <ul name="userStatus" onClick={handleuserchange} className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
                <li><a>approved</a></li>
                <li><a>suspended</a></li>
                <li><a>rejected</a></li>
              </ul>
           </details>
       
         </span>
         </p>
      <p className="py-4">Type : 
        <span className="text-yellow-500">
            <details className="dropdown ml-2" id="userTypedropdown">
              <summary className="m-1 btn">{userdisplay.userType}</summary>
              <ul name="userType" onClick={handleuserchange} className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
                <li><a>customer</a></li>
                <li><a>admin</a></li>
                <li><a>engineer</a></li>
              </ul>
           </details>
            </span>
            </p>
      <p className="py-4">Client : <span className="text-yellow-500">{userdisplay.clientName}</span></p>
    </div>
    <form method="dialog" className="modal-backdrop">
      <button>close</button>
    </form>
  </dialog>
   );
}