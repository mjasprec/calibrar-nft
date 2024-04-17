'use client';
import { gql, DocumentNode } from '@apollo/client';

export const ACTIVATE_USER: DocumentNode = gql`
  mutation ActivateUser($activationToken: String!, $activationCode: String!) {
    ActivateUser(
      activationDto: {
        activationToken: $activationToken
        activationCode: $activationCode
      }
    ) {
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
    }
  }
`;
