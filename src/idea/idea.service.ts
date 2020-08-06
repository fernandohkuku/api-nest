import { IdeaDTO } from './idea.dto';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import { IdeaEntity } from './idea.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class IdeaService {
    constructor(
        @InjectRepository(IdeaEntity)
        private _ideaRepository: Repository<IdeaEntity>
    ) { }

    async showAll() {
        return await this._ideaRepository.find();
    }

    async create(data:IdeaDTO) {
        const idea = await this._ideaRepository.create(data);
        await this._ideaRepository.save(idea);
        return idea;
    }

    async read(id: string) {
        const  idea = await this._ideaRepository.findOne({ where: { id } });
        if(!idea){
            throw new HttpException("Not found", HttpStatus.NOT_FOUND);
        }
        return idea;
    }

    async update(id: string, data:Partial<IdeaDTO>) {
        const  idea = await this._ideaRepository.findOne({ where: { id } });
        if(!idea){
            throw new HttpException("Not Found", HttpStatus.NOT_FOUND)
        }
        await this._ideaRepository.update({ id }, data)
        return await this._ideaRepository.findOne({ id })
    }

    async destroy(id: string) {
        const  idea = await this._ideaRepository.findOne({ where: { id } });
        if(!idea){
            throw new HttpException("Not Found", HttpStatus.NOT_FOUND)
        }
        await this._ideaRepository.delete({ id })
        return  idea;
    }
}