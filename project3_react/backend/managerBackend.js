const express = require('express');
const { Pool } = require('pg');
const dotenv = require('dotenv').config();
// Create express app
const app = express();
const port = 3000;
// Create pool
const pool = new Pool({
    user: process.env.PSQL_USER,
    host: process.env.PSQL_HOST,
    database: process.env.PSQL_DATABASE,
    password: process.env.PSQL_PASSWORD,
    port: process.env.PSQL_PORT,
    ssl: {rejectUnauthorized: false}
});

// Get all the equipment in the table
const viewMenuItems = (req, res) => {
    // SQL query to get equipment, order by ascending order of equipment ID
    pool.query('SELECT * FROM menu_items', (error, results) => {
        if (error) {
            throw error
        }
        console.log(menu_items);
        res.status(200).json(results.rows)
    })

    // menu_items = []
    // pool
    //     .query('SELECT * FROM menu_items;')
    //     .then(query_res => {
    //         for (let i = 0; i < query_res.rowCount; i++){
    //             menu_items.push(query_res.rows[i]);
    //         }
    //         const data = {menu_items: menu_items};
    //         console.log(menu_items);
    //         res.status(200).json(results.rows)
    // });
}

module.exports = {
    viewMenuItems
} 