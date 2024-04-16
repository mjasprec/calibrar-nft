'use client';
import { gql, DocumentNode } from '@apollo/client';

export const LOGIN_USER: DocumentNode = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      user {
        firstName
        lastName
        email
        username
        password
        role
        about
        gender
        wallet
      }
      accessToken
      refreshToken
      error {
        message
      }
    }
  }
`;
