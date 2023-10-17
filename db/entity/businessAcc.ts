import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Account } from "./account";

@Entity('BusinessAccount')
export class Business extends BaseEntity{

    @PrimaryGeneratedColumn('increment')
    id: number

    @Column({length: 20 , nullable: false })
    title: string 

    @Column({type: "longtext"})
    description: string 

    @Column({length: 50 , nullable: false})
    owner: string

    @Column({default: 0.0 })
    budget:number

    @CreateDateColumn({
        type: 'timestamp',
        default: () => "CURRENT_TIMESTAMP()"
    })
    createdAt: Date

    @CreateDateColumn({
        type: 'timestamp',
        default: () => "CURRENT_TIMESTAMP()"
    })
    lastModifiedAt: Date

    @OneToMany(()=>Account, (account)=>account.business)
    accounts:Account[]

}