import crypto from 'crypto'
import { BadRequestException, Injectable } from '@nestjs/common'
import Store from 'electron-store'
import { ICreateProjectParams } from './dto/create-project.dto'
import { type IProjectItem } from './dto/project.dto'

@Injectable()
export class ProjectService {
  private store = new Store({ name: 'project', defaults: [] })

  // 获取所有project
  getAllProjects(): IProjectItem[] {
    return this.store.get('projects') as IProjectItem[] || []
  }

  // 判断project是否存在
  isProjectIdExists(projectId: string): boolean {
    const projects = this.getAllProjects()
    return projects.some(project => project.id === projectId)
  }

  // 创建project
  async createOneProject(projectParams: ICreateProjectParams) {
    const projects = this.getAllProjects()

    if (projects.some(pro => pro.name === projectParams.name))
      throw new BadRequestException('Project with this name already exists')

    const hash = crypto.createHash('md5').update(projectParams.name).digest('hex')
    const project = {
      id: hash,
      name: projectParams.name,
      description: projectParams.description || '',
      active: true,
      mockAPI: [],
    }

    projects.push(project)
    this.store.set('projects', projects)

    return project
  }

  // 删除project
  async deleteOneProject(projectId: string) {
    const projects: IProjectItem[] = await this.store.get('projects')

    const index = projects.findIndex(project => project.id === projectId)

    if (index === -1)
      throw new BadRequestException(`Project ${projectId} not found`)

    projects.splice(index, 1)
    this.store.set('projects', projects)

    return true
  }
}
