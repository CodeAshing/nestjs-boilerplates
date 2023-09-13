import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtGuardStrategy } from './guards/jwt-auth.strategy';
import { JwtGuard } from './guards/jwt-auth.guard';
import { EmployerModule } from 'src/employer/employer.module';

@Module({
  imports: [
    UserModule,
    EmployerModule,
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.JWT_SECRET,
        signOptions: {
          expiresIn: '3d',
        },
        global: true,
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtGuardStrategy, JwtGuard],
})
export class AuthModule {}
