import { useQuery } from '@tanstack/react-query'

export function useMovies(fetcher, dependencies = []) {
  const key = ['movies', ...dependencies]
  const { data, isLoading, error } = useQuery({
    queryKey: key,
    queryFn: fetcher,
    keepPreviousData: true,
  })
  return { data, loading: isLoading, error }
}
