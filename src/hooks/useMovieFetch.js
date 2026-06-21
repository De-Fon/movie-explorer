import { useQuery } from '@tanstack/react-query'

export default function useMovieFetch(keyParts, fetcher, options = {}) {
  const queryKey = Array.isArray(keyParts) ? ['movie', ...keyParts] : ['movie', keyParts]

  const query = useQuery({
    queryKey,
    queryFn: fetcher,
    staleTime: options.staleTime ?? 1000 * 60 * 5,
    retry: options.retry ?? 1,
    retryDelay: options.retryDelay ?? 1000,
    onError: options.onError,
    enabled: options.enabled ?? true,
  })

  return {
    data: query.data,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    error: query.error,
    refetch: query.refetch,
  }
}
