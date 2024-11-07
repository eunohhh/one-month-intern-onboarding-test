import { useEffect } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { useChangeProfileMutation, useLogInMutation, useSignUpMutation } from './mutations';
import { useMeQuery } from './queries';
import { useAuthStore } from './zustand';

function useAuth() {
  const { logOut, setMe } = useAuthStore(
    useShallow((state) => ({
      logOut: state.logOut,
      setMe: state.setMe,
    })),
  );

  const { data: meFromQuery, isPending: isMePending } = useMeQuery();
  const { mutateAsync: signUp } = useSignUpMutation();
  const { mutateAsync: logIn } = useLogInMutation();
  const { mutateAsync: changeProfile } = useChangeProfileMutation();

  useEffect(() => {
    if (meFromQuery) {
      try {
        if (meFromQuery && meFromQuery.userId && meFromQuery.nickname) {
          setMe({
            userId: meFromQuery.userId,
            avatar: meFromQuery.avatar ? meFromQuery.avatar : null,
            nickname: meFromQuery.nickname,
          });
        } else {
          console.log('토큰 만료, 다시 로그인 하세요');
        }
      } catch (error) {
        console.log('유저 데이터 가져오기 실패 => ', error);
      }
    }
  }, [meFromQuery, setMe]);

  return {
    me: meFromQuery,
    isMePending,
    signUp,
    logIn,
    changeProfile,
    logOut,
  };
}

export default useAuth;
