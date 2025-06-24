import {BrowserRouter,Route, Routes} from "react-router-dom"
import Home from "./Home";
import Filter from "./Filter";
import Details from "./Details";
import SignUp from "./Signup";
import ScrollToTop from "./ScrollToTop";

function Routing(){
    return(
        
        <>
        <BrowserRouter>
        <ScrollToTop/>
        <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route  path="/filter" element={<Filter/>}/>
        <Route path="/details/:id" element={<Details />}/>
        <Route path="/signup" element={<SignUp/>}  />
        </Routes>
        </BrowserRouter>
        </>
        
    )
}

export default Routing