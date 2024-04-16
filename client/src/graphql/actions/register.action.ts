'use client';
import { gql, DocumentNode } from '@apollo/client';

export const REGISTER_USER: DocumentNode = gql`
  mutation RegisterUser(
    $firstName: String!
    $lastName: String!
    $password: String!
    $email: String!
    $username: String!
    $birthday: DateTime!
    $gender: String!
    $about: String!
    $wallet: Float!
  ) {
    register(
      registerDto: {
        firstName: $firstName
        lastName: $lastName
        password: $password
        email: $email
        username: $username
        birthday: $birthday
        gender: $gender
        about: $about
        wallet: $wallet
      }
    ) {
      activation_token
    }
  }
`;
