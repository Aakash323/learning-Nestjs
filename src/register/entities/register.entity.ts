import { Entity, PrimaryGeneratedColumn, Column,OneToMany } from "typeorm";
import { Post } from "src/post/entities/post.entity";

@Entity()
export class User {
     @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    firstName!: string;

    @Column()
    lastName!: string;

    @Column({ unique: true })
    email!: string;

    @Column({default:''})
    password!:string;

    @Column({default:'user'})
    role!:string;

   @OneToMany(() => Post, (post) => post.user)    
    post!: Post[];
}
