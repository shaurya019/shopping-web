const express = require('express');
const app = express();
const errormiddelware = require('./middleware/error')
const cookieParser = require('cookie-parser')

app.use(express.json());
app.use(cookieParser());

// Route Imports
const product = require('./routes/productRoute');
const user = require('./routes/userRoute');

app.use("/api/v1",product);
app.use("/api/v1",user);


app.use(errormiddelware);

module.exports = app;