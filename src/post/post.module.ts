import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { User } from 'src/register/entities/register.entity';
import { AuthModule } from 'src/auth/auth.module';
import { uploadMiddleware } from 'src/middlewares/multer.middleware';

@Module({
  imports:[TypeOrmModule.forFeature([Post,User]),
  AuthModule,
],
  controllers: [PostController],
  providers: [PostService],
})

export class PostModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
      consumer
      .apply(uploadMiddleware)
      .forRoutes(
        {path:'post/:userId',method:RequestMethod.POST},
        {path:'post/:postId/:userID',method:RequestMethod.PUT},
      );
  }
}
