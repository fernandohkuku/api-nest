import { IdeaDTO, IdeaRO } from './idea.dto';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import { IdeaEntity } from './idea.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/user.entity';

@Injectable()
export class IdeaService {
    constructor(
        @InjectRepository(IdeaEntity)
        private _ideaRepository: Repository<IdeaEntity>,
        @InjectRepository(UserEntity)
        private _userRepository: Repository<UserEntity>
    ) { }

    private toResponseObject(idea:IdeaEntity):IdeaRO{
        return {...idea, author:idea.author.toResponseObject(false)};
    }
    private ensureOwnership(idea:IdeaEntity, userId:string){
        if(idea.author.id!== userId){
            throw new HttpException("Incorrect user", HttpStatus.UNAUTHORIZED)
        }
    }

    async showAll():Promise<IdeaRO[]> {
        const ideas = await this._ideaRepository.find({relations:["author"]});
        return ideas.map(idea=> this.toResponseObject(idea))
    }

    async create(userId:string,data:IdeaDTO):Promise<IdeaRO> {
        const user = await this._userRepository.findOne({id:userId})
        const idea = await this._ideaRepository.create({...data,author:user});
        await this._ideaRepository.save(idea);
        return this.toResponseObject(idea);
    }

    async read(id: string):Promise<IdeaRO>{
        const  idea = await this._ideaRepository.findOne({ where: { id }, relations:["author"] });
        if(!idea){
            throw new HttpException("Not found", HttpStatus.NOT_FOUND);
        }
        return this.toResponseObject(idea);
    }

    async update(id: string, userId:string, data:Partial<IdeaDTO>):Promise<IdeaRO> {
        let  idea = await this._ideaRepository.findOne({ where: { id }, relations:["author"] });
        if(!idea){
            throw new HttpException("Not Found", HttpStatus.NOT_FOUND)
        }
        this.ensureOwnership(idea, userId)
        await this._ideaRepository.update({ id }, data)
        idea = await this._ideaRepository.findOne({where:{ id }, relations:["author"]})
        return this.toResponseObject(idea)
    }

    async destroy(id: string,userId:string) {
        const  idea = await this._ideaRepository.findOne({ where: { id }, relations:["author"] });
        if(!idea){
            throw new HttpException("Not Found", HttpStatus.NOT_FOUND)
        }
        this.ensureOwnership(idea, userId)
        await this._ideaRepository.delete({ id })
        return  this.toResponseObject(idea);
    }
}