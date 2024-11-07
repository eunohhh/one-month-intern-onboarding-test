export type AuthData = {
  id?: string;
  password?: string;
  nickname?: string;
  avatar?: File;
};

export type Me = {
  userId: string;
  avatar: string | null;
  nickname: string;
};
export type MeResponse = {
  accessToken?: string;
  userId?: string;
  id?: string;
  avatar?: string;
  nickname?: string;
  success: boolean;
};

export type AuthStore = {
  me: Me | null;
  setMe: (me: Me | null) => void;
  logOut: () => void;
};

export type CustomErrorResponse = {
  message: string;
};
