import { useEffect, useState } from "react";
import MovieCard from "../components/Moviecard/MovieCard";
import './Home.css';
import { searchmovie } from "../Apis/omdb";
import axios from "axios";
function Homes(){

    const[movielist , setmovielist] = useState([]);
  
   async function downloaddefaultmovies(...args){
    const urls = args.map((name) => searchmovie(name));

        const response = await axios.all(urls.map(url => axios.get(url)));
        const movies  = response.map((movieResponse) => movieResponse.data.Search)
        setmovielist( [].concat(...movies));
    }

    useEffect(()=>{
         downloaddefaultmovies('money ','avengers');
        
    },[]);
      
    return(
        <div className="movie-card-wrapper">
         
         {movielist.length > 0 &&  movielist.map(movie => <MovieCard  
         
         key = {movie.imdbID}
         {...movie}
         
         
         />)}


        </div>
    )
}

export default Homes;