import express from 'express';
// import { Category } from '../db/entity/category';
import { Currency } from '../db/entity/currency';
import db from '../db/dataSource'
import { Expense } from '../db/entity/expense';
import { Like } from 'typeorm';


const router = express.Router();

router.post('/', async (req, res) => {
    const newCategory = new Currency()
    newCategory.title = req.body.title;
    newCategory.save().then((response) => {
        res.status(201).send(' New currency added with ID:' + response.id);
    }).catch(error => {
        console.error(error);
        res.status(500).send('Something went wrong');
    });
})

router.delete('/:id', async (req, res) => {
    const id = Number(req.params.id);
    const category = await Currency.findOneBy({ id });
    if (category) {
        category.remove().then((response) => {
            res.status(201).send('Delete currency successful :)' + response.id);
        }).catch(error => {
            console.error(error);
            res.status(500).send('Something went wrong');
        });
    }
})

router.put('/:id', async (req:any, res:any) => {
    const id = req.params.id;
    const category = await Currency.findOneBy({ id });
    if (category) {
        category.title = req.body.title
        category.save().then((response) => {
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
        const category = await Currency.find({
            where: [
                { title: Like(`%${term}%`) },
            ]
        });
        res.send({ 
            total: category.length,
            category
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Something went wrong!");
    }
})

router.get('/', async (req: any, res: any) => {

    const categories = await Currency.find()
    try {
        res.send({
            total: categories.length,
            categories,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Something went wrong!");
    }
})











export default router;