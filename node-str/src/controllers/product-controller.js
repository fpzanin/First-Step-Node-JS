'use strict';

const mongoose = require('mongoose');
const Product = mongoose.model('Product');
const ValidationContract = require('../validators/validator.js');
const repository = require('../repositories/product-repository.js');

exports.get = async(req, res, nex) => {
    try {
        var data = await repository.get();
        res.status(200).send(data);
    } catch(e){
        res.status(500).send({
            message: 'Falha ao executar requisição(Get)'
        });
    }
}

exports.getBySlug = async(req, res, nex) => {
    try{
        var data = await repository.getBySlug(req.params.slug);
        res.status(200).send(data);
    } catch(e) {
        res.status(500).send({
            message: 'Falha ao executar requisição (GetBySlug)'
        })
    }
};

exports.getById = async(req, res, nex) => {
    try{
        var data = await repository.getByID(req.params.id);
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao executar requisição (GetById)'
        })
    }
};

exports.getByTag = async(req, res, nex) => {
    try {
        const data =  await repository.getByTag(req.params.tag);
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao executar requisição (GetByTag)'
        })
    }
};

exports.post = async(req, res, next) => {
    let contract = new ValidationContract();
    contract.hasMinLen(req.body.title, 3, 'O título deve conter pelo menos 3 caracteres!');
    contract.hasMinLen(req.body.description, 3, 'A descrição deve conter pelo menos 3 caracteres');
    contract.hasMinLen(req.body.slug, 3, 'O slug deve conter pelo menos 3 caracteres');

    // Se os dados forem inválidos
    if (!contract.isValid()) {
        res.status(400).send(contract.errors()).end();
        return;
    }

    try {
        await repository.create(req.body);
        res.status(201).send({ 
            message: 'Produto cadastrado com sucesso!' 
        }); 
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao cadastrar produto!'
        })
    }
};

exports.put =async(req, res, next) => {
    try {
        await repository.update(req.params.id, req.body);
        res.status(200).send({ 
            message: 'Produto atualizado com sucesso!'
        });
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao atualizar produto!'
        });
    }
};

exports.delete = async(req, res, next) => {
    try {
        await repository.delete(req.body.id);
        res.status(200).send({
            message: 'Produto excluído com sucesso!'
        });
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao excluir produto!'
        });
    }
};