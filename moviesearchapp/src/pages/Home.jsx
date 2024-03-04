import MovieCard from "../components/Moviecard/MovieCard";
import './Home.css';

import useMovielist from "../hooks/useMovielist";
function Homes(){

    const {movielist} = useMovielist('money', 'harry');
      
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