import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // app 모듈에서만 config모듈을 임폴트 시키면 다른 모듈에서도 환경변수를 사용할 수 있게해주는 옵션
    }),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
