import { Resolver, Query, Args, ResolveProperty, Parent, Mutation, Context } from "@nestjs/graphql";
import { UserService } from "./user.service";
import { CommentService } from "src/comment/comment.service";
import { UserDTO } from "./user.dto";
import { UseGuards } from "@nestjs/common";
import { AuthGuard } from "src/shared/auth.guard";

@Resolver('User')
export class UserResolver {
    constructor(
        private _userService:UserService,
        private _commentService:CommentService
    ){}
    @Query()
    users(@Args("page") page:number){
        return this._userService.showAll(page)
    }
    
    @Query()
    user(@Args("username") username:string){
        return this._userService.read(username)
    }

    @Query()
    @UseGuards(new AuthGuard())
    whoami(@Context("user") user){
        const {username}= user
        return this._userService.read(username)
    }

    @Mutation()
    login(@Args("username") username:string, @Args("password") password:string){
        const user:UserDTO =  {username, password}
        return this._userService.login(user)
    }

    @Mutation()
    register(@Args("username") username:string, @Args("password") password:string){
        const user:UserDTO ={username, password}
        return this._userService.register(user)
    }

    @ResolveProperty()
    comments(@Parent() user){
        const {id}= user
        return this._commentService.showByUser(id)
    }
}
