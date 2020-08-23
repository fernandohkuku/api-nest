import { ValidationPipe } from './../shared/validation.pipe';
import { UserService } from './user.service';
import { Controller, Post, Get, Body, UsePipes, UseGuards, Query, Param } from '@nestjs/common';
import { AuthGuard } from '../shared/auth.guard';
import { User } from './user.decorator';

@Controller()
export class UserController {

    constructor(private _userService: UserService) {

    }

    @Get('api/users')
    showAllUsers(@Query('page') page: number) {
        return this._userService.showAll(page);
    }

    @Get("api/user/:username")
    showOneUser(@Param('username') username: string) {
        return this._userService.read(username);
    }

    @Get('auth/whoami')
    @UseGuards(new AuthGuard())
    showMe(@User('username') username: string) {
        return this._userService.read(username);
    }

    @Post('auth/login')
    @UsePipes(new ValidationPipe)
    login(@Body() data) {
        return this._userService.login(data);
    }

    @Post('auth/register')
    @UsePipes(new ValidationPipe)
    register(@Body() data) {
        return this._userService.register(data)
    }


}
