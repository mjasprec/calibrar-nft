import { gql, DocumentNode } from '@apollo/client';

export const RESET_PASSWORD: DocumentNode = gql`
  mutation ResetPassword($password: String!, $activationToken: String!) {
    ResetPassword(
      resetPasswordDto: {
        password: $password
        activationToken: $activationToken
      }
    ) {
      user {
        firstName
        lastName
        email
        username
        password
      }
    }
  }
`;
