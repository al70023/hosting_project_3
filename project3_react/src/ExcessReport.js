import React from 'react';
import { useReducer, useEffect, useState, useContext, Fragment } from 'react';
import './ExcessReport.css';
import {Link} from 'react-router-dom';

function ExcessReport() {

    const [ExcessItemsData, setExcessItemsData] = useState([]);
    const [addFormData, setAddFormData] = useState({
        date: ''
    })

    const handleAddFormChange = (event) => {
        event.preventDefault();

        // Will get the name attribute for each of the inputs in the form and assign it to fieldName
        const fieldName = event.target.getAttribute('name');
        
        // Will get the actual value that the user inputted
        const fieldValue = event.target.value;

        // Make a copy of the form data
        const newFormData = {...addFormData};
        newFormData[fieldName] = fieldValue;

        setAddFormData(newFormData);
    }
    const handleAddFormSubmit = (event) => {
        event.preventDefault();

        // Assign the values from the form to a new period instance
        const newPeriod = {
            date: addFormData.date
            
        };

        // Specfifies what kind of request it is
        const requestOptions = {
            method: 'POST',             // POST = insert request
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(newPeriod)          // body = info for the inventory to add (from newPeriod instance)
        }

        // Add the new inventory into the table
        fetch('https://node-deployment-jaq0.onrender.com/ExcessReport', requestOptions)
            .then(res => res.json())
            //.then(window.location.reload('false'))
            .then(json => setExcessItemsData(json));             
    }




    const fetchExcessItems = () => {
        fetch('https://node-deployment-jaq0.onrender.com/ExcessReport')
            .then(res => res.json())
            .then(json => setExcessItemsData(json))
    }

    useEffect(() => {
        fetchExcessItems();
    }, []);



    return (
        <div className="">
             <button className = "btnExcessReport">Excess Report</button>

            <div>
            <Link activeClassName="active" to={'/ManagerHome'}>
            <a>
                <button className = "backExcessButton">Back</button>
            </a>
            </Link>
            </div>

            <form onSubmit={handleAddFormSubmit}>
                    <input 
                        class="border-gray border-2 w-60"
                        type="text"
                        name="date"
                        required="required"
                        placeholder="Enter date... (MM/DD/YYYY)"
                        onChange={handleAddFormChange}
                    />

                    
                    <button type="submit" class="addInventoryButton">Submit time period</button>
                </form>

            <div class="w-full bg-blue-100 mt-10">
                <form>
                    <table className='ExcessItemTable' class="table-auto w-full shadow-md rounded border-separate border-spacing-y-4">
                        <thead>
                            <tr>
                                {/* Table Column Headers */}
                                <th>ID</th>
                                <th>Name</th>
                                <th>Storage Capacity</th>
                                <th>In storage</th>
                                
                                
                            </tr>
                        </thead>
                        <tbody>
                            {ExcessItemsData.map((ExcessItem) => (  
                                <tr>
                                    <td name="ID">{ExcessItem.inventory_id}</td>
                                    <td name="name">{ExcessItem.inventory_name}</td>
                                    <td name="cap">{ExcessItem.start_quantity}</td>
                                    <td name="is">{ExcessItem.current_quantity}</td>
                                    
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </form>



            </div>

            

        </div>
    );
}

export default ExcessReport;
