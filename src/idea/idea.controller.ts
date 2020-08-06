import { ValidationPipe } from './../shared/validation.pipe';
import { IdeaDTO } from './idea.dto';
import { Controller, Get, Post, Put, Delete, Body, Param, UsePipes, Logger } from '@nestjs/common';
import { IdeaService } from './idea.service';

@Controller('api/v1/idea')
export class IdeaController {
    private logger = new Logger('IdeaController')
    constructor(private _ideaService:IdeaService){}
    
    @Get()
    showAllIdeas(){
        return this._ideaService.showAll()
    }

    @Post()
    @UsePipes(new ValidationPipe)
    createIdea(@Body() data:IdeaDTO){
        this.logger.log(JSON.stringify(data))
        return this._ideaService.create(data)
    }

    @Get(':id')
    readIdea(@Param("id") id:string){
        return this._ideaService.read(id)
    }

    @Put(':id')
    @UsePipes(new ValidationPipe)
    updateIdea(@Param("id")id:string, @Body() data:Partial<IdeaDTO>){
        this.logger.log(JSON.stringify(data))
        return this._ideaService.update(id, data)
    }

    @Delete(':id')
    destroyIdea(@Param("id") id:string){
        return this._ideaService.destroy(id)
    }
}
