import { useRef, useState } from 'react';
import './Navbar.css';
import useMovielist from '../hooks/useMovielist';
import useDebounce from '../hooks/useDebounce';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon } from '@fortawesome/free-solid-svg-icons';

function Navbar(){

    const resultlistref = useRef(null);
    const[searchterm, setsearchterm] = useState("");
    const {movielist} = useMovielist(searchterm);
    const navigator = useNavigate();


    function handleautocompleteclick(e, movieImdbId){
          navigator(`/movie/${movieImdbId}`)  
          //console.log(movieImdbId);
    }


    return(
        <div className="navbar-wrapper">
            <div className='movie-base-title'> <Link to={'/'}>Movie Base</Link></div>
            <div className="search-bar">

                <input
                    id='movie-search-input'
                    type="text"
                    onFocus={()=> {
                        resultlistref.current.style.display = 'block';
                    }}
                    onBlur={()=>{
                        resultlistref.current.style.display = 'none';
                    }}
                    onChange={useDebounce((e)=>{
                        setsearchterm(e.target.value);
                    })}
                    placeholder='Searh for Movies....' 
                />
                <div id='result-list' ref={resultlistref}>
                    <div  className='autocomplete-result'>Searching Movies...{searchterm}</div>
                    {movielist.length > 0 && movielist.map(movie => (
                     //<Link key={movie.imdbID} to={`/movie/${movie.imdbID}`}>
                    <div 
                    onMouseDown={(e) => handleautocompleteclick(e, movie.imdbID)}
                     key={movie.imdbID} 
                     className='autocomplete-result'>
                        {movie.Title}
                        </div>
                       // </Link>
                        ))}
                 
                    
                </div>
                </div>
                <div>
                    <FontAwesomeIcon icon={faMoon}/>
                </div>
            

        </div>

    )

}

export default Navbar;