import { Test, TestingModule } from '@nestjs/testing';
import { NftController } from './nft.controller';
import { NftService } from './nft.service';

describe('NftController', () => {
  let nftController: NftController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [NftController],
      providers: [NftService],
    }).compile();

    nftController = app.get<NftController>(NftController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(nftController.getHello()).toBe('Hello World!');
    });
  });
});
