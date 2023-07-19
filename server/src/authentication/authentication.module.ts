import { Module } from '@nestjs/common';
import { AuthService } from './services';
import { AuthController } from './controllers';
import { GithubStrategy, GoogleStrategy, JwtStrategy } from './strategies';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
  providers: [AuthService, JwtStrategy, GithubStrategy, GoogleStrategy],
  controllers: [AuthController],
})
export class AuthenticationModule {}
