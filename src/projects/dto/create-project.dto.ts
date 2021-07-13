import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

import { Profile } from '../../profiles/profile.entity';
import { ProjectArea } from '../project-area.entity';
import { ProjectPhoto } from '../project-photo.entity';

class CreateProjectBase {
  @IsNotEmpty()
  title: string;
  detail?: string;
}

export class CreateProjectDto extends CreateProjectBase {
  @ApiProperty({
    description: 'areas 의 id 들을 ,로 연결해서 보내주세요 (example: "1,3,10")',
  })
  @IsNotEmpty()
  areas: string;

  @ApiProperty({
    description:
      'collaborators 의 id 들을 ,로 연결해서 보내주세요 (example: "1,3,10")',
  })
  collaborators: string;
}

export class CreateProjectDaoHelper extends CreateProjectBase {
  @IsNotEmpty()
  areas: string;
  @IsNotEmpty()
  collaborators: string;
  photos?: string[];
}

export class CreateProjectDao extends CreateProjectBase {
  @IsNotEmpty()
  areas: ProjectArea[];
  @IsNotEmpty()
  collaborators: Profile[];
  photos?: ProjectPhoto[];
}
