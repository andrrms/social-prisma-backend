import { UserPermission } from '@prisma/client';
import { JwtPayload } from 'jsonwebtoken';

export interface IUserLoginRequest {
  login: string;
  password: string;
}

export interface ILoginResponse {
  accessToken: string;
  refreshToken: string;
}

export interface TokenPayload extends JwtPayload {
  permission: UserPermission;
  username: string;
}
