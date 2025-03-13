import { Module, OnApplicationBootstrap } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import * as mongoose from 'mongoose';
import { Claim, ClaimSchema } from './schemas/claim.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGO_URI as string),
    MongooseModule.forFeature([{ name: Claim.name, schema: ClaimSchema }]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements OnApplicationBootstrap {
  async onApplicationBootstrap() {
    console.log('Connecting to DataBase');

    try {
      await mongoose.connect(process.env.MONGO_URI as string);
      console.log('DataBase connected successfully');
    } catch (error) {
      console.error('DataBase connection error:', error);
    }

    mongoose.connection.on('disconnected', () => {
      console.warn('DataBase disconnected');
    });
  }
}
