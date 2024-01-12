import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { DbService } from 'src/db/db.service';
import { UserDetailDto } from 'src/dto/auth.dto';
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
    constructor(
        private readonly prisma:DbService, 
        private readonly jwtService:JwtService
    ){}
    async registerUser(userDetailDto:UserDetailDto){
        const { email, password } = userDetailDto

        // check if user with similar email already exists
        const user = await this.prisma.user.findUnique({ where: { email }})
        if(user) throw new BadRequestException('User with similar email already exists')

        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = await this.prisma.user.create({
            data:{
                email,
                password: hashedPassword
            }
        })

        const payload = {
            id: (await newUser).id
        }

        return {
            data: await this.jwtService.signAsync(payload),
            message: 'You have successfully logged in this user'
        }


    }

    async loginUser(userDetailDto:UserDetailDto){
        const { email, password } = userDetailDto

        // check if user with similar email already exists
        const user = await this.prisma.user.findUnique({ where: { email }})
        if(!user) throw new NotFoundException('No user with such email was found')

        if(user && (await bcrypt.compare(password, user.password))){
            const payload = {
                id: user.id
            }
            return {
                data: await this.jwtService.signAsync(payload),
                message: 'You have successfully logged in this user'
            }
        }else throw new BadRequestException('Invalid username or password')
    }
}
