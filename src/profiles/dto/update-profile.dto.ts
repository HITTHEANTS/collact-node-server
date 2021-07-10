class UpdateProfileBase {
  contact?: string;
  intro?: string;
  detail?: string;
  email?: string;
  phone?: string;
}

export class UpdateProfileDto extends UpdateProfileBase {}

export class UpdateProfileDao extends UpdateProfileBase {
  photo?: string;
}
