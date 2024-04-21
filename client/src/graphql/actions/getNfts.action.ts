'use client';
import { gql, DocumentNode } from '@apollo/client';

export const GET_NFTS: DocumentNode = gql`
  query {
    GetAllNft {
      name
      description
      price
      userId
      category
      imgUrl
    }
  }
`;
