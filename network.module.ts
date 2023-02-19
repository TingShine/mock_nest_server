import { Module } from '@nestjs/common'
import { ProjectModule } from './project/project.module'
import { MockModule } from './mock/mock.module'

@Module({
  imports: [ProjectModule, MockModule],
})
export class NetworkModule {

}
