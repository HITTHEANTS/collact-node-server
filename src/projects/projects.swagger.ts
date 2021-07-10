import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';

import { CreateProjectDto } from './dto/create-project.dto';
import { ProjectArea } from './project-area.entity';

export class ProjectPostBody extends PartialType(CreateProjectDto) {
  @ApiProperty({ type: 'string', format: 'binary', required: true })
  photos: any[];
}

export class ProjectsAreaGetResponse extends OmitType(ProjectArea, [
  'projects',
] as const) {}
