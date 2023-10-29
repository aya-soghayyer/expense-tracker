import express from 'express';
// import { Category } from '../db/entity/category';
import { Currency } from '../db/entity/currency.js';
// import {AppDataSource, } from '../db/dataSource.js'
import { Expense } from '../db/entity/expense.js';
import { Like } from 'typeorm';
import { AppDataSource, initialize } from '../db/dataSource.js';


const router = express.Router();

router.post('/', async (req, res) => {
    const newCurrency = new Currency()
    newCurrency.title = req.body.title;
    newCurrency.save().then((response) => {
        res.status(201).send(' New currency added with ID:' + response.id);
    }).catch(error => {
        console.error(error);
        res.status(500).send('Something went wrong');
    });
})

router.delete('/:id', async (req, res) => {
    const id = Number(req.params.id);
    const currency = await Currency.findOneBy({ id });
    if (currency) {
        currency.remove().then((response) => {
            res.status(201).send('Delete currency successful :)');
        }).catch(error => {
            console.error(error);
            res.status(500).send('Something went wrong');
        });
    }
})

router.put('/:id', async (req:any, res:any) => {
    const id = req.params.id;
    const currency = await Currency.findOneBy({ id });
    if (currency) {
        currency.title = req.body.title
        currency.save().then((response) => {
            res.status(201).send('Update currency successful :) ' + response.id);
        }).catch(error => {
            console.error(error);
            res.status(500).send('Something went wrong');
        });
    }
})

router.get('/search', async (req: any, res: any) => {
    const term = req.query.term;
    try {
        const currency = await Currency.find({
            where: [
                { title: Like(`%${term}%`) },
            ]
        });
        res.send({ 
            total: currency.length,
            currency
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Something went wrong!");
    }
})

router.get('/', async (req: any, res: any) => {

    const currency = await Currency.find()
    try {
        res.send({
            total: currency.length,
            currency,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Something went wrong!");
    }
})











export default router;