import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthLoginDTO } from 'src/auth/dto/login.auth.dto';
import { CreateUserDTO } from './dto/create.user.dto';
import { Users } from './schema/users.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Users.name) private readonly usersModel: Model<Users>,
  ) {}

  async all(): Promise<Users[]> {
    try {
      const users = await this.usersModel.find();
      return users;
    } catch (error) {
      throw new HttpException('Users not found', HttpStatus.NOT_FOUND);
    }
  }

  async findOne(where): Promise<Users> {
    const user = this.usersModel.findOne(where);

    if (!user) {
      throw new NotFoundException(
        `There isn't any user with identifier: ${where}`,
      );
    }

    return user;
  }

  async findOneById(id: number) {
    try {
      const user = await this.usersModel.findById({ _id: id });
      if (!user) {
        throw new HttpException('User with id no found', HttpStatus.NOT_FOUND);
      }
      return user;
    } catch (error) {
      throw new HttpException('Error', HttpStatus.BAD_REQUEST);
    }
  }

  async findOneByEmail(dto: AuthLoginDTO) {
    try {
      const user = await this.usersModel.findOne({ email: dto.email });
      return user;
    } catch (error) {
      throw new NotFoundException('Email não encontrado');
    }
  }

  async getByEmail(dto: CreateUserDTO) {
    try {
      const user = await this.usersModel.findOne({ email: dto.email });
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
      const user = await this.usersModel.create(dto);
      return user;
    } catch (error) {
      throw new NotFoundException('Erro to create a new User');
    }
  }
}
