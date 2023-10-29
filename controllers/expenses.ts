import { Any } from "typeorm";
import { Expense } from "../db/entity/expense";
import dotenv from 'dotenv'
import fetch, { Request } from "node-fetch"
import { AnyARecord } from "dns";
import { EntityId } from "typeorm/repository/EntityId.js";
// import { RExpense } from "../@types/expense";



dotenv.config()




// const convert = async ( to:any , from:any ) => {
  
//   try {
//     const access_key = process.env.currency_key_access;
//     const expense = await Expense.findOne({ where: {
//       id: Id,
//   }, });
//     console.log('test1')
//     if (!expense) {
//       throw "Expense not found!";
//       console.log('test2')
//     }
    
//     const url = `https://api.freecurrencyapi.com/v1/latest?apikey=${access_key}&currencies=${to}&base_currency=${from}}`;
//     console.log('test3')
//     const response = await fetch(url);
//     console.log('test***')
//     const data1 = await response.json();  
//     console.log(data1)
//     console.log('test3.1')
//     const num = data1.data[to];
//     console.log(num)
//     console.log('test4')
//     if (num === undefined) {
//       throw "Invalid target currency!";
//     }

//     const amountInTargetCurrency = Number((num * expense.amount).toFixed(2));

//     return {
//       id: expense.id,
//       amount: expense.amount,
//       currency: to,
//       amountInTargetCurrency,
      
//     };
//     console.log('test5')
//   } catch (error) {
//     console.error(error);
//     throw "Something went wrong!";
//   }
 

// };



function getTotalExpensesByYear(expenses :any) {
  const totalExpensesByYear = expenses.reduce((result:any, expense :any) => {
    const year = new Date(expense.date).getFullYear(); // Extract the year from the date
    if (!result[year]) {
      result[year] = 0;
    }
    result[year] += expense.amount;
    return result;
  }, {});

  return totalExpensesByYear;
}

export  { getTotalExpensesByYear };