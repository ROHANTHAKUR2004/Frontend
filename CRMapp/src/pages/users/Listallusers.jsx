import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";

import UserDetailsModal from "../../components/UserDetailsModal";
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
        clientName : '',
        id : ''
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
                    clientName : row.clientName,
                    id : row._id
                });
                document.getElementById('user_details_modal').showModal() ;
            }}
               columns={columns}
               data={userlist} 
              />}

                 <UserDetailsModal resetTable={loadusers} key={userdisplay.email} user={userdisplay}/>
              </div>
         </HomeLayout>
       
    );
}