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
import {convert} from '../controllers/expenses';

import dotenv from 'dotenv'
import { RExpense } from '../@types/expense';


dotenv.config()



const router = express.Router();
// router.use(express.json());

const upload = multer({ dest: 'uploads/' })


//** */
router.get('/convert', async (req, res) => {
    console.log("test")
    let to =   req.query.to
    const from = req.query.from

    const id = Number(req.query.id)
    const expense = await Expense.findOneBy({id})
          console.log('test1')
          if (!expense) {
            throw "Expense not found!";
            console.log('test2')
          }
   

    convert(to, from )
   .then(data => {
    res.send(data.amountInTargetCurrency);
  })
  .catch(err => {
    res.status(401).send(err);
  })
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

// router.get('/expenses/analytics/total_amount', async (req, res) => {

//     try {
//       const fromDate =  new Date(req.query.fromDate); // Date format for start date
//       const toDate = req.query.toDate;     // Date format for end date
//       const targetCurrency = req.query.currency;     // Target currency code
  
//       // Find expenses within the specified date range
//       const expenses = await Expense.find({
//         // date: {  fromDate,  toDate },
//       });
  
//       // Initialize the total amount
//       let totalAmount = 0;
  
//       // Iterate through expenses and convert to the target currency
//       for (const expense of expenses) {
//         const access_key = process.env.currency_key_access;
//         const url = `https://api.freecurrencyapi.com/v1/latest?apikey=${access_key}&currencies=${targetCurrency}&base_currency=ILS`;
//         const response = await fetch(url);
//         const data = await response.json();
//         const num = data.data['targetCurrency'];
  
//         if (num === undefined) {
//           throw "Invalid target currency!";
//         }
  
//         const convertedAmount = Number((num * expense.amount).toFixed(2));
//         totalAmount += convertedAmount;
//       }
  
//       res.json({ totalAmount });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: "Something went wrong!" });
//     }
//   });








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