'use client';
import { gql, DocumentNode } from '@apollo/client';

export const LOGIN_USER: DocumentNode = gql`
  mutation LoginUser($email: String!, $username: String!, $password: String!) {
    LoginUser(email: $email, username: $username, password: $password) {
      user {
        firstName
        lastName
        email
        username
        password
        gender
        birthday
        wallet
        about
        role
      }
      accessToken
      refreshToken
      error {
        message
      }
    }
  }
`;
