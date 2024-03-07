function Signup(){

    return(
        <div className="flex justify-center items-center h-[90vh] ">
        <div className="card w-96 bg-primary text-primary-content">
         <div className="card-body">
           <h2 className="card-title flex justify-center mb-3 items-center text-3xl text-black">Signup</h2>
           <input type="text" placeholder="User id.." className="input text-black input-bordered bg-white input-primary w-full max-w-xs" />
           <input type="email" placeholder="Email.." className="input text-black input-bordered bg-white input-primary w-full max-w-xs" />
           <input type="password" placeholder="Password.." className="input text-black input-bordered bg-white input-primary w-full max-w-xs" />
           <div className="card-actions flex align-start ">
           <details className="dropdown mb-4">
                <summary className="  btn">User Type</summary>
                <ul className="p-2 shadow menu text-white dropdown-content z-[1] bg-base-100 rounded-box w-52">
                  <li><a>Customer</a></li>
                  <li><a>Engineer</a></li>
                </ul>
            </details>
            <button className="btn mt-4 btn-warning w-full font-bold text-xl">Submit</button>
            
          
          </div>
        </div>
        </div>
        </div>
    );

}

export default Signup;