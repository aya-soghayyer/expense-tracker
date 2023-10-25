import { type } from "os";
import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Account } from "./account";

@Entity('PersonalAccount')
export class Personal extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id: number
  
    @Column({ length: 50, nullable: false })
    userName: string

    @Column({length: 255 })
    avatar: string 

    @Column({ type: "dec"   
})
    budget: number

    @CreateDateColumn({
        type: 'timestamp',
        default: () => "CURRENT_TIMESTAMP()"
    })
    createdAt: Date

    @OneToMany(()=>Account, (account)=>account.personal)
    accounts:Account[]
    


   
  }