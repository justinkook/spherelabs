import useSWR from 'swr';

import fetcher from '@/libs/fetcher';

const useCollections = (userId?: string) => {
  const url = userId ? `/api/collections?userId=${userId}` : '/api/collections';
  const { data, error, isLoading, mutate } = useSWR(url, fetcher);

  return {
    data,
    error,
    isLoading,
    mutate
  }
};

export default useCollections;
