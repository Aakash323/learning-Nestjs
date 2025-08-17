import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';


async function bootstrap() {

  const app = await NestFactory.create(AppModule);

app.enableCors(
  '*'
)
 const configService = app.get(ConfigService);
 const port = configService.get<string>('PORT') 
 await app.listen(port!,'0.0.0.0');
 console.log(`Backend is listening on ${port}`);
 
}
bootstrap();
