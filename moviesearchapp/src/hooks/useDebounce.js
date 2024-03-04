function useDebounce(callback , delay=1000){
    let timerid;
     return (...args)=>{
          clearTimeout(timerid);
           timerid =  setTimeout(()=>{
              callback(...args);
            },delay);
     }
}

export default useDebounce;