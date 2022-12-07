import React from 'react';
import { useState, useEffect } from 'react';
import jwt_decode from 'jwt-decode'
import './CustomerHome.css';

function CustomerHome(){

    const [ user, setUser ] = useState(sessionStorage.getItem("googleSession") || {});

    function handleSignOut(event) {
        sessionStorage.clear();
        setUser({});
        window.location.replace('/');
    }

    if ((sessionStorage.getItem("googleSession") === null)) {
        useEffect(() => {
            setTimeout(() => {
                sessionStorage.clear();
                window.location.replace("/")
            }, 2000)
          }, [])
        return(
            <div>
                <p>Restricted access, redirecting home...</p>
            </div>
        )
    }

    return (

        <div >
            <div class="homeTopContainer">
                <button className = "btnCustomerHome">Customer Home</button>
                <p class = "googleSession">
                    Hello, {jwt_decode(sessionStorage.getItem("googleSession")).given_name}
                </p>
                <button class="btnLogOut" onClick={ (e) => handleSignOut(e)}>Log Out</button>

                <a href="/EntreeItems">
                    <button className = "btnOne">Entrees</button>
                </a>
                <a href="/SideItems">
                    <button className = "btnTwo">Sides</button>
                </a>
                <a href="/DrinkItems">
                    <button className = "btnThree">Drinks</button>
                </a>
                <a href="/DessertItems">
                    <button className = "btnFour">Desserts</button>
                </a>

                <a href="/Checkout">
                    <button className = "btnFive">Checkout</button>
                </a>
            </div>
        </div>
    );
}

export default CustomerHome;