import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Navb from './components/Navb';
import styles from "./index.css"
// import Admin from './components/Admin';
// import Timeline from './components/Timeline';
// import Video from './components/Video';

function App() {
  return (
    <>
    
    <BrowserRouter>
     <Navb/>
     {/* <Home/> */}
        <Routes>
          <Route exact path='/' element={<Home />} />
         
          {/* <Route exact path='/video' element={<Video />} /> */}

        </Routes>
  
    </BrowserRouter>
    </>
  );
}

export default App;
