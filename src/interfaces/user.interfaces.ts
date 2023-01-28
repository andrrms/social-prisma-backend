import { User, UserPermission } from '@prisma/client';

export interface IUserRequest extends Partial<User> {
  name: string;
  username: string;
  email: string;
  password: string;
  birthDate: Date;
  biography?: string;
  localization?: string;
  site?: string;
  avatarUrl?: string;
}

export type UserRequest = Pick<User, keyof IUserRequest>;

export type UserWithoutPassword<UserLike extends User = User> = Omit<
  UserLike,
  'password'
>;

export type _UserWithCount<T extends User = User> = T & {
  _count: {
    followers: number;
    following: number;
  };
};

export interface SensibleUserInfo extends Partial<User> {
  password: string;
  permission: UserPermission;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type FormattedUser<T extends User = User> = Omit<
  T,
  keyof SensibleUserInfo
> & {
  followersCount: number;
  followingCount: number;
};

export interface SearchUser extends Partial<User> {
  id: string;
  name: string;
  username: string;
  birthDate: Date;
  biography: string | null;
  localization: string | null;
  site: string | null;
  avatarUrl: string | null;
  followersCount: number;
  followingCount: number;
  isFollowing: boolean;
}
