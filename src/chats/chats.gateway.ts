import { Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Socket as SocketModel } from './models/socket.model';
import { Socket } from 'socket.io';
import { Chatting } from './models/chattings.model';
import { Model } from 'mongoose';

@WebSocketGateway({ namespace: 'chattings' })
export class ChatsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  private logger = new Logger('chat');

  constructor(
    @InjectModel(Chatting.name) private readonly chattingModel: Model<Chatting>,
    @InjectModel(SocketModel.name)
    private readonly socketModel: Model<SocketModel>,
  ) {
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
  async handleDisconnect(@ConnectedSocket() socket: Socket) {
    const user = await this.socketModel.findOne({ id: socket.id });
    if (user) {
      socket.broadcast.emit('disconnect_user', user.username);
      await user.deleteOne();
    }

    this.logger.log(`connection : ${socket.id} ${socket.nsp.name}`);
  }

  @SubscribeMessage('new_user') // 소켓을 통해 주고받을 이벤트명을 기입
  async handleNewUser(
    @MessageBody() username: string,
    @ConnectedSocket() socket: Socket,
  ) {
    const exist = await this.socketModel.exists({ username });
    if (exist) {
      username = `${username}_${Math.floor(Math.random() * 100)}`;
      await this.socketModel.create({
        id: socket.id,
        username,
      });
    } else {
      await this.socketModel.create({
        id: socket.id,
        username,
      });
    }
    // 브로드 캐스팅
    socket.broadcast.emit('user_connected', username);
    return username;
  }

  @SubscribeMessage('submit_chat') // 소켓을 통해 주고받을 이벤트명을 기입
  async handleSubmitChat(
    @MessageBody() chat: string,
    @ConnectedSocket() socket: Socket,
  ) {
    const socketObj = await this.socketModel.findOne({ id: socket.id });

    await this.chattingModel.create({ user: socketObj, chat: chat });
    // 브로드 캐스팅
    socket.broadcast.emit('new_chat', { chat, username: socketObj.username });
  }
}
