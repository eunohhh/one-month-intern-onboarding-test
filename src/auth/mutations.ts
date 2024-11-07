import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';
import api from './apis';
import { QUERY_KEY_ME } from './constants';
import { AuthData, MeResponse } from './types';

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
  return useMutation({
    mutationFn: (data: AuthData) => api.logIn(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY_ME] });
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
