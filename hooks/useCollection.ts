import useSWR from 'swr';

import fetcher from '@/libs/fetcher';

const useCollection = (collectionId: string) => {
  const { data, error, isLoading, mutate } = useSWR(collectionId ? `/api/collections/${collectionId}` : null, fetcher);

  return {
    data,
    error,
    isLoading,
    mutate
  }
};

export default useCollection;
