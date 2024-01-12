import { Body, Controller, Delete, Get, Param, Post, Put, ValidationPipe } from '@nestjs/common';
import { OrgsService } from './orgs.service';
import { CreateOrgsDto } from 'src/dto/orgs.dto';

@Controller('api/v1/orgs')
export class OrgsController {
    constructor(private readonly orgsService:OrgsService){}
    @Get()
    findAll(){
        return this.orgsService.findAll()
    }

    @Post()
    create(@Body(new ValidationPipe()) createOrgsDto:CreateOrgsDto){
        return this.orgsService.create(createOrgsDto)
    }

    @Get(':id')
    findOne(@Param('id') id:string){
        return this.orgsService.findOne(id)
    }

    @Put(':id')
    update(@Param('id') id:string, @Body(new ValidationPipe()) createOrgsDto:CreateOrgsDto){
        return this.orgsService.update(id, createOrgsDto)
    }

    @Delete(':id')
    delete(@Param('id') id:string){
        return this.orgsService.delete(id)
    }
}
