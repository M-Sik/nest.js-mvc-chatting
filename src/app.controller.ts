import { Controller, Get, Render } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  @Render('index') // views 폴더 안에 index.hbs파일을 찾아 랜더링해줌
  root() {
    return {
      data: {
        title: 'Chattings',
        copyright: 'kim myeong sik',
      },
    };
  }
}
