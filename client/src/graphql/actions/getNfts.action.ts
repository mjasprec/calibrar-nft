'use client';
import { gql, DocumentNode } from '@apollo/client';

export const GET_NFTS: DocumentNode = gql`
  query {
    GetAllNft {
      id
      name
      description
      price
      userId
      category
      imgUrl
    }
  }
`;
