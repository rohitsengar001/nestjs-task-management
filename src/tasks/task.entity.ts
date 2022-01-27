import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { TaskStatus } from "./task.model";

@Entity()
export class TaskEntity{
    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column()
    titile:string

    @Column()
    description: string
    
    @Column()
    status: TaskStatus
}