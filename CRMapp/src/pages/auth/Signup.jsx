

import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { signup } from '../../Redux/Slices/AuthSlice';
function Signup (){

  const dispatch = useDispatch();
  const navigate =  useNavigate();

  const [signupdetails, setsignupdetails] = useState({
    email : '',
    password: '',
    name : '',
    userType : '',
    userStatus :'',
    clientName : ''
  });

function handleonchange(e){

  const {name, value} = e.target;
  setsignupdetails({
    ...signupdetails,
    [name] : value
  });

}

function resetsignupstate(){
  setsignupdetails({
    email : '',
    password: '',
    name : '',
    userType : '',
    userStatus :'',
    clientName : ''
  });
}

function handleusertype(e){
  const usertypeSelected = e.target.textContent;
  setsignupdetails({
    ...signupdetails, 
    userType : usertypeSelected,
    userStatus : (usertypeSelected == 'customer') ? "approved" : "suspended"
  });
   const dropdown = document.getElementById("usertypedropdown");
   dropdown.open = !dropdown.open;
}

  async function onsubmit(){
    if(!signupdetails.email || !signupdetails.password ||
       !signupdetails.userStatus || !signupdetails.userType
        || !signupdetails.name || !signupdetails.clientName )  return;
   // console.log("calling" , signupdetails);
     const response =  await dispatch(signup(signupdetails));
    // console.log(response);
      if(response.payload) {
        toast.success("Successfully signedUp..", {
          position: 'top-right'
       });
      navigate("/login");
      }
      else{
        toast.error("Something Wrong, Try Again",{
          position: 'top-right'
       });
         resetsignupstate();
      }
 }




    return(
        <div className="flex justify-center items-center h-[90vh] ">
        <div className="card w-96 bg-primary text-primary-content">
         <div className="card-body">
           <h2 className="card-title flex justify-center mb-3 items-center text-3xl text-black">SignUp</h2>

           <input 
           onChange={handleonchange}
           value={signupdetails.email}
           name="email"
           autoComplete="one-time-code"
           type="text"
            placeholder="Email." 
            className="input text-black input-bordered bg-white input-primary w-full max-w-xs" />
           <input
           onChange={handleonchange}
           value={signupdetails.password}
           name="password"
           autoComplete="one-time-code"
            type="password"
             placeholder="Password.." 
           className="input text-black input-bordered bg-white input-primary w-full max-w-xs" />
           

           <input
           onChange={handleonchange}
           value={signupdetails.name}
           name="name"
           autoComplete="one-time-code"
            type="text"
             placeholder="Name.." 
           className="input text-black input-bordered bg-white input-primary w-full max-w-xs" />
           
         
           <details className="dropdown mb-4" id="usertypedropdown">
            <summary className="  btn">{(!signupdetails.userType) ? "User Type" : signupdetails.userType}</summary>
            <ul onClick={handleusertype} className="p-2 shadow menu text-white dropdown-content z-[1] bg-base-100 rounded-box w-52">

               <li><a>customer</a></li>
                <li><a>engineer</a></li>
                <li><a>admin</a></li>
             </ul>
            </details>
          

            <input
           onChange={handleonchange}
           value={signupdetails.clientName}
           name="clientName"
           autoComplete="one-time-code"
            type="text"
             placeholder="ClientName.." 
           className="input text-black input-bordered bg-white input-primary w-full max-w-xs" />
           

    

           
           <div className="card-actions justify-end ">
           <button onClick={onsubmit} className="btn mt-4 btn-warning w-full  font-bold text-xl hover:bg-yellow-400 transition-all ease-in-out duration-300">Submit</button>
             </div>
             <p className="text-xl text-white">
              Already have an account ? <Link className="text-yellow-200 font-semibold hover:text-black" to="/login">Login. </Link>
             </p>
        </div>
        </div>
        </div>
    );

}

export default Signup;