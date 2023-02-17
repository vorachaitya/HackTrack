import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Navb from './components/Navb';
import styles from "./index.css"
import { Notifications } from 'react-push-notification';
import Notify from './components/Notify';
import Body from './components/404notFound/Body';

// import Admin from './components/Admin';
// import Timeline from './components/Timeline';
// import Video from './components/Video';

function App() {
  return (
    <>
    <Body/>
      <Notifications />
      <Notify/>
    <BrowserRouter>
     <Navb/>
     {/* <Home/> */}
        <Routes>
          <Route exact path='/' element={<Home />} />
          {/* <Route path="/signup" exact element={<Signup />} />
                
          <Route path="/login" exact element={<Login />} /> */}
          {/* <Route exact path='/video' element={<Video />} /> */}

        </Routes>
  
    </BrowserRouter>
    </>
  );
}

export default App;
