import { ValidationPipe } from './../shared/validation.pipe';
import { UserService } from './user.service';
import { Controller, Post, Get, Body, UsePipes } from '@nestjs/common';

@Controller('api/v1/user/')
export class UserController {

    constructor(private _userService: UserService) {

    }

    @Get('users')
    showAllUsers() {
        return this._userService.showAll();
    }

    @Post('login')
    @UsePipes(new ValidationPipe)
    login(@Body() data) {
        return this._userService.login(data);
    }

    @Post('register')
    @UsePipes(new ValidationPipe)
    register(@Body() data) {
        return this._userService.register(data)
    }


}
