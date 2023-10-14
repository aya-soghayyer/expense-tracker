import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('Category')
export class category extends BaseEntity{

    @PrimaryGeneratedColumn('increment')
    id : number 

    @Column({length: 70 })
    title: string 





}