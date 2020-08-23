import { ValidationPipe } from './../shared/validation.pipe';
import { IdeaDTO } from './idea.dto';
import { Controller, Get, Post, Put, Delete, Body, Param, UsePipes, Logger, UseGuards, Query } from '@nestjs/common';
import { IdeaService } from './idea.service';
import { AuthGuard } from '../shared/auth.guard';
import {User} from "../user/user.decorator"
import { query } from 'express';

@Controller('ideas/')
export class IdeaController {
    private logger = new Logger('IdeaController')
    constructor(private _ideaService:IdeaService){}
    
    @Get()
    showAllIdeas(@Query("page") page:number){
        return this._ideaService.showAll(page)
    }

    @Get("newest")
    showNewestIdeas(@Query("page") page:number){
        return this._ideaService.showAll(page, true )
    }

    @Post()
    @UseGuards(new AuthGuard())
    @UsePipes(new ValidationPipe)
    createIdea(@User("id") user,@Body() data:IdeaDTO){
        this.logger.log(JSON.stringify(data))
        return this._ideaService.create(user, data)
    }

    @Get(':id')
    readIdea(@Param("id") id:string){
        return this._ideaService.read(id)
    }

    @Put(':id')
    @UseGuards(new AuthGuard())
    @UsePipes(new ValidationPipe)
    updateIdea(@Param("id")id:string, @User('id') user:string, @Body() data:Partial<IdeaDTO>){
        this.logger.log(JSON.stringify(data))
        return this._ideaService.update(id, user, data)
    }

    @Delete(':id')
    @UseGuards(new AuthGuard())
    destroyIdea(@Param("id") id:string, @User("id") user){
        return this._ideaService.destroy(id,user)
    }

    @Post(':id/upvote')
    @UseGuards(new AuthGuard())
    upvoteIdea(@Param("id") id:string, @User("id") user:string){
        return this._ideaService.upvote(id, user);
    }

    @Post(':id/downvote')
    @UseGuards(new AuthGuard())
    downvoteIdea(@Param("id") id:string, @User("id") user:string){
    
        return this._ideaService.downvote(id, user);
    }

    @Post(':id/bookmark')
    @UseGuards(new AuthGuard())
    bookmarkIdea(@Param('id') id:string, @User('id') userId:string){
        return this._ideaService.bookmark(id, userId);
    }


    @Delete(':id/bookmark')
    @UseGuards(new AuthGuard())
    unbookmarkIdea(@Param('id') id:string, @User('id') userId:string){
        return this._ideaService.unbookmark(id, userId);
    }

}
