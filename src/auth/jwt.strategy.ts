import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { Strategy , ExtractJwt } from 'passport-jwt';
import { JwtPayloadInterface } from './jwt-payload.interface';
import { User } from './user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private configService: ConfigService,
  ) {
    super({
      secretOrKey: configService.get('JWT_SECRET'),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  //validate to the username
  async validate(payload: JwtPayloadInterface):Promise<User>{
    const { username } = payload;
    const user:User = await this.userRepository.findOne({username});

    if(!user){
      throw new UnauthorizedException();
    }
    return user;
  }
}
