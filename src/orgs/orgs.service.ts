import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { CreateOrgsDto } from 'src/dto/orgs.dto';

@Injectable()
export class OrgsService {
    constructor(private readonly prisma:DbService){}
    async findAll(userId: string){
        return await this.prisma.organization.findMany({ where: { userId }})
    }

    async create(createOrgsDto:CreateOrgsDto, userId: string){
        return await this.prisma.organization.create({ data: { userId, ...createOrgsDto }})
    }

    async findOne(id: string){
        return await this.prisma.organization.findUnique({ where: { id }})
    }

    async update(id: string, createOrgsDto:CreateOrgsDto, userId:string){
        const orgs = await this.findOne(id)
        if(!orgs) throw new NotFoundException('Organization could not be found')
        if(orgs.userId !== userId) throw new UnauthorizedException('You are not authorised to update this work')
        return await this.prisma.organization.update({ where: { id }, data: createOrgsDto})
    }

    async delete(id: string, userId:string){
        const orgs = await this.findOne(id)
        if(!orgs) throw new NotFoundException('Organization could not be found')
        if(orgs.userId !== userId) throw new UnauthorizedException('You are not authorised to update this work')
        return await this.prisma.organization.delete({ where: { id }})
    }
}
