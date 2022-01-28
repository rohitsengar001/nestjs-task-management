import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayloadInterface } from './jwt-payload.interface';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(authCredentialDto: AuthCredentialsDto): Promise<void> {
    return this.userRepository.createUser(authCredentialDto);
  }

  async signIn(authCredentialDto: AuthCredentialsDto): Promise<{accessToken: string}> {
    const { username, password } = authCredentialDto;
    const user = await this.userRepository.findOne({ username }); //find data for primary key: username
    
    if (user && (await bcrypt.compare(password, user.password))) {
      const payload :JwtPayloadInterface = { username };
      const accessToken: string = await this.jwtService.sign(payload);
      return { accessToken};
    } else {
      throw new UnauthorizedException('Please check your login credential');
    }
  }
}
