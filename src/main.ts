import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';



async function bootstrap() {

  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: ['error', 'debug', 'warn']
  });

app.enableCors({
  origin:"*",
  methods:'GET,POST,PUT,PATCH,DELETE,OPTIONS',
  allowedHeaders :'Content-Type,Authorization',
  credentials:true,
})

app.useStaticAssets(join(__dirname,'..','uploads','images'),{
  prefix:'/uploads/images'
})

app.useStaticAssets(join(__dirname,'..','uploads','videos'),{
  prefix:'/uploads/videos'
})


 const configService = app.get(ConfigService);
 const port = configService.get<string>('PORT') 
 await app.listen(port!,'0.0.0.0');
 console.log(`Backend is listening on ${port}`); 
}

bootstrap();
