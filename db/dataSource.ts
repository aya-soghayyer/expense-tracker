import { DataSource } from "typeorm";
// import { Business } from "./entity/businessAcc";
import { Expense } from "./entity/expense.js";
// import { Personal } from "./entity/personalAcc";
import { Currency } from "./entity/currency.js";
import { Category } from "./entity/category.js";
import { Account } from "./entity/account.js";
import dotenv from 'dotenv'


dotenv.config()


const AppDataSource = new DataSource({
    type: 'mysql',
    host: process.env.DB_HOST ,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [   Expense, Currency, Category,Account],
    // migrations: ['./**/migration/*.ts'],
    synchronize: true,
    logging: false
  });

  const initialize = ()=>{
    AppDataSource.initialize().then(() => {
        console.log("Data Source has been initialized!")
    }).catch((err) => {
        console.error("Error during Data Source initialization", err)
    })
}
  export  {AppDataSource, initialize };