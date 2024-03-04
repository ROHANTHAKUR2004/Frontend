import { useRef, useState } from 'react';
import './Navbar.css';
import useMovielist from '../hooks/useMovielist';

function Navbar(){

    const resultlistref = useRef(null);
    const[searchterm, setsearchterm] = useState("");
    const {movielist} = useMovielist(!searchterm ? 'harry' : searchterm);


    return(
        <div className="navbar-wrapper">
            <div>Movie Base</div>
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
                    onChange={(e) =>{
                        setsearchterm(e.target.value);
                    }}
                    placeholder='Searh for Movies....' 
                />
                <div id='result-list' ref={resultlistref}>
                    <div  className='autocomplete-result'>Searching Movies...</div>
                    {movielist.length >0 && movielist.map(movie => <div key={movie.imdbID} className='autocomplete-result'>{movie.Title}</div>)}
                 
                    
                </div>
                </div>
                <div>
                    theme
                </div>
            

        </div>

    )

}

export default Navbar;