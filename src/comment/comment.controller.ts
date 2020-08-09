import { Controller, Get, Param, Post, UseGuards, ValidationPipe, UsePipes, Body, Delete, Query } from '@nestjs/common';
import { CommentService } from './comment.service';
import { AuthGuard } from 'src/shared/auth.guard';
import { User } from 'src/user/user.decorator';
import { CommentDTO } from './comment.dto';

@Controller('api/v1/comment')
export class CommentController {
    constructor(private _commentService:CommentService){}

    @Get("idea/:id")
    showCommentsByIdea(@Param("id") idea:string, @Query("page") page:number){
        return this._commentService.showByIdea(idea, page);
    }

    @Get("user/:id")
    showCommentsByUser(@Param("id") user, @Query("page") page:number){
        return this._commentService.showByUser(user, page);
    }


    @Post('comment/:id')
    @UseGuards(new AuthGuard())
    @UsePipes(new ValidationPipe())
    createComment(@Param("id") idea:string,@User("id") user, @Body() data:CommentDTO){
        return this._commentService.create(idea, user, data)
    }


    @Get("comment/:id")
    showComment(@Param("id") id:string){
        return this._commentService.show(id)
    }

    @Delete("comment/:id")
    @UseGuards(new AuthGuard())
    destroyComment(@Param("id") id:string, @User("id") user:string){
        return this._commentService.destroy(id, user)
    }

}
