import { Route, Routes } from "react-router-dom";

import Login from '../pages/auth/Login';
import Signup from "../pages/auth/Signup";
import Dasboard from "../pages/Dashboard";
import Home from "../pages/home/Home";
export default function MainRoutes(){
    return(
        <Routes>
            <Route path="/" element={<Home/>}></Route>
            <Route path="/login" element={<Login/>}></Route>
            <Route path="/signup" element={<Signup/>}></Route>
            <Route path="/dashboard" element={<Dasboard/>}></Route>
        </Routes>
    );
}