import express from 'express';
// import { Category } from '../db/entity/category';
import db from '../db/dataSource'
import { Expense } from '../db/entity/expense';
import multer from 'multer';
import dataSource from '../db/dataSource';
import { parse } from 'path';
import { error, info } from 'console';
import { Any } from 'typeorm';
import { Decimal128 } from 'typeorm/browser';
import { setFips } from 'crypto';
import { execSync } from 'child_process';
import { Currency } from '../db/entity/currency';
// import uplouds from ""





const router = express.Router();
// router.use(express.json());

const upload = multer({ dest: 'uploads/' })


//** */
router.get('/convert', async (req: any, res: any) => {
    // const id = Number(req.params.id)
    const newExpense= await Expense.find();
    const from = req.query.from
    let to = req.query.to 
    let amount = req.query.amount
    let num=0
    const access_key = 'fca_live_okDZMcx0iJuWoZ2EyutBSpRAkgFbQe1LzOdnqhiV';
    const url = `https://api.freecurrencyapi.com/v1/latest?apikey=${access_key}&currencies=${to}&base_currency=${from}`;
    fetch(url)
      .then(response => response.json())
      .then( data=>{ num =data.data[to]
    }).then(()=>{ try {
             res.send({
               amount:amount,
            // amountafter :amount*Number(),
               amountAfter:Number((num*amount).toFixed(2))
            //    amoundtAfterchangetofloat:setFips
               });
    //  amount =res.send(Number((num*amount).toFixed(2)))
    }catch (error) {
        console.error(error);
        res.status(500).send("Something went wrong!");
    }})
    // amount.save().then((res:any) => {
    //     res.status(201).send(' New expense record added with ID:' + res.id);
    // })
})

router.post('/',  async (req, res) => {
    const newExpense = new Expense()
    newExpense.name = req.body.name;
    newExpense.description = req.body.description;
    newExpense.amount = req.body.amount;
    newExpense.category = req.body.categoryId;
    newExpense.currency = req.body.currencyId;
    newExpense.attachment_recip = req.body.attachment_recip;

    console.log(req.file)
    newExpense.save().then((response) => {
        res.status(201).send(' New expense record added with ID:' + response.id);
    }).catch(error => {
        console.error(error);
        res.status(500).send('Something went wrong');
    });
})

router.delete('/:id', async (req, res) => {
    const id = Number(req.params.id);
    const expense = await Expense.findOneBy({ id });
    if (expense) {
        expense.remove().then((response) => {
            res.status(201).send('Delete expense successful :)' );
        }).catch(error => {
            console.error(error);
            res.status(500).send('Something went wrong');
        });
    }
})

router.put('/:id', async (req:any, res:any) => {
    const id = Number(req.params.id);
    const expense = await Expense.findOneBy({ id });
    if (expense) {
        expense.name = req.body.name
        expense.description = req.body.description;
        expense.amount = req.body.amount;
        expense.category = req.body.categoryId;
        expense.currency = req.body.currencyId;
        // expense.account = req.body.account;
        expense.attachment_recip = req.body.attachment_recip;
        expense.save().then((response) => {
            res.status(201).send('Update expense successful :) ' + response.id);
        }).catch(error => {
            console.error(error);
            res.status(500).send('Something went wrong');
        });
    }
})

router.get('/', async (req: any, res: any) => {


    const expense = await Expense.find()
    try {
        res.send({
            total: expense.length,
            expense,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Something went wrong!");
    }
})

router.get('/min', async (req: any, res: any) => {    
    
    const expense = await Expense.find({
    })
    const minAmount = Math.min(...expense.map(expense => expense.amount));
    const expensemin =  Expense.minimum
    console.log(expensemin)
    console.log(minAmount)
    try {
        res.send({
            minAmount:minAmount,
                
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Something went wrong!");
    }
})

router.get('/max', async (req: any, res: any) => {    
    
    const expense = await Expense.find({
    })
    const maxAmount = Math.max(...expense.map(expense => expense.amount));
    const expensemin =  Expense.minimum
    console.log(expensemin)
    console.log(maxAmount)
    try {
        res.send({
            minAmount:maxAmount,
            // expense.maxAmount
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Something went wrong!");
    }
})




//*** */
router.post('/upload', upload.single('image'), (req, res) => {
    // var data={'filename': req.file.filename};
    if (!req.file) {
        res.status(500).send("Failed Upload File!");
        return;
      }
    
      const fileURL = req.file.destination + req.file.filename +req.file.size;
      res.send({
        message: 'File Uploaded Successfully!',
        file: fileURL,
    })
    
        console.log(req.file)
})











export default router;