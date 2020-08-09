import { Resolver, Query, Args, ResolveProperty, Parent } from "@nestjs/graphql";
import { IdeaService } from "./idea.service";
import { CommentService } from "src/comment/comment.service";

@Resolver('Idea')
export class IdeaResolver {
    constructor(
        private _ideaService:IdeaService,
        private _commentService:CommentService
    ){}
    @Query()
    ideas(@Args("page") page:number, @Args("newest") newest:boolean){
        return this._ideaService.showAll(page, newest)
    }

    @ResolveProperty()
    comments(@Parent() idea){
        const {id} = idea
        return this._commentService.showByIdea(id)
    }
}
