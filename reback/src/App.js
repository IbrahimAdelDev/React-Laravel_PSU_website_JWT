import React from 'react';
import { BrowserRouter, Routes, Route} from "react-router-dom";
import { ScaleLoader } from 'react-spinners';
import { useEffect, useState } from 'react';


import Log from './Log';
import Dashbord from './Dashbord';
// import LogNavbar from './LogNavbar';
import Signup from './Signup';
// import Navbar from './Navbar';
import Home from './Home';
import Notfound from './Notfound';
import Library from './Library';
import './App.css'

const App = () => {

  const [loading, setLoding] = useState(false);

  useEffect(() => {
    setLoding(true);
    setTimeout(() => {
      setLoding(false);
    }, 2000);
  }, [])
  

  return (
    <>
      <BrowserRouter>
        {/* <LogNavbar/> */}
        {
          loading ? 
          <div className='preloaderr'>
            <ScaleLoader color={'white'} loading={loading} height={70} margin={10}/>
          </div>
          :
          <>
            <Routes>
              <Route path='/' element={<Home/>}/>
              <Route path='/login' element={<Log/>}/>
              <Route path='/signup' element={<Signup/>}/>
              <Route path='/dashbord' element={<Dashbord/>}/>
              <Route path='/library' element={<Library/>}/>
              <Route path='*' element={<Notfound/>}/>
            </Routes>
          </>
        }
      </BrowserRouter>
      {/* <Log/> */}
    </>
  )
}

export default App
