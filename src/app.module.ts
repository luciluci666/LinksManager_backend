import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';

import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    UsersModule,
    MongooseModule.forRoot(
      // 'mongodb://127.0.0.1:27017/nest?directConnection=true',
      // 'mongodb+srv://admin1011:linksmanageradmin@linksmanger.8usntxg.mongodb.net/users',
      process.env.DB_URL
    ),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
