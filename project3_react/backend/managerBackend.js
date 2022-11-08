const { Pool } = require('pg');
const dotenv = require('dotenv').config();

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
        res.status(200).json(results.rows)
    })
}

const insertMenuItem = (req, res) => {
    const {item_name, item_price, item_category} = req.body

    // SQL query to create a new menu item and add it to the table
    pool.query('INSERT INTO menu_items (item_name, item_price, item_category) VALUES($1, $2, $3)', 
    [item_name, item_price, item_category], (error, results) => {
        if (error) {
            throw error
        }
    })
}



module.exports = {
    viewMenuItems,
    insertMenuItem,
    pool
} 