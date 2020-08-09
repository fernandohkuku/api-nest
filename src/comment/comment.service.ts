import { Injectable, HttpException, HttpService, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentEntity } from './comment.entity';
import { Repository } from 'typeorm';
import { IdeaEntity } from 'src/idea/idea.entity';
import { UserEntity } from 'src/user/user.entity';
import { CommentDTO } from './comment.dto';

@Injectable()
export class CommentService {

    constructor(
        @InjectRepository(CommentEntity)
        private _commentRepository: Repository<CommentEntity>,
        @InjectRepository(IdeaEntity)
        private _ideaRepository: Repository<IdeaEntity>,
        @InjectRepository(UserEntity)
        private _userRepository: Repository<UserEntity>
    ) { }

    private toResponseObject(comment:CommentEntity){
        const responseObject:any =comment;
        if(comment.author){
            responseObject.author= responseObject.author.toResponseObject(false)
        }
        return responseObject
    }

    async showByIdea(id:string, page:number=1){
        const comments = await this._commentRepository.find({
            where:{idea:{id}},
            relations:["author"],
            take:25,
            skip:25 * (page -1)
        })
        return comments.map(comment=>this.toResponseObject(comment));
    }

    async showByUser(id:string, page:number=1){
        const comments = await this._commentRepository.find({
            where:{author:{id}},
            relations:["author"],
            take:25,
            skip:25 * (page -1)
        })
        return comments.map(comment=>this.toResponseObject(comment));
    }
    async show(id:string){
        const comment = await this._commentRepository.findOne({where:{id}, relations:["author", "idea"]})
        console.log(comment)
        return this.toResponseObject(comment);
    }

    async create(ideaId:string, userId:string, data:CommentDTO){
        const idea   = await this._ideaRepository.findOne({where:{id:ideaId}});
        const user  = await this._userRepository.findOne({where:{id:userId}});

        const comment  = await this._commentRepository.create({
            ...data,
            idea, 
            author: user
        })
        await this._commentRepository.save(comment)
        return this.toResponseObject(comment);
    }

    async destroy(id:string, userId:string){
        const comment = await this._commentRepository.findOne({where:{id}, relations:["author", "idea"]});
        if(comment.author.id !== userId){
            throw new HttpException("you do not own this comment ", HttpStatus.UNAUTHORIZED)
        }

        await this._commentRepository.remove(comment);
        return this.toResponseObject(comment);
    }


}

