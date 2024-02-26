import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsNotEmpty, IsString } from 'class-validator';
import { Document, SchemaOptions, Types } from 'mongoose';
import { Socket as SocketModel } from './socket.model';

const options: SchemaOptions = {
  collection: 'chattings',
  timestamps: true, // updateAt, createdAt을 자동으로 찍어줌
};

@Schema(options)
export class Chatting extends Document {
  @Prop({
    type: {
      _id: { type: Types.ObjectId, required: true, ref: 'sockets' }, // 몽구스에서 자동으로 만들어주는 _id이며 sockets 스키마를 참조
      id: { type: String }, // 소켓의 고유 id
      username: { type: String, required: true },
    },
  })
  @IsNotEmpty()
  user: SocketModel;

  @Prop({
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  chat: string;
}

export const ChattingSchema = SchemaFactory.createForClass(Chatting);
