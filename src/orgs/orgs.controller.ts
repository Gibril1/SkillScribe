import { Body, Controller, Delete, Get, Param, Post, Put, Request, UseGuards, ValidationPipe } from '@nestjs/common';
import { OrgsService } from './orgs.service';
import { CreateOrgsDto } from 'src/dto/orgs.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('api/v1/orgs')
export class OrgsController {
    constructor(private readonly orgsService:OrgsService){}
    @UseGuards(AuthGuard)
    @Get()
    findAll(@Request() req){
        // this route returns all orgs that belong to the logged in user
        const userId:string = req.user.id
        return this.orgsService.findAll(userId)
    }

    @UseGuards(AuthGuard)
    @Post()
    create(@Body(new ValidationPipe()) createOrgsDto:CreateOrgsDto, @Request() req){
        const userId:string = req.user.id
        return this.orgsService.create(createOrgsDto, userId)
    }

    @UseGuards(AuthGuard)
    @Get(':id')
    findOne(@Param('id') id:string){
        return this.orgsService.findOne(id)
    }

    @UseGuards(AuthGuard)
    @Put(':id')
    update(@Param('id') id:string, @Body(new ValidationPipe()) createOrgsDto:CreateOrgsDto, @Request() req){
        const userId:string = req.user.id
        return this.orgsService.update(id, createOrgsDto, userId)
    }

    @UseGuards(AuthGuard)
    @Delete(':id')
    delete(@Param('id') id:string, @Request() req){
        const userId:string = req.user.id
        return this.orgsService.delete(id, userId)
    }
}
