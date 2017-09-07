'use strict';

const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const schema = new Schema({
    customer:{
        type: mongoose.Schema.Types.ObjetcId,
        ref: 'Customer'
    },
    number:{
        type : String,
        required: true
    },
    createDat:{
        type : Date,
        required: true,
        default: Date.now
    },
    status:{
        type : String,
        required: true,
        enum :['created','done'],
        default: 'created'
    }, 
    items:[{
        quantity: {
            type: Number,
            required: true,
            default: 1
        },
        price: {
            type: Number,
            required: true
        },
        products: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Products'
        }
    }]
});

module.exports = mongoose.model('Order', schema);