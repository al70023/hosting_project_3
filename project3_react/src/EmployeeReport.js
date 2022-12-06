import React from 'react';
import { useReducer, useEffect, useState, useContext, Fragment } from 'react';
import './EmployeeReport.css';
import {Link} from 'react-router-dom';

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
            <button className = "btnSalesReport">Employee Report</button>

            <div>
            <Link activeClassName="active" to={'/ManagerHome'}>
            <a>
                <button className = "backButton">Back</button>
            </a>
            </Link>
            </div>

            <div class="w-full bg-blue-100 mt-10">
                <form>
                    <table className='EmployeeItemTable' class="table-auto w-full shadow-md rounded border-separate border-spacing-y-4">
                        <thead>
                            <tr>
                                {/* Table Column Headers */}
                                <th>ID</th>
                                <th>Name</th>
                                <th>Total Sales</th>
                                
                            </tr>
                        </thead>
                        <tbody>
                            {EmployeeItemsData.map((EmployeeItem) => (  
                                <tr>
                                    <td name="ID">{EmployeeItem.employee_id}</td>
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
