export class CreateProjectDto{
    name: string
    description: string
    startDate?: Date
    endDate?: Date
    role: string
    orgsId: string
}