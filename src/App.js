// import logo from './logo.svg';
import './App.css';
import Home from './Components/Home/Home';
// import { BrowserRouter, Route, Routes } from "react-router-dom"
import {BrowserRouter,Route,Routes} from "react-router-dom"
import Productcart from './Components/Productcart/Productcart';
// import Cart from './Components/Cart/Cart';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/prod' element={<Productcart/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
