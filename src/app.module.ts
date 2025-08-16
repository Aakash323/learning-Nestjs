import { Module } from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm'
import { RegisterModule } from './register/register.module';
import { LoginModule } from './login/login.module';
import { PostModule } from './post/post.module';
import { User } from './register/entities/register.entity';
import { Post } from './post/entities/post.entity';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true}),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5000,
      username: 'postgres',
      password: 'Aakash@123',
      database: 'TestDB',
      entities: [User, Post],
      // autoLoadEntities: true,
      synchronize: true,
    }),
    RegisterModule,
    LoginModule,
    PostModule,
  ],
})
export class AppModule {}
