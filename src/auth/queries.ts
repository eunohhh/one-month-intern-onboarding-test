import type { UseQueryResult } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';
import api from './apis';
import { QUERY_KEY_ME } from './constants';
import { MeResponse } from './types';

export function useMeQuery(accessToken: string | null): UseQueryResult<MeResponse | null, Error> {
  return useQuery<MeResponse | null, Error>({
    queryKey: [QUERY_KEY_ME],
    queryFn: () => api.getUser(),
    enabled: !!accessToken,
    staleTime: 10 * 60 * 1000,
    refetchInterval: 10 * 60 * 1000,
  });
}
