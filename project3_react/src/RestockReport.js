import React from 'react';
import { useReducer, useEffect, useState, useContext, Fragment } from 'react';
import {Link} from 'react-router-dom';
import './RestockReport.css';

function RestockReport() {

    const [restockItemsData, setRestockItemsData] = useState([]);

    const fetchRestockItems = () => {
        fetch('http://localhost:3001/RestockReport')
            .then(res => res.json())
            .then(json => setRestockItemsData(json))
    }

    useEffect(() => {
        fetchRestockItems();
    }, []);

    const handleAddFormSubmit = (event) => {
        event.preventDefault();

        // Assign the values from the form to a new period instance


        // Specfifies what kind of request it is
        const requestOptions = {
            method: 'POST',             // POST = insert request
            headers: {"Content-Type": "application/json"}
                      
        }

        // Add the new inventory into the table
        fetch('http://localhost:3001/RestockReport/Restock', requestOptions)
            .then(res => res.json())
            .then(json => setRestockItemsData(json))
            .then(window.location.reload());

    }

    return (
        <div className="">


            <button className = "btnRestock">Restock</button>
            <form onSubmit={handleAddFormSubmit}>
                
                <button type="submit" class="btnRestockItems">Restock All Items</button>
                
            </form>

            <div>
            <Link activeClassName="active" to={'/ManagerHome'}>
            <a>
                <button className = "backButton">Back</button>
            </a>
            </Link>
            </div>

            <br></br>

            <div class="w-full bg-blue-100">
                <form>
                    <table className='RestockItemTable' class="table-auto w-full shadow-md rounded border-separate border-spacing-y-4">
                        <thead>
                            <tr>
                                {/* Table Column Headers */}
                                <th>Name</th>
                                <th>Quantity</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {restockItemsData.map((restockItem) => (  
                                <tr>
                                    <td name="name">{restockItem.inventory_name}</td>
                                    <td name="quantity">{restockItem.current_quantity}</td>
                                    
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </form>



            </div>

            

        </div>
    );
}

export default RestockReport;










