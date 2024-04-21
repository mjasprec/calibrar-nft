import { gql, DocumentNode } from '@apollo/client';

export const UPDATE_NFT: DocumentNode = gql`
  mutation UpdateNft(
    $nftId: String!
    $name: String!
    $description: String!
    $price: String!
    $category: String!
    $imgUrl: String!
  ) {
    UpdateNft(
      updateNftDto: {
        nftId: $nftId
        name: $name
        description: $description
        price: $price
        category: $category
        imgUrl: $imgUrl
      }
    ) {
      nft {
        nftId
        name
        description
        price
        category
        imgUrl
      }
    }
  }
`;
