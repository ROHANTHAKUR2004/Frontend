import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { searchmoviebyid } from "../Apis/omdb";
import MovieCard from "../components/Moviecard/MovieCard";

function MovieDetails(){

    const[movie,setmovie] = useState(null);
    const { id } = useParams();

     async function downloadmovie(){
        const response = await axios.get(searchmoviebyid(id)); 
        //console.log(response.data);
        setmovie(response.data);
    }

    useEffect(() => {
          downloadmovie();
    },[]);

    return(
        
        <>
            {movie && <MovieCard 
                     Title={movie.Title}
                     Year={movie.Year}
                     Type={movie.Type}
                     Poster={movie.Poster}
            />
            }
        </>
    )

}

export default MovieDetails;