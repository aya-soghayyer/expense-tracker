import { title } from "process";
import { BaseEntity, ChangeStreamReplaceDocument, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('Currency')
export class currency extends BaseEntity{
    @PrimaryGeneratedColumn('increment')
    id : number

    @Column({length: 30})
    title: string 

    @Column({length: 3})
    symbol: string 





}