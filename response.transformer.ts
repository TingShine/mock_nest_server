import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common'
import { map } from 'rxjs/operators'
import { Observable } from 'rxjs'
import { Reflector } from '@nestjs/core'
interface Response<T> {
  data: T
}
@Injectable()
export class ResponseTransformInterceptor<T>
implements NestInterceptor<T, Response<T>> {
  private reflector: Reflector = new Reflector()

  intercept(
    context: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<Response<T>> | Observable<any> {
    return next.handle().pipe(
      map((data) => {
        return {
          data,
          code: 200,
          message: 'Success',
        }
      }),
    )
  }
}
