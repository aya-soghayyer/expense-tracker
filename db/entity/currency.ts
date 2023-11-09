import { title } from "process";
import { BaseEntity, ChangeStreamReplaceDocument, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Expense } from "./expense.js";

@Entity('Currency')
export class Currency extends BaseEntity {

    @PrimaryGeneratedColumn('increment')
    id: number

    @Column({ length: 30 })
    title: string

    @Column({})
    symbol: string

    @OneToMany(() => Expense, (expense) => expense.currency)
    expenses: Expense[]





}