import React, { useState, useEffect } from 'react';
import jwt_decode from 'jwt-decode'
import './Home.css';

import './App.css';
import {json, Link} from 'react-router-dom';

function Home() {

    const [ user, setUser ] = useState(sessionStorage.getItem("googleSession") || {});

    useState(sessionStorage.getItem("employeeSession") || {});

    function handleCallbackResponse(response) {
        console.log("Encoded JWT ID token: " + response.credential);
        var userObject = jwt_decode(response.credential);
        console.log(userObject);
        sessionStorage.setItem("googleSession", response.credential);
        setUser(userObject);
        document.getElementById("signInDiv").hidden = true;
        window.location.replace('/CustomerHome');
    }

    function handleSignOut(event) {
        sessionStorage.clear();
        setUser({});
        document.getElementById("signInDiv").hidden = false;
    }

    // Data state variable for the data from the employee login
    const [loginFormData, setLoginFormData] = useState({
        employee_id: '',
        password: '',
    })
    // Handling changes to employee login form
    const handleLoginFormChange = (event) => {
        event.preventDefault();

        // Will get the name attribute for each of the inputs in the form and assign it to fieldName
        const fieldName = event.target.getAttribute('name');
        
        // Will get the actual value that the user inputted
        const fieldValue = event.target.value;

        // Make a copy of the form data
        const newFormData = {...loginFormData};
        newFormData[fieldName] = fieldValue;

        setLoginFormData(newFormData);
    }

    const handleEmployeeLogin = (event) => {
        event.preventDefault();

        // Assign the values from the form to a new instance
        const newEmployeeLogin = {
            employee_id: loginFormData.employee_id,
            password: loginFormData.password
        };

        // Specfifies what kind of request it is
        const requestOptions = {
            method: 'POST',             // POST = insert request
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(newEmployeeLogin)     
        }

        async function fetchLogin(requestOptions) {
            const response = await fetch('http://localhost:3001/employeeLogin/info', requestOptions);
            const data = await response.json();
            sessionStorage.setItem("employeeSession", JSON.stringify(data[0]));

            if (sessionStorage.getItem("employeeSession") === "undefined") { 
                alert("Invalid employee login. Please try again.");
            } else if (JSON.parse(sessionStorage.getItem("employeeSession")).position === 2) {
                window.location.replace('/ManagerHome');
            } else {
                window.location.replace('/ServerHome');
            }
        }
        fetchLogin(requestOptions);
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
        <center><img class="homeLogo" src="https://cloudfront-us-east-1.images.arcpublishing.com/gray/GTPSWOMZ3BDMTGK52CDFYJWWLI.jpg" alt="Chick-fil-A logo"/></center>
        </div>

        <center>
        <div class="employeeBox">
            Employee Login

            <form onSubmit={handleEmployeeLogin}>
                <div class="form-group mt-5">
                    <label for="employee_id" class = "mx-3">Employee ID</label>
                    <input type="number" style={{color:'black'}} class="form-control border-gray border-2 w-60" name="employee_id" onChange={handleLoginFormChange}></input>
                </div>

                <div class="form-group">
                <br></br>
                    <label for="password" class="mx-7">Password</label>
                    <input type="password" style={{color:'black'}} class="form-control border-gray border-2 w-60" name="password" onChange={handleLoginFormChange}></input>
                </div>
                <br></br>
                <button type="submit" class="bg-red-500 hover:bg-red-700 text- font-bold  px-10 rounded-full my-3">Login</button> 
            </form>           

        </div>

        <div class="customerBox">
           <div class = "customerText">Customer Login
           </div>
            <div class = "signInBox">
            <div id="signInDiv"></div>
            { Object.keys(user).length != 0 && 
                <div>
                    <h3>{user.name}</h3>
                    <button onClick={ (e) => handleSignOut(e)}>Sign Out</button>
                </div>
            }
            </div>

        </div>

        </center>

    </body>
    );
}

export default Home;

