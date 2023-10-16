import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Expense } from "./expense";

@Entity('Category')
export class Category extends BaseEntity{

    @PrimaryGeneratedColumn('increment')
    id : number 

    @Column({length: 70 })
    title: string 

    @ManyToOne(()=>Expense, (expense)=>expense.category)
    expenses: Expense[]




}