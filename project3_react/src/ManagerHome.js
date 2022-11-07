import React from 'react';
import {Link} from 'react-router-dom';
//import './ManagerHome.css';

function ManagerHome(){
    return(
    <div >
        <div class="homeTopContainer">
            <h1>
                Manager Home
            </h1>
        <p>This is the landing page for managers.</p>
        </div>
        <div>
        <Link activeClassName="active" to={'/MenuItems'}>
        <a>View Menu Items</a>
        </Link>
        </div> 
    </div>
    );
}

export default ManagerHome;