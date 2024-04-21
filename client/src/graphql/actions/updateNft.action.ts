import { gql, DocumentNode } from '@apollo/client';

export const UPDATE_NFT: DocumentNode = gql`
  mutation UpdateNft(
    $id: String!
    $name: String!
    $description: String!
    $price: String!
    $category: String!
    $imgUrl: String!
  ) {
    UpdateNft(
      updateNftDto: {
        id: $id
        name: $name
        description: $description
        price: $price
        category: $category
        imgUrl: $imgUrl
      }
    ) {
      nft {
        id
        name
        description
        price
        category
        imgUrl
      }
    }
  }
`;
