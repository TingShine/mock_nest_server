/* eslint-disable @typescript-eslint/ban-ts-comment */
import { ArgumentsHost, BadRequestException, ExceptionFilter, HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common'
import { HTTPError } from 'got'

const mapErrorStatus = (message: string): HttpStatus => {
  if (message.includes('400'))
    return HttpStatus.BAD_REQUEST

  else if (message.includes('401'))
    return HttpStatus.UNAUTHORIZED

  else if (message.includes('403'))
    return HttpStatus.FORBIDDEN

  else if (message.includes('409'))
    return HttpStatus.BAD_REQUEST

  else
    return HttpStatus.INTERNAL_SERVER_ERROR
}

@Injectable()
export class AllExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse()

    console.log(exception)

    Logger.error(exception)

    const isHttpException = exception instanceof HttpException
    const message = !isHttpException ? (exception?.message || '') : exception.message
    const status = isHttpException ? exception.getStatus() : mapErrorStatus(message)

    let errMsg = message
    const isBadRequest = exception instanceof BadRequestException
    const isHttpError = exception instanceof HTTPError
    if (isBadRequest) {
      const badRequest = (exception as BadRequestException).getResponse()
      if (typeof badRequest === 'object') {
        const { message } = (badRequest as any)
        errMsg = Array.isArray(message) ? (message[0] || '') : message
      }
    }
    // @ts-expect-error
    else if (isHttpError && exception.description) {
      // @ts-expect-error
      const description = exception.description
      const isObject = typeof description === 'object'
      if (isObject) {
        const entry = Object.entries(description)[0] || []
        errMsg = entry.length !== 0 ? `${entry[0]}: ${entry[1]}` : errMsg
      }
      else if (typeof description === 'string') {
        errMsg = description
      }
    }

    const errorResponse = {
      code: -1,
      message: errMsg,
    }

    response.status(status)
    response.send(errorResponse)
  }
}
