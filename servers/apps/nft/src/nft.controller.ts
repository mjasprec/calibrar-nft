import { Controller } from '@nestjs/common';
import { NftService } from './nft.service';

@Controller()
export class NftController {
  constructor(private readonly nftService: NftService) {}
}
