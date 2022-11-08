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
    // SQL query to get equipment, order by ascending order of equipment ID
    pool.query("SELECT * from menu_items where item_category='entree';", (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows)
    })
}

const viewSideItems = (req, res) => {
    // SQL query to get equipment, order by ascending order of equipment ID
    pool.query("SELECT * from menu_items where item_category='side';", (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows)
    })
}

const viewDrinkItems = (req, res) => {
    // SQL query to get equipment, order by ascending order of equipment ID
    pool.query("SELECT * from menu_items where item_category='drink';", (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows)
    })
}

const viewDessertItems = (req, res) => {
    // SQL query to get equipment, order by ascending order of equipment ID
    pool.query("SELECT * from menu_items where item_category='dessert';", (error, results) => {
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
    pool
} 