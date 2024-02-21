import { Logger } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';

@WebSocketGateway({ namespace: 'chattings' })
export class ChatsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  private logger = new Logger('chat');

  constructor() {
    this.logger.log('constructor');
  }

  // afterInit() => 게이트웨이가 실행이될때 생성자(constructor) 다음으로 가장먼저 실행되는 메서드
  afterInit() {
    this.logger.log('init');
  }
  // handleConnection => 소켓이 커넥트 되면 실행되는 메서드
  handleConnection(@ConnectedSocket() socket: Socket) {
    this.logger.log(`connection : ${socket.id} ${socket.nsp.name}`);
  }
  // handleDiscconnect => 소켓 연결이 끊긴 직후 실행되는 메서드
  handleDisconnect(@ConnectedSocket() socket: Socket) {
    this.logger.log(`connection : ${socket.id} ${socket.nsp.name}`);
  }

  @SubscribeMessage('new_user') // 소켓을 통해 주고받을 이벤트명을 기입
  handleNewUser(
    @MessageBody() username: string,
    @ConnectedSocket() socket: Socket,
  ) {
    // 브로드 캐스팅
    socket.broadcast.emit('user_connected', username);
    return username;
  }
}
