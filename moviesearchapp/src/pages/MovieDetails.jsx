import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { searchmoviebyid } from "../Apis/omdb";
import MovieCard from "../components/Moviecard/MovieCard";
import './Moviedetails.css';
import { Rating } from "@smastrom/react-rating";
import '@smastrom/react-rating/style.css';
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
    },[id]);

    return(
        
        <div className="movie-details-wrapper">
            
            {movie && <MovieCard 
                     Title={movie.Title}
                     Year={movie.Year}
                     Type={movie.Type}
                     Poster={movie.Poster}
                     id={movie.imdbID}
            />
            }
            
            {movie && <div className="movie-details"> 

                  <div>
                    Plot: {movie.Plot}
                  </div>
                  <div>
                    Actors: {movie.Actors}
                  </div>
                  <div>
                    Genre: {movie.Genre.split(',').map((genre)=>{
                        return <span className="genre"
                        key={genre}>{genre}</span>
                    })}
                  </div>
                  <div>
                    <Rating 
                    style={{maxWidth:200}}
                    items={10} 
                    value={Math.floor(movie.imdbRating)}
                    
                    />
                  </div>
            
            
            
             </div>}
        </div>
    )

}

export default MovieDetails;