import { GET_USER } from '@/graphql/actions/getUser.action';
import { useQuery } from '@apollo/client';

function useUser() {
  const { loading, data } = useQuery(GET_USER);

  return {
    loading,
    user: data?.GetLoggedInUser?.user,
  };
}

export default useUser;
