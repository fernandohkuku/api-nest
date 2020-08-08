
import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from "typeorm"
import { UserEntity } from "src/user/user.entity"
import { IdeaEntity } from "src/idea/idea.entity"

@Entity("comment")
export class CommentEntity{

    @PrimaryGeneratedColumn("uuid")
    id:string

    @CreateDateColumn()
    created:Date
    
    @Column("text")
    comment:string

    @ManyToOne(type=>UserEntity)
    author:UserEntity

    @ManyToOne(type=>IdeaEntity, idea=>idea.comments)
    idea:IdeaEntity




}