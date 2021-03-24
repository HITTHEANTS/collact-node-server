import { User } from '../../users/user.entity';

type JwtPayloadDto = Pick<User, 'id' | 'uid' | 'nickname'>;

export { JwtPayloadDto };
