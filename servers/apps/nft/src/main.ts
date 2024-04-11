import { NestFactory } from '@nestjs/core';
import { NftModule } from './nft.module';

async function bootstrap() {
  const app = await NestFactory.create(NftModule);
  await app.listen(3000);
}
bootstrap();
