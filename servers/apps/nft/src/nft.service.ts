import { Injectable } from '@nestjs/common';

@Injectable()
export class NftService {
  getHello(): string {
    return 'Hello World!';
  }
}
