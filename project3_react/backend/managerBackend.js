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

const deleteMenuItem = (req, res) => {
    const {item_id} = req.body

    pool.query('DELETE FROM menu_items WHERE item_id = $1',
    [item_id], (error, results) => {
        if (error) {
            throw error
        }
    })
}

const viewInventory = (req, res) => {
    pool.query('SELECT * FROM inventory ORDER BY inventory_id', (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows)
    })
}

const insertInventory = (req, res) => {
    const {inventory_name, start_quantity, current_quantity, spoil_date, received_date, stored_location} = req.body

    pool.query('INSERT INTO inventory (inventory_name, start_quantity, current_quantity, spoil_date, received_date, stored_location) VALUES($1, $2, $3)', 
    [inventory_name, start_quantity, current_quantity, spoil_date, received_date, stored_location], (error, results) => {
        if (error) {
            throw error
        }
    })
}

const updateInventory = (req, res) => {
    const {inventory_id, inventory_name, start_quantity, current_quantity, spoil_date, received_date, stored_location} = req.body

    pool.query('UPDATE inventory SET inventory_name=$1, start_quantity=$2, current_quantity=$3, spoil_date=$4, received_date=$5, stored_location=$6 WHERE inventory_id = $7', 
    [inventory_name, start_quantity, current_quantity, spoil_date, received_date, stored_location, inventory_id], (error, results) => {
        if (error) {
            throw error
        }
    })
}

const deleteInventory = (req, res) => {
    const {inventory_id} = req.body

    pool.query('DELETE FROM inventory WHERE inventory_id = $1',
    [inventory_id], (error, results) => {
        if (error) {
            throw error
        }
    })
}

const viewRestockReport = (req, res) => {
    pool.query('SELECT * FROM inventory WHERE current_quantity < 3000 ORDER BY inventory_id' , (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows)
    })
}


module.exports = {
    viewMenuItems,
    insertMenuItem,
    updateMenuItem,
    deleteMenuItem,
    viewInventory,
    insertInventory,
    updateInventory,
    deleteInventory,
    viewRestockReport
} 