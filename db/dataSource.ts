import { DataSource } from "typeorm";
import { Business } from "./entity/businessAcc";
import { Expense } from "./entity/expense";
import { Personal } from "./entity/personalAcc";
import { Currency } from "./entity/currency";
import { Category } from "./entity/category";
import { Account } from "./entity/account";




const AppDataSource = new DataSource({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'expense_tracker',
    entities: [  Business, Expense, Personal, Currency, Category, Account],
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
  export default {AppDataSource , initialize};