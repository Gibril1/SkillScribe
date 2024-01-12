import { Body, Controller, Delete, Get, Param, Post, Put, Request, UseGuards, ValidationPipe } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateProjectDto } from 'src/dto/projects.dto';

@Controller('api/v1/projects')
export class ProjectsController {
    constructor(private readonly projectService:ProjectsService){}
    @UseGuards(AuthGuard)
    @Post()
    create(@Body(new ValidationPipe()) createProjectDto:CreateProjectDto, @Request() req){
        return this.projectService.create(createProjectDto, req.user.id)
    }

    @Get(':id')
    findAll(@Param('id') id:string){
        return this.projectService.findAll(id)
    }

    @Get(':id')
    findOne(@Param('id') id:string){
        return this.projectService.findOne(id)
    }

    @UseGuards(AuthGuard)
    @Delete(':id')
    delete(@Param('id') id:string, @Request() req){
        return this.projectService.delete(id, req.user.id)
    }

    @UseGuards(AuthGuard)
    @Put(':id')
    update(@Param('id') id:string, @Body(new ValidationPipe()) createProjectDto:CreateProjectDto, @Request() req){
        return this.projectService.update(id, createProjectDto, req.user.id)
    }
}
