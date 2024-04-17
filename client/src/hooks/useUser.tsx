import { GET_USER } from '@/graphql/actions/getUser.action';
import { useQuery } from '@apollo/client';

function useUser() {
  const { data, loading } = useQuery(GET_USER);

  return {
    loading,
    user: data?.getLoggedInUser?.user,
  };
}

export default useUser;
