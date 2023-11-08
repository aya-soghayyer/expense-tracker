import express from 'express';
// import db from '../db/dataSource.js'
import { Expense } from '../db/entity/expense.js';
import multer from 'multer';
import {AppDataSource as db} from '../db/dataSource.js';
import { format, parse } from 'path';
import { error, info } from 'console';
import { Any } from 'typeorm';
import { Decimal128 } from 'typeorm/browser';
import { setFips } from 'crypto';
import { Currency } from '../db/entity/currency.js';
import dotenv from 'dotenv'
import { accessSync } from 'fs';
import { Category } from '../db/entity/category.js';
import path from 'path';
import { Account } from '../db/entity/account.js';
import { getIdForAccount } from '../controllers/account.js';
import { connect } from 'http2';
import { login } from '../controllers/account.js';
import { request } from 'http';
import { ToS3Bucket } from '../utils/aws-configur-S3.js';
import { authenticate } from '../middleware/auth.js';
import fs from 'fs'





dotenv.config()



const router = express.Router();
router.use(express.json());



//Set up Multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Set the directory where uploaded files will be stored
    },
    filename: (req, file, cb) => {
        const fileExt = path.extname(file.originalname);
        const filename = `${Date.now()}${fileExt}`;
        cb(null, filename);
    },
});

const upload = multer({ storage });



// Add expense ...POST
router.post('/',authenticate,  upload.single('photo'), async (req:any, res:any) => {
    try {
        const { name ,description, amount } = req.body;
        const photo = req.file ? req.file.filename : "";
        // Create a new Expense record
        const newExpense = new Expense();
        newExpense.name = name
        newExpense.description = description;
        newExpense.amount = amount;
        newExpense.category = req.body.categoryId;
        newExpense.currency= req.body.currencyId
        newExpense.account = req.account
        // const S3 = await ToS3Bucket()
        // const data = await S3.upload(photo).promise();
        // console.log(data)   
        newExpense.photo = photo;
     
        // Save the new expense to the database
        // console.log(req.account)
        await db.getRepository(Expense).save(newExpense);
        
        res.status(201).send(' New expense record added with ID:' + newExpense.id);
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while creating the expense record.');
    }
});

// Delete expense ...DELETE
router.delete('/:id', async (req, res) => {
    const id = Number(req.params.id);
    const expense = await Expense.findOneBy({ id });
    if (expense) {
        expense.remove().then((response) => {
            res.status(200).send('Delete expense successful :)');
        }).catch(error => {
            console.error(error);
            res.status(500).send('Something went wrong');
        });
    }
})

// Edit expense ...PUT
router.put('/:id', async (req: any, res: any) => {
    const id = Number(req.params.id);
    const expense = await Expense.findOneBy({ id });
    if (expense) {
        expense.name = req.body.name
        expense.description = req.body.description;
        expense.amount = req.body.amount;
        expense.category = req.body.categoryId;
        expense.currency = req.body.currencyId;
        // expense.account = req.body.account;
        expense.photo = req.body.attachment_recip;
        expense.save().then((response) => {
            res.status(200).send('Update expense successful :) ' + response.id);
        }).catch(error => {
            console.error(error);
            res.status(500).send('Something went wrong');
        });
    }
})

// Read expense ...GET
// router.get('/', async (req: any, res: any) => {
//     const expense = await Expense.find()
//     try {
//         const page = 1;
//         const pageSize = 10;
    
//         const [items, totally] = await Expense.findAndCount({
//           skip: pageSize * (page - 1),
//           take: pageSize,
//           order: {
//             date: 'ASC'
//           },
//           // relations: ['user', 'user.profile' ,'tags']
//           // loadRelationIds: true,
//         });
//         res.send({
//             page,
//             pageSize,
//             items,
//             totally,
//             total: expense.length,
//             expense,

//         });
//     } catch (error) {
//         console.error(error);
//         res.status(500).send("Something went wrong!");
//     }
// })

router.get('/', async (req: any, res: any) => {
    const expense = await Expense.find()
    try {
        const page = parseInt(req.query.page || '1');
        const pageSize = parseInt(req.query.pageSize || '10');
    
        const [items, totally] = await Expense.findAndCount({
          skip: pageSize * (page - 1),
          take: pageSize,
          order: {
            date: 'ASC'
          },
          // relations: ['user', 'user.profile' ,'tags']
          // loadRelationIds: true,
        });
        res.send({ 
            "total of expenses": totally,
            page,
            pageSize,
            items,
           
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Something went wrong!");
    }
})

// Convert amount ...GET
router.get('/convert', async (req: any, res: any) => {

    const id = Number(req.query.id)
    const to = req.query.to
    const expenseRecord = await Expense.findOneBy({
        id
    });
    if (expenseRecord?.amount === undefined) {
        return
    }
    let num = 0
    const access_key = process.env.CURRENCY_KEY;
    const url = `https://api.freecurrencyapi.com/v1/latest?apikey=${access_key}&currencies=${to}&base_currency=ILS`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            num = data.data[to]
        }).then(() => {
            try {
                res.send({
                    amount: expenseRecord?.amount,
                    amountAfter: Number((num * expenseRecord?.amount).toFixed(2))
                });
                expenseRecord.save()
            } catch (error) {
                console.error(error);
                res.status(500).send("Something went wrong!");
            }
        })

})

