import { Entity,PrimaryGeneratedColumn,Column,ManyToOne } from "typeorm";
import { User } from "src/register/entities/register.entity";


@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    title!: string;
    
    @Column()
    content!: string;

    @Column()
    comments!: string;

    @ManyToOne(() => User,{onDelete:'CASCADE'}) 
    user!: User;

}