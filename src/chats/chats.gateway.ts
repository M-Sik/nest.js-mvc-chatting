import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Socket } from 'dgram';

@WebSocketGateway()
export class ChatsGateway {
  @SubscribeMessage('new_user') // 소켓을 통해 주고받을 이벤트명을 기입
  handleNewUser(
    @MessageBody() username: string,
    @ConnectedSocket() socket: Socket,
  ) {
    console.log(username);
    socket.emit('hello_user', 'hello' + username);
  }
}
