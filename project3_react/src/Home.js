import React, { useState, useEffect } from 'react';
import jwt_decode from 'jwt-decode'
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { gapi } from 'gapi-script';
import './Home.css';

import './App.css';
import {Link} from 'react-router-dom';

function Home(){

    const [ user, setUser ] = useState(sessionStorage.getItem("googleSession") || {});

    function handleCallbackResponse(response) {
        console.log("Encoded JWT ID token: " + response.credential);
        var userObject = jwt_decode(response.credential);
        console.log(userObject);
        sessionStorage.setItem("googleSession", response.credential);
        setUser(userObject);
        document.getElementById("signInDiv").hidden = true;
    }

    function handleSignOut(event) {
        sessionStorage.clear();
        setUser({});
        document.getElementById("signInDiv").hidden = false;
    }

    useEffect(() => {
        /* global google */
        google.accounts.id.initialize({
            client_id: '680528162035-ouv3mon475m5dm8jffsmhj4pf9t48th3.apps.googleusercontent.com',
            callback: handleCallbackResponse
        });

        var loggedInUser = sessionStorage.getItem("googleSession");
        console.log(loggedInUser);
        if (loggedInUser) {
            setUser(jwt_decode(loggedInUser));
            document.getElementById("signInDiv").hidden = true;
        }

        google.accounts.id.renderButton(
            document.getElementById("signInDiv"),
            { theme: "outline", size: "large" }
        );

       // google.accounts.id.prompt();
    }, []);

    return(
    <body class="homeTopContainer">
        <div>
        <center><img class="homeLogo" src="http://www.chick-fil-a.com/-/media/images/cfacom/default-images/chick-fil-a-logo-vector.ashx" alt="Chick-fil-A logo"/></center>
        </div>

        <div>
            <Link activeClassName="active" to={'/'}>
            <a >Home</a>
            </Link>

            <Link activeClassName="active" to={'/ManagerHome'}>
            <a>Manager Portal</a>
            </Link>

            <Link activeClassName="active" to={'/ServerHome'}>
            <a>Server Portal</a>
            </Link>

            <Link activeClassName="active" to={'/CustomerHome'}>
            <a>Customer Portal</a>
            </Link>
            </div> 

        <div>
            
            <img class="h-64 absolute top-50 right-0"src="https://d1fd34dzzl09j.cloudfront.net/Images/CFACOM/Stories%20Images/2019/07/Steve%20robinson/cows.jpg?h=960&w=1440&la=en"/>
        
            <form action="/ServerHome" method="POST">

                <div class="form-group mt-5">
                    <label for="employee_id">Employee ID</label>
                    <input type="number" class="form-control border-gray border-2 w-60" name="employee_id"></input>
                </div>

                <div class="form-group">
                    <label for="password" class="mx-3">Password</label>
                    <input type="password" class="form-control border-gray border-2 w-60 px-8" name="password"></input>
                </div>

                <button type="submit" class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full my-3">Login</button>
            </form>
        </div>

        <div id="signInDiv"></div>
        { Object.keys(user).length != 0 && 
            <div>
                <button onClick={ (e) => handleSignOut(e)}>Sign Out</button>
                <img src={user.picture}></img>
                <h3>{user.name}</h3>
                {console.log(user)}
            </div>
        }
        


        
    </body>
    );
}

export default Home;

