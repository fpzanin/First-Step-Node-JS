'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const router = express.Router();

//Conectando ao Banco MongoDB
mongoose.connect('mongodb://admin:admin@ds044989.mlab.com:44989/ndstr');

//Carrega os models
const Product = require('./models/product');
const Customer = require('./models/customer');
const Order = require('./models/order');

//Carrega as rotas
const indexRoute = require('./routes/index-route');
const productRoute = require('./routes/product-route');

//Transformando o body da requisição em JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//
app.use('/', indexRoute);
app.use('/products', productRoute);

module.exports = app;