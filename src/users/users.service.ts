import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthLoginDTO } from 'src/auth/dto/login.auth.dto';
import { FindOneOptions, Repository } from 'typeorm';
import { CreateUserDTO } from './dto/create.user.dto';
import { Users } from './entities/users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users) private usersRepository: Repository<Users>,
  ) {}

  async all(): Promise<Users[]> {
    try {
      const users = await this.usersRepository.find();
      return users;
    } catch (error) {
      throw new HttpException('Users not found', HttpStatus.NOT_FOUND);
    }
  }

  async findOne(where: FindOneOptions<Users>): Promise<Users> {
    const user = this.usersRepository.findOne(where);

    if (!user) {
      throw new NotFoundException(
        `There isn't any user with identifier: ${where}`,
      );
    }

    return user;
  }

  async findOneByEmail(dto: AuthLoginDTO) {
    try {
      const user = await this.usersRepository.findOneBy({ email: dto.email });
      return user;
    } catch (error) {
      throw new NotFoundException('Email não encontrado');
    }
  }

  async getByEmail(dto: CreateUserDTO) {
    try {
      const user = await this.usersRepository.findOneBy({ email: dto.email });
      if (user) {
        return user;
      }
      throw new HttpException(
        'User with this email does not exist',
        HttpStatus.BAD_REQUEST,
      );
    } catch (error) {
      throw new HttpException('Email not found', HttpStatus.NOT_FOUND);
    }
  }

  async create(dto: CreateUserDTO) {
    try {
      const user = await this.usersRepository.save({
        ...dto,
      });
      return user;
    } catch (error) {
      throw new NotFoundException('Erro to create a new User');
    }
  }
}
