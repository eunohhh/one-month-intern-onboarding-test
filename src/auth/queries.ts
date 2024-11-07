import type { UseQueryResult } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';
import api from './apis';
import { QUERY_KEY_ME } from './constants';
import { MeResponse } from './types';

export function useMeQuery(): UseQueryResult<MeResponse | null, Error> {
  return useQuery<MeResponse | null, Error>({
    queryKey: [QUERY_KEY_ME],
    queryFn: api.getUser,
    staleTime: Infinity,
    retry: 0,
  });
}
