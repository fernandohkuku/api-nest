import { Resolver, Args, Query, Mutation, Context } from "@nestjs/graphql";
import { CommentService } from "./comment.service";
import { UseGuards } from "@nestjs/common";
import { AuthGuard } from "src/shared/auth.guard";
import { CommentDTO } from "./comment.dto";

@Resolver('Comment')
export class CommentResolver{
    constructor(private _commentService:CommentService){}

    @Query()
    comment(@Args('id') id:string){
        return this._commentService.show(id)
    }
    @Mutation()
    @UseGuards(new AuthGuard())
    createComment(@Args("idea") ideaId:string, @Args("comment") comment:string, @Context("user") user){
        const {id:userId} = user
        const data:CommentDTO = {comment}
        return this._commentService.create(ideaId,userId,data)
    }

    @Mutation()
    @UseGuards(new AuthGuard())
    deleteComment(@Args("id") id:string, @Context("user") user){
        const {id:userId} = user
        return this._commentService.destroy(id,userId)
    }

}