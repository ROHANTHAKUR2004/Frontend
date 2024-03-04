import { useEffect, useState } from "react";
import { searchmovie } from "../Apis/omdb";
import axios from "axios";

function useMovielist(...args){
    const[movielist , setmovielist] = useState([]);
  
   async function downloaddefaultmovies(...args){
    try{
        const urls = args.map((name) => searchmovie(name));

        const response = await axios.all(urls.map(url => axios.get(url)));
        if(response[0].data.Error){
            setmovielist( []);
        }else{
            const movies  = response.map((movieResponse) => movieResponse.data.Search)
            setmovielist( [].concat(...movies));
    
        }
        
    }catch(error){
        console.log("errors")
    }
    
    }

    useEffect(()=>{
         downloaddefaultmovies(...args);
        
    },[...args]);
      

    return {movielist};
}

export default useMovielist;