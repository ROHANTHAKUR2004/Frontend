function Login(){

    return(
        <div className="flex justify-center items-center h-[90vh] ">
        <div className="card w-96 bg-primary text-primary-content">
         <div className="card-body">
           <h2 className="card-title flex justify-center mb-3 items-center text-3xl text-black">Login</h2>
           <input type="text" placeholder="User id.." className="input text-black input-bordered bg-white input-primary w-full max-w-xs" />
           <input type="password" placeholder="Password.." className="input text-black input-bordered bg-white input-primary w-full max-w-xs" />
           <div className="card-actions justify-end ">
            <button className="btn mt-4 btn-warning w-full  font-bold text-xl">Submit</button>
          </div>
        </div>
        </div>
        </div>
    );

}

export default Login;