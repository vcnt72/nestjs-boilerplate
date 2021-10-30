import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { User } from 'src/users/entities/user.entity';
import { JWTStrategy } from './jwt.strategy';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JWTStrategy],
  imports: [MikroOrmModule.forFeature([User])],
})
export class AuthModule {}
