import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('Expense')
export class expense extends BaseEntity{
     
    @PrimaryGeneratedColumn('rowid')
    id : number 

    @Column({length: 70})
    name : string
    
    @Column()
    description: string 

    @Column()
    amount: number 




}