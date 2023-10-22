import { type } from "os";
import { BaseEntity, BeforeInsert, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import bcrypt from 'bcrypt'
import { Expense } from "./expense";

@Entity('Account')
export class Account extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id: number
  
    @Column({ length: 50, nullable: false  })
    userName: string


    @BeforeInsert()
  async hashPassword() {
    if (this.password) {
      this.password = await bcrypt.hash(this.password, 10)
    }
  }
    @Column({ length: 25 ,nullable: false })
     password: string 

    @Column({nullable: false, length:80})
    email:string

    @Column({
        type: 'enum',
        enum : ['personal' ,'business'],
        default: 'personal'
    })
    type : 'personal' | 'business'

  //*******
    @Column({
        type: "enum",
        enum:['google' , 'no select'],
        // default: 'facebook'
    })
    authintication_type: 'google'| 'no select'

    @OneToMany(()=>Expense, (expense)=>expense.account)
    expenses: Expense[]
    
    
    
    
  }