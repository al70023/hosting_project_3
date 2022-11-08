import React from 'react';
//import './ServerHome.css';
import "./serverhome.css";


function ServerHome() {
    return (

        <div >
            <div class="homeTopContainer">
                <h1>
                    Server Home
                </h1>
                <p>Welcome to the Landing page!</p>
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

                <a href="Checkout">
                    <button className = "btnFive">Checkout</button>
                </a>
            </div>
        </div>
    );
}

export default ServerHome;