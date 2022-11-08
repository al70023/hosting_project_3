import React from 'react';
//import './ServerHome.css';

function ServerHome() {
    return (
        <div >
            <div class="homeTopContainer">
                <h1>
                    Server Home
                </h1>
                <p>This is the landing page for servers.</p>
                <a href="/EntreeItems">
                    <button>Entrees</button>
                </a>
                <a href="/SideItems">
                    <button>Sides</button>
                </a>
                <a href="/DrinkItems">
                    <button>Drinks</button>
                </a>
                <a href="/DessertItems">
                    <button>Desserts</button>
                </a>
            </div>
        </div>
    );
}

export default ServerHome;