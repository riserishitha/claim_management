import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ClaimDocument = Claim & Document;

@Schema()
export class Claim {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  claimAmount: number;

  @Prop()
  description: string;

  @Prop({ enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' })
  status: string;

  @Prop({ default: Date.now })
  submissionDate: Date;

  @Prop()
  insurerComments: string;
}

export const ClaimSchema = SchemaFactory.createForClass(Claim);
