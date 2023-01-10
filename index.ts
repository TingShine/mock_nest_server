import { NestFactory } from '@nestjs/core'
import { ExpressAdapter, NestExpressApplication } from '@nestjs/platform-express'
import { NetworkModule } from './network.module'

export async function nestBootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(NetworkModule, new ExpressAdapter(), { cors: true })

  app.enableCors()

  const port = 8999
  const hostName = '0.0.0.0'
  await app.listen(port, hostName, async () => {
    console.log(`server is running at http://${hostName}:${port}`)
  })
}
