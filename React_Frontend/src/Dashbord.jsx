import React from 'react'
import { useState , useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'
import logo from './images/logo_uni.png';

import "./Dashbord.css";
import "./LogNavbar.css";


const Dashbord = () => {

    const navigate = useNavigate();

    const[username,setName] = useState(" ");
    const[useremail, setEmail] = useState(" ");
    const[userid, setId] = useState(" ");
    const[useryearofstudy, setYear] = useState(" ");
    const[usergpa, setGPA] = useState(" ");
    const[userdeptid, setDept_id] = useState(" ");
    const[userbirthdate, setDate] = useState(" ");
    const[usergender, setGender] = useState(" ");
    const[usercredits, setCredits] = useState(" ");
    var urll='/library?data=';
    var durl='/dashbord?data=';


    const save = () => {
        var url = "http://localhost:8000/api/userloginnn";
        fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            credentials: 'include',
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            if(data.message !== 'success'){
                navigate('/');
            }

            if (data) {
                setName(data.user.name);
                setEmail(data.user.email);
                setId(data.user.id);
                setDept_id(data.user.dept_id);
                setGPA(data.user.GPA);
                setDate(data.user.birth_date);
                setGender(data.user.gender);
                setYear(data.user.years_of_study);
                setCredits(data.user.credits);
            } else {
                alert("TRY AGAIN!");
            }
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
            alert("Error occurred: " + error.message);
        });
    };

    useEffect(() => {
        save(); 
    }, []); 

    const update = (event) => {
        event.preventDefault();

        var email = useremail;
        var id = userid;
        var credits = usercredits;
        var gender = usergender;
        var dept_id = userdeptid;
        var years_of_study = useryearofstudy;
        var birth_date = userbirthdate;
        var name = username;
        var GPA = usergpa;

        let uurrll = "http://localhost:8000/api/userupdate/";
        uurrll=uurrll+userid;
        console.log(uurrll);


        let item = {email, id, credits, gender, dept_id, years_of_study, birth_date, name, GPA}

        fetch(uurrll,{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                "Accept":"application/json"
            },
            credentials: 'include',
            body: JSON.stringify(item)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            console.log(response);
            return response.json();
        })
        .then(data => {
            console.log(data);

            if (data) {
                setName(data.user.name);
                setEmail(data.user.email);
                setId(data.user.id);
                setDept_id(data.user.dept_id);
                setGPA(data.user.GPA);
                setDate(data.user.birth_date);
                setGender(data.user.gender);
                setYear(data.user.years_of_study);
                setCredits(data.user.credits);
            } else {
                alert("TRY AGAIN!");
            }
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
            alert("Error occurred: " + error.message);
        });
    }

  return (
    <>
        <nav className="col-12 navbar navbar-expand-lg mynav">
            <div className="container-fluid container navparent">
                <div className='col-3 nlogo '>
                    <Link className="navbar-brand" to="/">
                        <div className="nlogo">
                            <img className='logo' src={logo} alt="uni" width={50} />
                            <div className='nav-me-text' to="/">Port Said<br/>University</div>
                        </div>
                    </Link>
                </div>
                <div className="col-9 row " id="navbarSupportedContent">

                <div className="col-3 linkparent">
                        <Link className="nav-link link" to={durl}>Dashboard</Link>
                    </div>
                    <div className="col-3 linkparent">
                        <Link className="nav-link link" to={urll}>Library</Link>
                    </div>
                    <div className="col-3 linkparent">
                        <Link className="nav-link link" to="/universitycity">University City</Link>
                    </div>
                    <div className='col-3 linkparent'>
                            <Link className="nav-link link" to="/">Logout</Link>
                    </div>
                </div>
            </div>
        </nav>


        <div className="dashparent">
        <div className="formdashparent flx col-10">
            <form className="col-12 formdash" onSubmit={update}>
                <div className='flx col-12 row'>
                    <div className="col-lg-4 col-md-6 col-sm-12 pading">
                        <div className="mb-3">
                            <label className="form-label">Student ID</label>
                            <input type="text"
                            value={userid}
                            onChange={(e) => setId(e.target.value || "")}
                            className="form-control inputnotbyttom" readOnly required/>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Department Name</label>
                            <input type="text"
                            value={userdeptid}
                            onChange={(e) => setDept_id(e.target.value || "")}
                            className="form-control inputnotbyttom" required/>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">GPA</label>
                            <input type="text" 
                            value={usergpa}
                            onChange={(e) => setGPA(e.target.value || "")}
                            className="form-control" 
                            id="exampleInputPassword1" required/>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6 col-sm-12 pading">
                        <div className="mb-3">
                            <label className="form-label">Full Name</label>
                            <input 
                            type="text" 
                            value={username}
                            onChange={(e) => setName(e.target.value || "")}
                            className="form-control inputnotbyttom" required/>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Birth Date</label>
                            <input 
                            type="date" 
                            value={userbirthdate}
                            onChange={(e) => setDate(e.target.value || "")}
                            className="form-control inputnotbyttom" required/>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Gender</label>
                            <input 
                            type="text"
                            value={usergender}
                            onChange={(e) => setGender(e.target.value || "")}
                            className="form-control" id="exampleInputEmail1" 
                            aria-describedby="emailHelp" required/>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6 col-sm-12 pading">
                        <div className="mb-3">
                            <label className="form-label">Email address</label>
                            <input 
                            type="email" 
                            value={useremail}
                            onChange={(e) => setEmail(e.target.value || "")}
                            className="form-control inputnotbyttom" readOnly required/>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Year of study</label>
                            <input type="text" 
                            value={useryearofstudy}
                            onChange={(e) => setYear(e.target.value || "")}
                            className="form-control inputnotbyttom" required/>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Credits</label>
                            <input 
                            type="text" 
                            value={usercredits}
                            onChange={(e) => setCredits(e.target.value || "")}
                            className="form-control" required/>
                        </div>
                    </div>
                </div>
                <button 
                            type="submit" 
                            className="btn btn-primary">Save</button>
            </form>
        </div>
        </div>
    </>
  )
}

export default Dashbord
