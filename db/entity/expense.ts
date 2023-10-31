import { text } from "stream/consumers";
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Currency } from "./currency.js";
import { Category } from "./category.js";
import { Account } from "./account.js";

@Entity('Expense')
export class Expense extends BaseEntity{
     
    @PrimaryGeneratedColumn('increment')
    id : number 

    @Column({length: 70, nullable:true})
    name : string
    
    @Column({type: "longtext" })
    description: string 

    @Column({type: 'dec'})
    amount: number 

    @CreateDateColumn({
        type: 'timestamp',
        default: () => "CURRENT_TIMESTAMP(6)"
    })
    date: Date

    @Column({length: 80 , nullable:true})
    photo:string
    
    @ManyToOne(()=>Currency,(currency)=>currency.expenses , {onDelete:"CASCADE"})
    currency: Currency

    @ManyToOne(()=>Category, (category)=>category.expenses , {onDelete:"CASCADE"})
    category:Category

    @ManyToOne(()=>Account, (account)=> account.expenses ,  {
        eager: false,
        onDelete: 'CASCADE',  // SET NULL// RESTRICT
        onUpdate: 'CASCADE'
      })
    account: Account

    







}