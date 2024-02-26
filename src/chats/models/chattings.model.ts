import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaOptions } from 'mongoose';

const options: SchemaOptions = {
  collection: 'chattings',
  timestamps: true, // updateAt, createdAt을 자동으로 찍어줌
};

@Schema(options)
export class Chatting extends Document {}

export const ChattingSchema = SchemaFactory.createForClass(Chatting);
