import './Navbar.css';

function Navbar(){

    return(
        <div className="navbar-wrapper">
            <div>Movie Base</div>
            <div className="search-bar">

                <input
                    type="text"
                    placeholder='Searh Movie of ur interset....'
                />
                </div>
                <div>
                    theme
                </div>
            

        </div>

    )

}

export default Navbar;