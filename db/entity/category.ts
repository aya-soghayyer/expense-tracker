import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Expense } from "./expense.js";

@Entity('Category')
export class Category extends BaseEntity{

    @PrimaryGeneratedColumn('increment')
    id : number 

    @Column({})
    title: string 

    @OneToMany(()=>Expense, (expense)=>expense.category)
    expenses: Expense[]




}