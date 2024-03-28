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
        <div className="min-h-[90vh] flex justify-center items-center ">
             {userlist && 
               <DataTable
               columns={columns}
               data={userlist} 
              />}
              </div>
         </HomeLayout>
       
    );
}