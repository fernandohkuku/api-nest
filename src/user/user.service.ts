import { UserDTO, UserRO } from './user.dto';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(UserEntity) private _userRepository: Repository<UserEntity>
    ) { }

    async showAll(page: number = 1): Promise<UserRO[]> {
        const users = await this._userRepository.find({
            relations: ["ideas", 'bookmarks'],
            take: 25,
            skip: 25 * (page - 1)
        })
        return users.map(user => user.toResponseObject(false))
    }

    async read(username: string) {
        const user = await this._userRepository.findOne({
            where: { username },
            relations: ["ideas", "bookmarks"]
        })
        return user.toResponseObject(false)
    }

    async login(data: UserDTO): Promise<UserRO> {
        const { username, password } = data
        const user = await this._userRepository.findOne({ where: { username } })

        if (!user || !(await user.comparePassword(password))) {
            throw new HttpException("invalid username/password", HttpStatus.BAD_REQUEST)
        }

        return user.toResponseObject()
    }
    async register(data: UserDTO): Promise<UserRO> {
        const { username } = data
        let user = await this._userRepository.findOne({ where: { username } })
        if (user) {
            throw new HttpException("user already exist", HttpStatus.BAD_REQUEST)
        }
        user = await this._userRepository.create(data)
        await this._userRepository.save(user)
        return user.toResponseObject()
    }



}
