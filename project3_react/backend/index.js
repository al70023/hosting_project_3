const express = require('express')
const bodyParser = require('body-parser')
const cors = require("cors");
const dbServer = require("./serverBackend")
const dbManager = require("./managerBackend")
const app = express()
const PORT = 3000

var corsOptions = {
  origin: "http://localhost:3000"
}

app.use(cors(corsOptions))
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true
  })
)

