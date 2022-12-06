import React from 'react';
import './ServerHome.css';
<<<<<<< HEAD
=======
import './CustomerHome.css'
>>>>>>> 9b095193796f40572fcc295945feb5869f1fe4f4

function CustomerHome(){
    return (

        <div >
            <div class="homeTopContainer">
                <button className = "btnCustomerHome">Customer Home</button>
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