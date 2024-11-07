import { useQueryClient } from '@tanstack/react-query';
import { useCallback, useEffect } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { QUERY_KEY_ME } from './constants';
import { useChangeProfileMutation, useLogInMutation, useSignUpMutation } from './mutations';
import { useMeQuery } from './queries';
import { useAuthStore } from './zustand';

function useAuth() {
  const accessToken: string | null = localStorage.getItem('one-month-intern-token');
  const queryClient = useQueryClient();
  const { me, setMe, logOut } = useAuthStore(
    useShallow((state) => ({
      me: state.me,
      setMe: state.setMe,
      logOut: state.logOut,
    })),
  );

  const { mutateAsync: signUp } = useSignUpMutation();
  const { mutateAsync: logIn } = useLogInMutation();
  const { mutateAsync: changeProfile } = useChangeProfileMutation();
  const { data: meFromQuery, isPending: isMePending } = useMeQuery(accessToken);

  const signOut = useCallback(() => {
    queryClient.setQueryData([QUERY_KEY_ME], null);
    logOut();
  }, [logOut, queryClient]);

  useEffect(() => {
    if (meFromQuery) {
      if (meFromQuery && meFromQuery.id && meFromQuery.nickname) {
        setMe({
          userId: meFromQuery.id,
          avatar: meFromQuery.avatar ? meFromQuery.avatar : null,
          nickname: meFromQuery.nickname,
        });
      } else {
        signOut();
        console.log('토큰 만료, 다시 로그인 하세요');
      }
    }
  }, [meFromQuery, setMe, signOut]);

  return {
    me,
    isMePending,
    signUp,
    logIn,
    changeProfile,
    signOut,
  };
}

export default useAuth;