// Min amount ...GET
router.get('/min', async (req: any, res: any) => {

    const expense = await Expense.find({
    })
    const minAmount = Math.min(...expense.map(expense => expense.amount));
    const expensemin = Expense.minimum
    // console.log(expensemin)
    // console.log(minAmount)
    try {
        res.send({
            minAmount: minAmount,

        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Something went wrong!");
    }
})

// Max amount ...GET
router.get('/max', async (req: any, res: any) => {

    const expense = await Expense.find({
    })
    const maxAmount = Math.max(...expense.map(expense => expense.amount));
    const expensemin = Expense.minimum
    console.log(expensemin)
    console.log(maxAmount)
    try {
        res.send({
            minAmount: maxAmount,
            // expense.maxAmount
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Something went wrong!");
    }
})

// Total amount ...GET
router.get('/analytics/budget', async (req: any, res: any) => {
    const budget = await Expense.find({
        select: {
            amount: true
        }
    })
    let sum = 0;
    budget.map(element => {
        sum += Number(element.amount)
    })
    res.send({ "Total Amount": sum })
})

//  all expenses in a selected date  ...GET
router.get('/analytics/day', async (req: any, res: any) => {

    const date = req.query.date;

    try {
        const expenses = await db
            .getRepository(Expense)
            .find({ where: { date } });

        let sum = 0
        expenses.map(element => {
            sum += Number(element.amount)
        })

        res.send({
            "Total amount for this date ": sum,
            "Number of purchases ": expenses.length,
            expenses
        });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching expenses.' });
    }
})

// all expenses in a year selected  ...GET
router.get('/analytics/year', async (req: any, res: any) => {
    const type = req.query.type;
    if (type) {
        try {
            const result = await db
                .getRepository(Expense)
                .createQueryBuilder('expense')
                .select('SUM(expense.amount) AS Total of amount in a year')
                .where('YEAR(expense.date) = :year', { year: type })
                .getRawOne();
            res.send({
                result,
            });
        } catch (error) {
            res.status(500).json({ error: 'An error occurred while calculating expenses for the specified year.' });
        }
    } else {
        res.status(400).json({ error: 'Missing "type" parameter.' });
    }
});

// all expenses in a month selected ...GET
router.get('/analytics/month', async (req: any, res: any) => {
    const monthValue = req.query.monthValue;

    if (monthValue) {
        try {
            // Calculate the first and last day of the specified month
            const year = parseInt(monthValue.substring(0, 4));
            const month = parseInt(monthValue.substring(4, 6));
            const firstDay = new Date(year, month - 1, 1);
            const lastDay = new Date(year, month, 0);

            const result = await db
                .getRepository(Expense)
                .createQueryBuilder('expense')
                .select('SUM(expense.amount) AS Total')
                .where('expense.date >= :firstDay', { firstDay })
                .andWhere('expense.date <= :lastDay', { lastDay })
                .getRawOne();

            res.send(result);
        } catch (error) {
            res.status(500).json({ error: 'An error occurred while calculating expenses for the specified month.' });
        }
    } else {
        res.status(400).json({ error: 'Missing "monthValue" parameter.' });
    }
});

// all exprenses in category that selected ...GET
router.get('/analytics/category', async (req, res) => {
    const categoryName = req.query.categoryName;

    if (categoryName) {
        try {
            // Calculate the total amount for the specified category
            const totalAmountResult = await db
                .getRepository(Expense)
                .createQueryBuilder('expense')
                .select('SUM(expense.amount) AS total')
                .where('expense.category = :categoryName', { categoryName })
                .getRawOne();

            // Count the number of records for the specified category
            const recordCountResult = await db
                .getRepository(Expense)
                .createQueryBuilder('expense')
                .select('COUNT(expense.id) AS count')
                .where('expense.category = :categoryName', { categoryName })
                .getRawOne();

            // const expense = await Expense.findBy({ category:true })

            res.json({
                totalAmount: totalAmountResult.total,
                recordCount: recordCountResult.count,
                // expense
            });
        } catch (error) {
            res.status(500).json({ error: 'An error occurred while calculating category analytics.' });
        }
    } else {
        res.status(400).json({ error: 'Missing "categoryName" parameter.' });
    }
});





export default router;