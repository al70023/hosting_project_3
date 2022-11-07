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

// Create a new piece of equipment 
const createEquipment = (req, res) => {
    const {equip_id, equip_name, model, brand, price, total_in_stock, checked_out} = req.body

    // SQL query to create a new piece of equipment and add it to the table
    pool.query('INSERT INTO equipment (equip_id, equip_name, model, brand, price, total_in_stock, checked_out) VALUES($1, $2, $3, $4, $5, $6, $7)', 
    [equip_id, equip_name, model, brand, price, total_in_stock, 0], (error, results) => {
        if (error) {
            throw error
        }
        res.status(201).send(`Equipment added with name: ${equip_name}`)
    })
}