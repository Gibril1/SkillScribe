import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { CreateProjectDto } from 'src/dto/projects.dto';

@Injectable()
export class ProjectsService {
    constructor(private readonly prisma:DbService){}

    async findAll(id:string){
        return await this.prisma.projects.findMany({ where: { orgsId: id }})
    }

    async findOne(id: string){
        return await this.prisma.projects.findUnique({ where: { id } })
    }

    async create(createProjectDto:CreateProjectDto, userId:string){
        return await this.prisma.projects.create({ data: { userId, ...createProjectDto }})
    }

    async update(id: string, createProjectDto:CreateProjectDto, userId:string){
        const project = await this.findOne(id)
        if(!project) throw new NotFoundException('Project does not exist')
        if(project.userId !== userId) throw new UnauthorizedException('You are not authorised to update this')
        return await this.prisma.projects.update({ where: { id }, data: { userId, ...createProjectDto}})
    }

    async delete(id: string, userId:string){
        const project = await this.findOne(id)
        if(!project) throw new NotFoundException('Project does not exist')
        if(project.userId !== userId) throw new UnauthorizedException('You are not authorised to update this')
        return await this.prisma.projects.delete({ where: { id }})
    }
}
