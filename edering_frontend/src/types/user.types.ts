export enum SocialAuthProvider {
  google = 'GOOGLE',
}

export interface IUserProfile {
  displayName?: string;
  email?: string;
  phoneNumber?: string;
  photoURL?: string;
}

export enum UserRoles {
  admin = 'ADMIN',
  user = 'USER',
}

export interface IUserData {
  id?: string;
  auth_id?: string;
}

export interface UserStore {
  isLoading?: boolean;
  userData?: IUserData;
  isCheckingLoginStatus: boolean;
}
