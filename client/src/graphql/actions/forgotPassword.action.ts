import { gql, DocumentNode } from '@apollo/client';

export const FORGOT_PASSWORD: DocumentNode = gql`
  mutation ForgotPassword($email: String!) {
    ForgotPassword(forgotPasswordDto: { email: $email }) {
      message
    }
  }
`;
