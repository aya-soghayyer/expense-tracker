import { Expense } from "../db/entity/expense";

export namespace RExpense {
   export interface expense{
        id: number;
        name:string;
        description:string;
        amount:number;
        date: Date;
        attachment_recip:string;
      }
    }



