import useModalStore from '@/modal/zustand';
import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import api from './apis';
import { QUERY_KEY_ME } from './constants';
import { AuthData, CustomErrorResponse, MeResponse } from './types';

export function useSignUpMutation(): UseMutationResult<MeResponse, Error, AuthData> {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: AuthData) => api.signUp(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY_ME] });
    },
  });
}

export function useLogInMutation(): UseMutationResult<MeResponse, Error, AuthData> {
  const queryClient = useQueryClient();
  const { openModal } = useModalStore();
  return useMutation({
    mutationFn: (data: AuthData) => api.logIn(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY_ME] });
    },
    onError: (error: AxiosError) => {
      if (error.response?.status === 401) {
        if ((error.response.data as CustomErrorResponse).message === '존재하지 않는 유저입니다.') {
          openModal({
            type: 'error',
            message: '존재하지 않는 유저입니다.\n아이디 또는 비밀번호를 확인해주세요.',
          });
        }
        if (
          (error.response.data as CustomErrorResponse).message === '비밀번호가 일치하지 않습니다.'
        ) {
          openModal({
            type: 'error',
            message: '비밀번호가 일치하지 않습니다.\n아이디 또는 비밀번호를 확인해주세요.',
          });
        }
      }
    },
  });
}

export function useChangeProfileMutation(): UseMutationResult<MeResponse, Error, AuthData> {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: AuthData) => api.changeProfile(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY_ME] });
    },
  });
}
