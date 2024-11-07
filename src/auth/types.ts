export interface AuthData {
  id?: string;
  password?: string;
  nickname?: string;
  avatar?: File;
}

export interface Me {
  userId: string;
  avatar: string | null;
  nickname: string;
}
export interface MeResponse {
  accessToken?: string;
  userId?: string;
  avatar?: string;
  nickname?: string;
  success: boolean;
}

export interface IAuthStore {
  me: Me | null;
  setMe: (me: Me | null) => void;
  logOut: () => void;
}

export interface CustomErrorResponse {
  message: string;
}
