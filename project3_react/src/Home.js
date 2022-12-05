import React, { useState, useEffect } from 'react';
import jwt_decode from 'jwt-decode'
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { gapi } from 'gapi-script';
//import './Home.css';

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
        <div>
            <div class="homeTopContainer">
        
            <p class="text-lg mt-9">Welcome to Chick-fil-A!</p>
            <img class="mx-auto mt-24"src="https://upload.wikimedia.org/wikipedia/commons/0/02/Chick-fil-A_Logo.svg"/>
        
            <form action="/ServerHome" method="POST">

                <div class="form-group">
                    <label for="employee_id">Employee ID</label>
                    <input type="number" class="form-control" name="employee_id"></input>
                </div>

                <div class="form-group">
                    <label for="password">Password</label>
                    <input type="password" class="form-control" name="password"></input>
                </div>

                <button type="submit">Login</button>
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
        


        
    </div>
    );
}

export default Home;

