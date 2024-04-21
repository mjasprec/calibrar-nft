import { GET_NFTS } from '@/graphql/actions/getNfts.action';
import { useQuery } from '@apollo/client';

function useNfts() {
  const { loading, data } = useQuery(GET_NFTS);

  return {
    loading,
    nfts: data?.GetAllNft,
  };
}

export default useNfts;
