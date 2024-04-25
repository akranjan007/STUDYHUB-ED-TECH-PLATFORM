import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Homepage';
import { useState } from 'react';
import Signup from './components/core/LoginSignup/Signup';
import Login from './components/core/LoginSignup/Login';
import Navbar from './components/Common/Navbar';

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className='w-screen min-h-screen bg-richblack-900 flex flex-col '>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/signup" element={<Signup setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
      </Routes>
    </div>
  );
}

export default App;
