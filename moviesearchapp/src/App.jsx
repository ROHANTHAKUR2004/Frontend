import Navbar from "./components/Navbar";
import Mainroutes from "./routes/Mainroutes";
import './App.css'
import MovieCard from "./components/Moviecard/MovieCard";

function App() {
  console.log(import.meta.env.VITE_API_KEY);

  return (
    <> 
  <Navbar/>
  <Mainroutes/>
  
    
     </>
   
  )
}

export default App
