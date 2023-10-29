import { text } from "stream/consumers";
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Currency } from "./currency";
import { Category } from "./category";
import { Account } from "./account";

@Entity('Expense')
export class Expense extends BaseEntity{
     
    @PrimaryGeneratedColumn('increment')
    id : number 

    @Column({length: 70})
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
    
    @ManyToOne(()=>Currency,(currency)=>currency.expenses)
    currency: Currency

    @ManyToOne(()=>Category, (category)=>category.expenses)
    category:Category

    @ManyToOne(()=>Account, (account)=> account.expenses)
    account: Account

    







}