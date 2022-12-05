import React from 'react';
import { useReducer, useEffect, useState, useContext, Fragment } from 'react';
import './EmployeeReport.css';

function EmployeeReport() {

    const [EmployeeItemsData, setEmployeeItemsData] = useState([]);

    const fetchEmployeeItems = () => {
        fetch('http://localhost:3001/EmployeeReport')
            .then(res => res.json())
            .then(json => setEmployeeItemsData(json))
    }

    useEffect(() => {
        fetchEmployeeItems();
    }, []);



    return (
        <div className="">
            <h1 class="text-6xl"> Employee Report </h1>


            <div class="w-full bg-blue-100">
                <form>
                    <table className='EmployeeItemTable' class="table-auto w-full shadow-md rounded border-separate border-spacing-y-4">
                        <thead>
                            <tr>
                                {/* Table Column Headers */}
                                <th>Name</th>
                                <th>Total Sales</th>
                                
                            </tr>
                        </thead>
                        <tbody>
                            {EmployeeItemsData.map((EmployeeItem) => (  
                                <tr>
                                    <td name="name">{EmployeeItem.employee_name}</td>
                                    <td name="quantity">{"$"+(Number(EmployeeItem.sum.toFixed(2))).toString()}</td>
                                    
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </form>



            </div>

            

        </div>
    );
}

export default EmployeeReport;
