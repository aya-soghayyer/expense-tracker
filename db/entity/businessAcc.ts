import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('Business Account ')
export class Business extends BaseEntity{

    @PrimaryGeneratedColumn('increment')
    id: number

    @Column({length: 20 , nullable: false })
    title: string 

    @Column({length:10000})
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


}