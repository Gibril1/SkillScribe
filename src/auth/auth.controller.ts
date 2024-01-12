import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { UserDetailDto } from 'src/dto/auth.dto';
import { AuthService } from './auth.service';

@Controller('api/v1/auth')
export class AuthController {

    constructor(private readonly authService:AuthService){}

    @Post('register')
    async registerUser(@Body(ValidationPipe) userDetailDto:UserDetailDto){
        return this.authService.registerUser(userDetailDto)
    }

    @Post('login')
    async loginUser(@Body(ValidationPipe) userDetailDto:UserDetailDto){
        return this.authService.loginUser(userDetailDto)
    }
}
