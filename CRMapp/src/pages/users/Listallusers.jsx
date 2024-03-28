import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";

import axiosInstance from "../../config/axiosInstance";
import HomeLayout from "../../Layouts/HomeLayouts";

export default function Listallusers(){


    const columns = [
        {
            name: 'User Id',
            selector: row => row._id,
            reorder : true,
        },
        {
            name: 'Email',
            selector: row => row.email,
            reorder : true,
        },
        {
            name: 'Name',
            selector: row => row.name,
            reorder : true,
        },
        {
            name: 'Status',
            selector: row => row.userStatus,
            reorder : true,
        },
        {
            name: 'Type',
            selector: row => row.userType,
            sortable : true,
            reorder : true,
        },
    ];



    const [userlist, setuserlist] = useState([]);
    const [userdisplay, setuserdisplay] = useState({
         
        name : '',
        email : '',
        userType :'',
        userStatus : '',
        clientName : ''
    });



    async function loadusers(){
        const response = await axiosInstance.get("/users", {
            headers :{
                'x-access-token' : localStorage.getItem('token')
              }
        });
        setuserlist(response?.data?.result);
    }
    
   useEffect(()=>{
       loadusers();
   },[]);
    return(
         <HomeLayout>
       <div className="min-h-[90vh] ml-20 flex flex-col items-center justify-center gap-2" >
              
              <div className="bg-blue-500 w-full text-black text-center text-3xl py-4 font-bold hover:bg-yellow-300 transition-all ease-in-out duration-300 max-w-[85vh]">
                  Users List
              </div>
            
            
            {userlist && 
               <DataTable
               onRowClicked={ (row) =>{
                setuserdisplay({
                    name : row.name,
                    email : row.email,
                    userType : row.userType,
                    userStatus : row.userStatus,
                    clientName : row.clientName
                });
                document.getElementById('user_details_modal').showModal() ;
            }}
               columns={columns}
               data={userlist} 
              />}

                  <dialog id="user_details_modal" className="modal">
                    <div className="modal-box text-lg font-semibold">
                      <h3 className="font-bold text-lg">User Details!</h3>
                      <p className="py-4">Name :   <span className="text-yellow-500">{userdisplay.name}</span></p>
                      <p className="py-4">Email:   <span className="text-yellow-500">{userdisplay.email}</span></p>
                      <p className="py-4">Status : <span className="text-yellow-500"> {userdisplay.userStatus}</span></p>
                      <p className="py-4">Type :   <span className="text-yellow-500">{userdisplay.userType}</span></p>
                      <p className="py-4">Client : <span className="text-yellow-500">{userdisplay.clientName}</span></p>
                    </div>
                    <form method="dialog" className="modal-backdrop">
                      <button>close</button>
                    </form>
                  </dialog>
              </div>
         </HomeLayout>
       
    );
}