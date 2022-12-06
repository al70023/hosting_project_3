import React from 'react';
import { useReducer, useEffect, useState, useContext, Fragment } from 'react';
import './SalesReport.css';

function SalesReport() {

    const [SalesItemsData, setSalesItemsData] = useState([]);
    const [addFormData, setAddFormData] = useState({
        start_date: '',
        end_date: ''
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
            start_date: addFormData.start_date,
            end_date: addFormData.end_date
        };

        // Specfifies what kind of request it is
        const requestOptions = {
            method: 'POST',             // POST = insert request
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(newPeriod)          // body = info for the inventory to add (from newPeriod instance)
        }

        // Add the new inventory into the table
        fetch('http://localhost:3001/SalesReport', requestOptions)
            .then(res => res.json())
            //.then(window.location.reload('false'))
            .then(json => setSalesItemsData(json));             
    }





    const fetchSalesItems = () => {
        fetch('http://localhost:3001/SalesReport')
            .then(res => res.json())
            .then(json => setSalesItemsData(json))
    }

    useEffect(() => {
        fetchSalesItems();
    }, []);

    return (
        <div className="">
            <button className = "btnSalesReport">Sales Report</button>
            <form onSubmit={handleAddFormSubmit}>
                    <input 
                        class="border-gray border-2 w-60"
                        type="text"
                        name="start_date"
                        required="required"
                        placeholder="Enter start date... (MM/DD/YYYY)"
                        onChange={handleAddFormChange}
                    />
                    <input 
                        class="border-gray border-2 w-60"
                        type="text"
                        name="end_date"
                        required="required"
                        placeholder="Enter end date... (MM/DD/YYYY) "
                        onChange={handleAddFormChange}
                    />
                    
                    <button type="submit" class="btnSubmitTimePeriod">Submit time period</button>
                </form>


            <div class="w-full bg-blue-100">
                <form>
                    <table className='SalesItemTable' class="table-auto w-full shadow-md rounded border-separate border-spacing-y-4">
                        <thead>
                            <tr>
                                {/* Table Column Headers */}
                                <th>Time</th>
                                <th>Name</th>
                                <th>Items</th>
                                <th>Cost</th>
                              
                            </tr>
                        </thead>
                        <tbody>
                            {SalesItemsData.map((SalesItem) => (  
                                <tr>
                                    <td name="Time">{SalesItem.time}</td>
                                    <td name="Name">{SalesItem.cust_name}</td>
                                    <td name="Items">{SalesItem.items_ordered_string}</td>
                                    <td name="Cost">{SalesItem.total_cost}</td>
                                 
                                    
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </form>



            </div>

            

        </div>
    );
}

export default SalesReport;










