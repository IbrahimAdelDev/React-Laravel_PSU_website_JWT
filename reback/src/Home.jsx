import React from 'react'


import LogNavbar from './LogNavbar'
// import './Home.css'
import "./Log.css";


const Home = () => {
  return (
    <div className='dady'>
        <LogNavbar/>
        <div className='hipar'>
            <div className='hi'>
                <h1 id='h1'>Port Said University</h1>
            </div>
            <div className='bottomim'>
                <h2 id='h2'>Events</h2>
            </div>
        </div>
    </div>
  )
}

export default Home
