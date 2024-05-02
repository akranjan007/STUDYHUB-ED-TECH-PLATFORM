import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Homepage';
import { useState } from 'react';
import Signup from './components/core/LoginSignup/Signup';
import Login from './components/core/LoginSignup/Login';
import Navbar from './components/Common/Navbar';
import ForgotPassword from './pages/ForgotPassword';
import UpdatePassword from './pages/UpdatePassword';
import VerifyEmail from './pages/VerifyEmail';
import Logout from './pages/Logout';

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className='w-screen min-h-screen bg-richblack-900 flex flex-col items-center'>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="signup" element={<Signup setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="forget-password" element={<ForgotPassword/>}/>
        <Route path="update-password/:id" element={<UpdatePassword/>} />
        <Route path="verify-email" element={<VerifyEmail/>} />
        <Route path="dashboard/my-profile" element={<Logout/>} />
      </Routes>
    </div>
  );
}

export default App;
