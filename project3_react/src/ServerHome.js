import React from 'react';
import './ServerHome.css';


function ServerHome() {

    function handleSignOut(event) {
        sessionStorage.clear();
        window.location.replace('/');
    }

    return (

        <div >
            <div class="homeTopContainer">
                <p class = "employeeSession">
                    Employee: {JSON.parse(sessionStorage.getItem("employeeSession")).employee_name}
                    <br/>
                    ID: {JSON.parse(sessionStorage.getItem("employeeSession")).employee_id}
                </p>

                {JSON.parse(sessionStorage.getItem("employeeSession")).position === 2 ?
                    (<div>
                    <a href="/ManagerHome">
                        <button class ="btnManagerPortal">Manager Portal</button> 
                    </a>
                    <button class ="btnLogOutManager" onClick={ (e) => handleSignOut(e)}>Log Out</button>
                    </div>) : (
                    <button class ="btnLogOutt" onClick={ (e) => handleSignOut(e)}>Log Out</button>
                    )
                }  

                <button className = "btnServerHome">Server Home </button>

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