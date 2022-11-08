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

const viewMenuItems = (req, res) => {
    pool.query('SELECT * FROM menu_items ORDER BY item_id', (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows)
    })
}

const insertMenuItem = (req, res) => {
    const {item_name, item_price, item_category} = req.body

    pool.query('INSERT INTO menu_items (item_name, item_price, item_category) VALUES($1, $2, $3)', 
    [item_name, item_price, item_category], (error, results) => {
        if (error) {
            throw error
        }
    })
}


const updateMenuItem = (req, res) => {
    const {item_id, item_name, item_price, item_category} = req.body

    pool.query('UPDATE menu_items SET item_name=$1, item_price=$2, item_category=$3 WHERE item_id = $4', 
    [item_name, item_price, item_category, item_id], (error, results) => {
        if (error) {
            throw error
        }
    })
}



module.exports = {
    viewMenuItems,
    insertMenuItem,
    updateMenuItem,
    pool
} 