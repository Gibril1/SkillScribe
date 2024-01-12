import { Injectable, NotFoundException } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { CreateOrgsDto } from 'src/dto/orgs.dto';

@Injectable()
export class OrgsService {
    constructor(private readonly prisma:DbService){}
    async findAll(){
        return await this.prisma.organization.findMany()
    }

    async create(createOrgsDto:CreateOrgsDto){
        return await this.prisma.organization.create({ data: createOrgsDto})
    }

    async findOne(id: string){
        return await this.prisma.organization.findUnique({ where: { id }})
    }

    async update(id: string, createOrgsDto:CreateOrgsDto){
        const orgs = await this.findOne(id)
        if(!orgs) throw new NotFoundException('Organization could not be found')
        return await this.prisma.organization.update({ where: { id }, data: createOrgsDto})
    }

    async delete(id: string){
        const orgs = await this.findOne(id)
        if(!orgs) throw new NotFoundException('Organization could not be found')
        return await this.prisma.organization.delete({ where: { id }})
    }
}
