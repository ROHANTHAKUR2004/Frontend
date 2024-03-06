import Navbar from "./components/Navbar";
import Mainroutes from "./routes/Mainroutes";
import './App.css'
import MovieCard from "./components/Moviecard/MovieCard";

import ThemeContext from "./context/ThemeContext";
import { useState } from "react";
function App() {
  //console.log(import.meta.env.VITE_API_KEY);

  const [theme, settheme] = useState('dark');
  return (
    <> 
    <ThemeContext.Provider value={{theme, settheme}}>
        <div className="app-wrapper" data-theme={theme}>
           <Navbar/>
           <Mainroutes/>

         </div>

    </ThemeContext.Provider>
 
    
     </>
   
  )
}

export default App
