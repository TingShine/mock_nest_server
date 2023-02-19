import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class CreateUrlDTO {
  @IsString()
  @IsNotEmpty()
  projectId: string

  @IsString()
  @IsEnum({
    values: ['GET', 'POST', 'PUT'],
  })
  method: 'GET' | 'POST' | 'PUT'

  @IsString()
  @IsNotEmpty()
  url: string

  @IsString()
  @IsOptional()
  description?: string

  @IsString()
  @IsNotEmpty()
  template: string
}
