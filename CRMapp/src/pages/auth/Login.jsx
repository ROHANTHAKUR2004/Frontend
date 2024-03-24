import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { login } from '../../Redux/Slices/AuthSlice';
function Login(){

  const dispatch = useDispatch();
  const navigate =  useNavigate();

  const [logindetails, setlogindetails] = useState({
    email : '',
    password: '',
  });

function handleonchange(e){

  const {name, value} = e.target;
  setlogindetails({
    ...logindetails,
    [name] : value
  });

}

function resetloginstate(){
  setlogindetails({
    email : '',
    password: '',
  });
}

  async function onsubmit(){
    if(!logindetails.email || !logindetails.password) return;
    console.log("calling" , logindetails);
     const response =  await dispatch(login(logindetails));
     if(response.payload) navigate("/");
     else resetloginstate();
 }




    return(
        <div className="flex justify-center items-center h-[90vh] ">
        <div className="card w-96 bg-primary text-primary-content">
         <div className="card-body">
           <h2 className="card-title flex justify-center mb-3 items-center text-3xl text-black">Login</h2>
           <input 
           onChange={handleonchange}
           value={logindetails.email}
           name="email"
           autoComplete="one-time-code"
           type="text"
            placeholder="Email." 
            className="input text-black input-bordered bg-white input-primary w-full max-w-xs" />
           <input
           onChange={handleonchange}
           value={logindetails.password}
           name="password"
           autoComplete="one-time-code"
            type="password"
             placeholder="Password.." 
             className="input text-black input-bordered bg-white input-primary w-full max-w-xs" />
           <div className="card-actions justify-end ">
            <button onClick={onsubmit} className="btn mt-4 btn-warning w-full  font-bold text-xl">Submit</button>
             </div>
        </div>
        </div>
        </div>
    );

}

export default Login;