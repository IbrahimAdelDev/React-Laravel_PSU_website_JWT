import React from 'react'
import { useEffect , useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom'
import logo from './images/logo_uni.png';
// import logo from './images/logo_uni.png';

// import im1 from './images/algorithmdesign.jpg';
// import im2 from './images/computerprogramming.jpg';
// import im3 from './images/computerscience.jpg';
// import im4 from './images/introtopython.jpg';
// import im5 from './images/modernpowersystem.jpg';


// import Navbar from './Navbar'

import './Library.css'

const Library = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const dataString = searchParams.get('data');
    console.log(dataString);///////////////////////////////////important
    var urll='/library?data=';
    var durl='/dashbord?data=';
    const [books, setBooks] = useState([]);
    const [borrowedbooks, setBorrowedBooks] = useState([]);

    const showunborrow = () => {

        fetch('http://localhost:8000/api/librarybooknb',{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                "Accept":"application/json"
            },
            body: JSON.stringify()
        })
        .then(response => response.json())
        .then(data => {
            // console.log(data);
            // console.log(data.books)
            // console.log(data[0].title)
            if(data){
                // alert("success");
                setBooks(data);
            }
            else{
                alert("TRY AGAIN!");
            }
        })
    };

    const showborrow = () => {

        var url = 'http://localhost:8000/api/librarystubook/';
        url=url+dataString;
        fetch(url,{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                "Accept":"application/json"
            },
            body: JSON.stringify()
        })
        .then(response => response.json())
        .then(data => {
            // console.log(data);
            // console.log(data.books)
            // console.log(data[0].title)
            if(data){
                // alert("success");
                setBorrowedBooks(data);
            }
            else{
                alert("TRY AGAIN!");
            }
        })
    };

    const borrow = (id) => {
        // event.preventDefault();

        var stu_id=dataString;


        let item = {id, stu_id}

        fetch('http://localhost:8000/api/borrowbook',{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                "Accept":"application/json"
            },
            body: JSON.stringify(item)
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if(data){
                // alert("succ apdate");
                window.location.reload();
            }
            else{
                alert("error");
            }
            
        })
    };

    const unborrow = (id) => {
        // event.preventDefault();


        let item = {id}

        fetch('http://localhost:8000/api/unborrowbook',{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                "Accept":"application/json"
            },
            body: JSON.stringify(item)
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if(data){
                // alert("succ apdate");
                window.location.reload();
            }
            else{
                alert("error");
            }
            
        })
    }

    useEffect(() => {
        showunborrow(); 
        showborrow();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); 

    urll+=dataString;
    durl+=dataString;

  return (
    <div>
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
      <div className='libparent'>
        {/* <p>{dataFromLink}</p> */}
        <div className='container books'>
            <h1>Unborrowed</h1>
            {books.map((borrowedbook, index) => (
                <div className='onebook row' key={index}>
                    <h3 className='head1 bookelem col-6'>Book</h3>
                    <div className="bookelem imparent col-6">
                        <img src={require(`${borrowedbook.posterurl}`)} alt={borrowedbook.title} title={borrowedbook.title} style={{height:"200px"}}/>
                    </div>
                    <hr class="hrw"></hr>
                    <h3 className='head1 bookelem col-6'>Title</h3>
                    <div className="bookelem col-6">
                        <h3>{borrowedbook.title}</h3>
                    </div>
                    <hr class="hrw"></hr>
                    <h3 className='head1 bookelem col-6'>Author</h3>
                    <div className="bookelem col-6">
                        <h3>{borrowedbook.author}</h3>
                    </div>
                    <hr class="hrw"></hr>
                    <h3 className='head1 bookelem col-6'>Category</h3>
                    <div className="bookelem col-6">
                        <h3>{borrowedbook.category_name}</h3>
                    </div>
                    
                    <div className="bookelem col-12">
                        <button 
                            className="btn btnn btn-primary"
                            onClick={() => borrow(borrowedbook.id)}>Borrow</button>
                    </div>
                    {/* يمكنك إضافة المزيد من العناصر حسب حاجتك */}
                </div>
            ))}
        </div>
        <div className='container books'>
            <h1>Borrowed</h1>
            {borrowedbooks.map((unborrowedbook, index) => (
                <div className='onebook row' key={index}>
                    <h3 className='head1 bookelem col-6'>Book</h3>
                    <div className="bookelem imparent col-6">
                        <img src={require(`${unborrowedbook.posterurl}`)}alt={unborrowedbook.title} title={unborrowedbook.title} style={{height:"200px"}}/>
                    </div>
                    <hr class="hrw"></hr>
                    <h3 className='head1 bookelem col-6'>Title</h3>
                    <div className="bookelem col-6">
                        <h3>{unborrowedbook.title}</h3>
                    </div>
                    <hr class="hrw"></hr>
                    <h3 className='head1 bookelem col-6'>Author</h3>
                    <div className="bookelem col-6">
                        <h3>{unborrowedbook.author}</h3>
                    </div>
                    <hr class="hrw"></hr>
                    <h3 className='head1 bookelem col-6'>Category</h3>
                    <div className="bookelem col-6">
                        <h3>{unborrowedbook.category_name}</h3>
                    </div>
                    
                    <div className="bookelem col-12">
                        <button 
                            className="btn btnn btn-primary"
                            onClick={() => unborrow(unborrowedbook.id)}>Unborrow</button>
                    </div>
                    {/* يمكنك إضافة المزيد من العناصر حسب حاجتك */}
                </div>
            ))}
        </div>

      </div>
    </div>
  )
}

export default Library
