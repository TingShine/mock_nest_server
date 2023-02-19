import { NestFactory } from '@nestjs/core'
import { ExpressAdapter, NestExpressApplication } from '@nestjs/platform-express'
import morgan from 'morgan'
import helmet from 'helmet'
import { ValidationPipe } from '@nestjs/common'
import { NetworkModule } from './network.module'
import { ResponseTransformInterceptor } from './response.transformer'
import { AllExceptionFilter } from './all-exception.filter'

export async function nestBootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(NetworkModule, new ExpressAdapter(), { cors: true })

  app.use(morgan('tiny'))

  app.enableCors()

  app.use(helmet())

  app.useGlobalFilters(new AllExceptionFilter())
  app.useGlobalInterceptors(new ResponseTransformInterceptor())
  app.useGlobalPipes(new ValidationPipe())

  const port = 8999
  const hostName = '0.0.0.0'
  await app.listen(port, hostName, async () => {
    console.log(`server is running at http://${hostName}:${port}`)
  })
}
