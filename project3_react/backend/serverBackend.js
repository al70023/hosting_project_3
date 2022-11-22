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


const viewEntreeItems = (req, res) => {
    pool.query("SELECT * from menu_items WHERE item_category='entree' ORDER BY item_id;", (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows)
    })
}

const viewSideItems = (req, res) => {
    pool.query("SELECT * from menu_items WHERE item_category='side' ORDER BY item_id;", (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows)
    })
}

const viewDrinkItems = (req, res) => {
    pool.query("SELECT * from menu_items WHERE item_category='drink' ORDER BY item_id;", (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows)
    })
}

const viewDessertItems = (req, res) => {
    pool.query("SELECT * from menu_items WHERE item_category='dessert' ORDER BY item_id;", (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows)
    })
}

const insertOrder = (req, res) => {
    const {time, cust_name, items_ordered, items_ordered_string, total_cost, credit_card_num, employee_id} = req.body

    pool.query(
        'INSERT INTO orders (time,cust_name,items_ordered,items_ordered_string,'
        + 'total_cost,credit_card_num,employee_id) VALUES($1, $2, $3, $4, $5, $6, $7)', 
        [time, cust_name, items_ordered, items_ordered_string, total_cost, credit_card_num, employee_id], (error, results) => {
        if (error) {
            throw error
        }
    })
}

const viewOrderSummary = (req, res) => {
    pool.query('SELECT * from orders ORDER BY order_id DESC LIMIT 1;', (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows)
    })
}

module.exports = {
    viewEntreeItems,
    viewSideItems,
    viewDrinkItems,
    viewDessertItems,
    insertOrder,
    viewOrderSummary,
    pool
} 