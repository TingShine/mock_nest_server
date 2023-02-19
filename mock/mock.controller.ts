import { BadRequestException, Controller, Get, Param } from '@nestjs/common'
import { ProjectService } from '../project/project.servvice'

@Controller('mock')
export class MockController {
  constructor(private readonly projectService: ProjectService) {}

  @Get('/:projectId/:api')
  mockGetApi(@Param('projectId') projectId: string, @Param('api') api: string) {
    if (!this.projectService.isProjectIdExists(projectId))
      throw new BadRequestException('Project not found')

    return { projectId, api }
  }
}
