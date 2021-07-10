import { ApiProperty, PartialType } from '@nestjs/swagger';

import { CreateProjectDto } from './dto/create-project.dto';

export class ProjectPostBody extends PartialType(CreateProjectDto) {
  @ApiProperty({ type: 'string', format: 'binary', required: true })
  photos: any;
}
