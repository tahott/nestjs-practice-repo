import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { compare } from 'bcrypt';

import { loginDto } from './models/login.dto';
import { User } from './models/user.interface';

@Injectable()
export class AuthService {
  private users: User[] = [
    {
      id: 1,
      email: 'foo@bar.com',
      // Passw0rd!
      password: '$2b$12$s50omJrK/N3yCM6ynZYmNeen9WERDIVTncywePc75.Ul8.9PUk0LK',
    },
    {
      id: 2,
      email: 'john@doe.com',
      // P4ssword!
      password: '$2b$12$FHUV7sHexgNoBbP8HsD4Su/CeiWbuX/JCo8l2nlY1yCo2LcR3SjmC',
    }
  ]
  async validate(user: loginDto) {
    const foundUser = this.users.find(u => u.email === user.email);

    if (!user || !foundUser || !(await compare(user.password, foundUser?.password))) {
      throw new UnauthorizedException('Incorrect email or password');
    }

    const { password, ...retUser } = foundUser;
    return retUser;
  }

  findById(id: number): Omit<User, 'password'> {
    const { password: _, ...user } = this.users.find(u => u.id === id);
    if (!user) {
      throw new BadRequestException(`No user found with id ${id}`);
    }

    return user;
  }
}
