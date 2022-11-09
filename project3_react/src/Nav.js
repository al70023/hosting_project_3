import React, {useState} from 'react';
import './App.css';
import {Link} from 'react-router-dom';

function Nav(){
    return(
        <div className="topnav" class="container mx-auto bg-red-500 h-50 text-xl">
        
        <nav>
            <div>
            <Link activeClassName="active" to={'/'}>
            <a >Home</a>
            </Link>
            </div>  

            <div>
            <Link activeClassName="active" to={'/ManagerHome'}>
            <a>Manager Portal</a>
            </Link>
            </div> 

            <div>
            <Link activeClassName="active" to={'/ServerHome'}>
            <a>Server Portal</a>
            </Link>
            </div> 

            <div>
            <Link activeClassName="active" to={'/CustomerHome'}>
            <a>Customer Portal</a>
            </Link>
            </div> 
            
        </nav>

        </div>
    );
}

export default Nav