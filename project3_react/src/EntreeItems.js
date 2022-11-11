import React, { Component } from 'react';
import { useState, useEffect, Fragment } from 'react';
import './EntreeItems.css';


function EntreeItems() {
    // Data state variable defaulted to an empty array (for printing out the data)
    const [entreeItemsData, setEntreeItemsData] = useState([]);

    const [items, setItemsOrdered] = useState([]);

    // const handleAddToOrder = (entreeItem) => {

    //     const orderedItems = [...items, entreeItem];
    //     setItemsOrdered(orderedItems);
    // }

    const fetchEntreeItems = () => {
        fetch('http://localhost:3001/EntreeItems')
            .then(res => res.json())
            .then(json => setEntreeItemsData(json))
    }

    // Call the function on the component mount
    useEffect(() => {
        fetchEntreeItems();
    }, []);

    return (
        <div className="entreeItems">
            <h1> Entree Items </h1>


            <div className="entreeItemTable">
                <form>
                    <table>
                        <thead>
                            <tr>
                                {/* Table Column Headers */}
                                <th>Name</th>
                                <th>Price</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {entreeItemsData.map((entreeItem) => (
                                <tr>
                                    <td name="name">{entreeItem.item_name}</td>
                                    <td name="price">{entreeItem.item_price}</td>
                                    <td><button type="button" onClick={() => setItemsOrdered([...items, entreeItem])}>Add Item</button></td>

                                </tr>
                            ))}
                        </tbody>
                    </table>
                </form>



            </div>

            <h1>Orders</h1>
            <ol>
                {items.map((item) =>
                    <li>
                        {item.item_name}    {item.item_price}
                    </li>
                )}
            </ol>

        </div>
    );
}

export default EntreeItems;