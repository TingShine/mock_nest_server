import { Module } from '@nestjs/common'
import { ProjectModule } from '../project/project.module'
import { ProjectService } from '../project/project.servvice'
import { MockController } from './mock.controller'
import { MockService } from './mock.service'

@Module({
  imports: [ProjectModule],
  providers: [ProjectService, MockService],
  controllers: [MockController],
})
export class MockModule {

}
