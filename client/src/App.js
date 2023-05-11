import './App.css';
import { Route, Routes, useLocation } from 'react-router-dom';
import { LandingPage, Form, Home, Details} from "./views/index"
import NavBar from "./components/navBar/NavBar"
import axios from "axios"
axios.defaults.baseURL= "https://api-countries-xj9n.onrender.com"

function App() {
  const location = useLocation()
  return (
    <div className="App">
      {location.pathname !== "/" && <NavBar/>}
      <Routes>
        <Route path='/' element= {<LandingPage/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/form' element={<Form/>}/>
        <Route path='/details/:id' element={<Details/>} />
        {/* <Route path=':error' element={<Error404/>}/> Crear view de error*/} 
      </Routes>
    </div>
  );
}

export default App;
