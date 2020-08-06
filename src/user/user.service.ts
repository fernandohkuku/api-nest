import { UserDTO, UserRO } from './user.dto';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(UserEntity) private _userRepository:Repository<UserEntity>
    ){}

    async showAll():Promise<UserRO[]>{
        const users = await this._userRepository.find()
        return users.map(user=> user.toResponseObject(false))
    }
    async login(data:UserDTO):Promise<UserRO>{
        const {username, password} = data
        const user = await this._userRepository.findOne({where:{username}})

        if(!user || !(await user.comparePassword(password))){
            throw new HttpException("invalid us ername/password", HttpStatus.BAD_REQUEST)
        }

        return user.toResponseObject()
    }
    async register(data:UserDTO):Promise<UserRO>{
        const {username} = data
        let user = await this._userRepository.findOne({where:{username}})
        if(user){
            throw new HttpException("user already exist", HttpStatus.BAD_REQUEST)
        }
        user = await this._userRepository.create(data)
        await this._userRepository.save(user)
        return user.toResponseObject()
    }



}
