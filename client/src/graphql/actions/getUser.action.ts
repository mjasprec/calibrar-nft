'use client';
import { gql, DocumentNode } from '@apollo/client';

export const GET_USER: DocumentNode = gql`
  query {
    GetLoggedInUser {
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
    }
  }
`;
