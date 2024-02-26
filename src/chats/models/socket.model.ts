import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaOptions } from 'mongoose';

const options: SchemaOptions = {
  collection: 'sockets',
  timestamps: true, // updateAt, createdAt을 자동으로 찍어줌
};

@Schema(options)
export class Socket extends Document {}

export const SocketSchema = SchemaFactory.createForClass(Socket);
