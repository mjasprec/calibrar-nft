import { Injectable } from '@nestjs/common';
import { NftDto } from '../../users/src/dto/nft.dto';

@Injectable()
export class NftService {
  constructor() {}

  async CreateNft(nftDto: NftDto) {
    const { userId, name, description, imgUrl, price } = nftDto;

    const newNft = {
      userId,
      name,
      description,
      imgUrl,
      price,
    };

    return newNft;
  }

  async GetAllNft() {
    const nfts = [];

    return nfts;
  }
}
