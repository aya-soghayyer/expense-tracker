import { type } from "os";
import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('Account')
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

  
    


   
  }