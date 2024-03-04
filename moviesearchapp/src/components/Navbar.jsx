import { useRef } from 'react';
import './Navbar.css';

function Navbar(){

    const resultlistref = useRef(null);


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
                    placeholder='Searh for Movies....' 
                />
                <div id='result-list' ref={resultlistref}>
                    <div className='autocomplete-result'>result 1</div>
                    <div className='autocomplete-result'>result 2</div>
                    <div className='autocomplete-result'>result 3</div>
                    
                    
                </div>
                </div>
                <div>
                    theme
                </div>
            

        </div>

    )

}

export default Navbar;