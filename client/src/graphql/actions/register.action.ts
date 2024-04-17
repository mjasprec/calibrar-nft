'use client';
import { gql, DocumentNode } from '@apollo/client';

export const REGISTER_USER: DocumentNode = gql`
  mutation RegisterUser(
    $firstName: String!
    $lastName: String!
    $email: String!
    $username: String!
    $password: String!
    $gender: Genders!
    $birthday: DateTime!
    $about: String!
    $wallet: Float!
    $role: Roles
  ) {
    RegisterUser(
      registerDto: {
        firstName: $firstName
        lastName: $lastName
        email: $email
        username: $username
        password: $password
        gender: $gender
        birthday: $birthday
        about: $about
        wallet: $wallet
        role: $role
      }
    ) {
      activation_token
    }
  }
`;
