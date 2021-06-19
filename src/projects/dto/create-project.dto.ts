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
  @IsNotEmpty()
  areas: string;
  @IsNotEmpty()
  collaborators: string;
}

export class CreateProjectDaoHelper extends CreateProjectBase {
  @IsNotEmpty()
  areas: string;
  @IsNotEmpty()
  collaborators: string;
  photos?: string;
}

export class CreateProjectDao extends CreateProjectBase {
  @IsNotEmpty()
  areas: ProjectArea[];
  @IsNotEmpty()
  collaborators: Profile[];
  photos?: ProjectPhoto[];
}
