'use strict';

const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const schema = new Schema({
    nome:{
        type : String,
        required: true
    },
    cpf:{
        type: Number,
        required: [true,'O CPF é obrigatório'],
        index: true,
        unique: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Customer', schema);