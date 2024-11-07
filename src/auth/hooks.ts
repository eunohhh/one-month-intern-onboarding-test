import useModalStore from '@/modal/zustand';
import { useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useCallback, useEffect } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { QUERY_KEY_ME } from './constants';
import { useChangeProfileMutation, useLogInMutation, useSignUpMutation } from './mutations';
import { useMeQuery } from './queries';
import { CustomErrorResponse } from './types';
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
  const { openModal } = useModalStore();
  const { mutateAsync: signUp, error: signUpError } = useSignUpMutation();
  const { mutateAsync: logIn, error: logInError } = useLogInMutation();
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

  useEffect(() => {
    if (logInError instanceof AxiosError) {
      if (logInError.response?.status === 401) {
        if (
          (logInError.response.data as CustomErrorResponse).message === '존재하지 않는 유저입니다.'
        ) {
          openModal({
            type: 'error',
            message: '존재하지 않는 유저입니다.\n아이디 또는 비밀번호를 확인해주세요.',
          });
        }
        if (
          (logInError.response.data as CustomErrorResponse).message ===
          '비밀번호가 일치하지 않습니다.'
        ) {
          openModal({
            type: 'error',
            message: '비밀번호가 일치하지 않습니다.\n아이디 또는 비밀번호를 확인해주세요.',
          });
        }
      }
    }
  }, [logInError, openModal]);

  useEffect(() => {
    if (signUpError instanceof AxiosError) {
      if (signUpError.response?.status === 409) {
        if (
          (signUpError.response.data as CustomErrorResponse).message ===
          '이미 존재하는 유저 id입니다.'
        ) {
          openModal({
            type: 'error',
            message: '이미 존재하는 아이디입니다.',
          });
        }
      }
    }
  }, [signUpError, openModal]);

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
