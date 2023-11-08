import "reflect-metadata"
import "./config.js"
import express from 'express';
import {AppDataSource, initialize }from './db/dataSource.js'
import dotenv from 'dotenv'
import createError from 'http-errors'
import expenseRouter from './routers/expenses.js'
import catgoryRouter from './routers/categories.js'
import currencyRouter from './routers/currencies.js'
import accountRounter from './routers/account.js'

const app = express() ; 
dotenv.config();
const PORT = process.env.PORT || 3000;


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/expense-tracker/expenses',expenseRouter)
app.use('/expense-tracker/categories', catgoryRouter)
app.use('/expense-tracker/currencies', currencyRouter )
app.use('/expense-tracker/accounts', accountRounter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
  });


  // error handler
app.use(function (err: any, req: any, res: any, next: any) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // render the error page
    res.status(err.status || 500).send({ error: err.message });
  });
  

app.listen(PORT,async() =>{
console.log(`App is running and listening on port ${PORT} and host http://localhost:${PORT}`);
await initialize();
})
 
export default app;