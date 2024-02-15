import { Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatsModule } from './chats/chats.module';
import mongoose from 'mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // app 모듈에서만 config모듈을 임폴트 시키면 다른 모듈에서도 환경변수를 사용할 수 있게해주는 옵션
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    ChatsModule,
  ],
  controllers: [AppController],
  providers: [],
})
// 미들웨어를 사용하기위해 미들웨어를 등록
export class AppModule implements NestModule {
  configure() {
    const DEBUG = process.env.MODE === 'dev' ? true : false;
    // 몽구스 쿼리가 로그로 찍히게 하기 위해
    mongoose.set('debug', DEBUG);
  }
}
