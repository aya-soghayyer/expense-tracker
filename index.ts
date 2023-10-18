import "reflect-metadata"
// import 'dotenv/config.js'
import express from 'express';
import db from './db/dataSource'
import dotenv from 'dotenv'
import expenseRouter from './routers/expenses'
import catgoryRouter from './routers/categories'
import currencyRouter from './routers/currencies'
import accountRounter from './routers/account'
import businessRouter from './routers/buisiness_account'
import personalRouter from './routers/personal_account'

// import { Db } from "typeorm";

// import { Index } from "typeorm";


const app = express() ; 
const PORT = 3000 ; 

app.use(express.json());

app.use('/expense-tracker/expenses',expenseRouter)
app.use('/expense-tracker/categories', catgoryRouter)
app.use('/expense-tracker/currencies', currencyRouter )
app.use('/expense-tracker/accounts', accountRounter)
app.use('/expense-tracker/business-accounts', businessRouter)
app.use('/expense-tracker/personal-accounts', personalRouter)




 

app.listen(PORT,() =>{
console.log(`app is running and listening on port ${PORT}`);
db.initialize();
})
 


export default app;