import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common'
import { CreateProjectDTO } from './dto/create-project.dto'
import { ProjectService } from './project.servvice'

@Controller('project')
export class ProjectController {
  constructor(
    private readonly projectService: ProjectService,
  ) { }

  @Get('/')
  async getProjectList() {
    return await this.projectService.getAllProjects()
  }

  @Post('/')
  async createProject(@Body() body: CreateProjectDTO) {
    const project = await this.projectService.createOneProject(body)
    return project
  }

  @Delete('/:projectId')
  async deleteProject(@Param('projectId') projectId: string) {
    return await this.projectService.deleteOneProject(projectId)
  }
}
