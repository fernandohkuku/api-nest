import { Resolver, Query, Args, ResolveProperty, Parent, Mutation, Context, ResolveField } from "@nestjs/graphql";
import { IdeaService } from "./idea.service";
import { CommentService } from "src/comment/comment.service";
import { AuthGuard } from "src/shared/auth.guard";
import { UseGuards } from "@nestjs/common";
import { IdeaDTO } from "./idea.dto";

@Resolver('Idea')
export class IdeaResolver {
    constructor(
        private _ideaService: IdeaService,
        private _commentService: CommentService
    ) { }
    @Query()
    async ideas(@Args("page") page: number, @Args("newest") newest: boolean) {
        return await this._ideaService.showAll(page, newest)
    }
    @Query()
    async idea(@Args("id") id: string) {
        return await this._ideaService.read(id)
    }
    @Mutation()
    @UseGuards(new AuthGuard())
    async createIdea(@Args("idea") idea: string, @Args("description") description: string, @Context("user") user) {
        const { id: userId } = user
        const data: IdeaDTO = { idea, description }
        return await this._ideaService.create(userId, data);
    }

    @Mutation()
    @UseGuards(new AuthGuard())
    async updateIdea(@Args("id") id: string,
    @Args("idea") idea: string,
    @Args("description") description: string,
    @Context("user") user) {
        const {id:userId}= user
        const data:IdeaDTO = {idea, description}
        return await this._ideaService.update(id, userId, data)
    }

    @Mutation()
    @UseGuards(new AuthGuard())
    async deleteIdea(@Args("id") id: string,
    @Context("user") user) {
        const {id:userId}= user
        return await this._ideaService.destroy(id, userId)
    }

    @Mutation()
    @UseGuards(new AuthGuard())
    async upvote(@Args("id") id: string,
    @Context("user") user) {
        const {id:userId}= user
        return await this._ideaService.upvote(id,userId)
    }

    @Mutation()
    @UseGuards(new AuthGuard())
    async downvote(@Args("id") id: string,
    @Context("user") user) {
        const {id:userId}= user
        return await this._ideaService.downvote(id,userId)
    }

    @Mutation()
    @UseGuards(new AuthGuard())
    async bookmark(@Args("id") id: string,
    @Context("user") user) {
        const {id:userId}= user
        return await this._ideaService.bookmark(id,userId)
    }

    @Mutation()
    @UseGuards(new AuthGuard())
    async unbookmark(@Args("id") id: string,
    @Context("user") user) {
        const {id:userId}= user
        return await this._ideaService.unbookmark(id,userId)
    }


    @ResolveProperty()
    comments(@Parent() idea) {
        const { id } = idea
        return this._commentService.showByIdea(id)
    }
}
