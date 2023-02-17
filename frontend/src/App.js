import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home';
import Navb from './components/Navb';
import styles from "./index.css"
import { Notifications } from 'react-push-notification';
import Notify from './components/Notify';
import Body from './components/404notFound/Body';
import Admin from './components/Admin';
import Timeline from './components/Timeline';
import Video from './components/Video';
import Chat from './components/Chat';
import Signup from './components/Singup/index';
import Login from './components/Login/index';
import Main from './components/Main/index';

function App() {
  const user = localStorage.getItem("token");
  return (
    <>
    
      <Notifications />
      <Notify/>
    <BrowserRouter>
     

        <Navb />
        <Routes>

          {user && <Route path="/" exact element={<Home />} />}
          <Route path="/signup" exact element={<Signup />} />
          <Route path="/login" exact element={<Login />} />
          <Route path="/logout" exact element={<Main />} />
          <Route exact path='/timeline' element={<Timeline />} />
          <Route exact path='/chat' element={<Chat />} />
          <Route exact path='/video' element={<Video />} />
          <Route exact path='/admin' element={<Admin />} />
          <Route path="/" element={<Navigate replace to="/login" />} />
          <Route exact path='*' element={<Body/>} />




        </Routes>

      </BrowserRouter>
    </>
  );
}

export default App;
