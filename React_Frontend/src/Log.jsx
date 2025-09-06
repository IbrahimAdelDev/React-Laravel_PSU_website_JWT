import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


import LogNavbar from './LogNavbar';
import "./Log.css";

const Log = () => {

    const[useremail, setEmail] = useState("");
    const[userpassword, setPassword] = useState("");
    const navigate = useNavigate();
    var url = '/dashbord?data=';


    const login = (event) => {
        event.preventDefault();

        var email = useremail;
        var password = userpassword;

        let item = {email, password}

        fetch("http://localhost:8000/api/usernewlogin",{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                "Accept":"application/json"
            },
            credentials: 'include',
            body: JSON.stringify(item)
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if(data.message){

                navigate('/dashbord');
            }
            else{
                alert(data.data);
            }
            
        })
    }
return (
    <>
        <LogNavbar/>
        <div className='col-12 row formrow'>
            <div className="col-3"></div>
            <div className="formparent col-6">
                <form onSubmit={login}>
                    <div className="mb-3">
                        <label className="form-label">Email address</label>
                        <input 
                            type="email" 
                            value={useremail}
                            onChange={(e) => setEmail(e.target.value)}
                            className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                            required/>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input 
                            type="password" 
                            value={userpassword}
                            onChange={(e) => setPassword(e.target.value)}
                            className="form-control" id="exampleInputPassword1"
                            required/>
                    </div>
                    <div className="buton">
                        <button 
                            type="submit" 
                            className="btn btn-primary">Login</button>
                    </div>
                </form>
            </div>
            <div className="col-3"></div>
        </div>
    </>
    )
}

export default Log

