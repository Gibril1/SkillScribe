import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { DbModule } from 'src/db/db.module';
import { JwtModule } from '@nestjs/jwt';
import { DbService } from 'src/db/db.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, DbService],
  imports: [DbModule,
    JwtModule.register({
      global: true,
      secret: 'jwtConstants.secret',
      signOptions: { expiresIn: '60s' },
    }),]
})
export class AuthModule {}
