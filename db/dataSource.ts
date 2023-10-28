import { DataSource } from "typeorm";
// import { Business } from "./entity/businessAcc";
import { Expense } from "./entity/expense";
// import { Personal } from "./entity/personalAcc";
import { Currency } from "./entity/currency";
import { Category } from "./entity/category";
import { Account } from "./entity/account";
<<<<<<< HEAD
import config from '../config'
import dotenv from 'domain'
=======
import dotenv from 'dotenv'
>>>>>>> dev


dotenv.config()


const AppDataSource = new DataSource({
    type: 'mysql',
<<<<<<< HEAD
    host: 'localhost' ,
    port: 3306,
    username: 'root',
    password: '',
    database: 'expense_tracker',
    entities: [  Business, Expense, Personal, Currency, Category, Account],
=======
    host: process.env.DB_HOST ,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
   
    entities: [   Expense, Currency, Category,Account],
>>>>>>> dev
    // migrations: ['./**/migration/*.ts'],
    synchronize: true,
    logging: true
  });

  const initialize = ()=>{
    AppDataSource.initialize().then(() => {
        console.log("Data Source has been initialized!")
    }).catch((err) => {
        console.error("Error during Data Source initialization", err)
    })
}
  export default {AppDataSource, initialize };