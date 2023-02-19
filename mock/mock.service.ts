import { BadRequestException, Injectable } from '@nestjs/common'
import Mock from 'mockjs'
import { CreateUrlDTO } from './dto/create-url.dto'
import Store from 'electron-store';

@Injectable()
export class MockService {

  private store = new Store({ name: 'mock', defaults: [] })

  getProjectUrls(projectId: string) {
    const projects = this.store.get('urls') || []
    return projects.filter(pro => pro.projectId === projectId)
  }

  isValid(template: any, data: any): boolean {
    return Mock.valid(template, data)
  }

  generateMockData(template: any) {
    return Mock.mock(template)
  }

  createMockUrl(params: CreateUrlDTO) {
    const { url } = params

    if (/^\/[_a-zA-Z0-9\/]*$/.test(url) || url.includes('//'))
      throw new BadRequestException('url is invalid')
  }
}
