import { DataSource } from "typeorm";
import { account } from "./entity/account";

const AppDataSource = new DataSource({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'expense_tracker',
    entities: [account, ],
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