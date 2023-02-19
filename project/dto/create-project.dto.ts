import { IsNotEmpty, IsOptional, IsString } from 'class-validator'

export interface ICreateProjectParams {
  name: string
  description?: string
}

export class CreateProjectDTO {
  @IsString()
  @IsNotEmpty()
  name: string

  @IsString()
  @IsOptional()
  description?: string
}
