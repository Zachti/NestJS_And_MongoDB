import { HttpException, Injectable } from '@nestjs/common';
import { User } from '../schemas/User.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  createUser(createUserDto: CreateUserDto) {
    return new this.userModel(createUserDto).save();
  }

  getUsers() {
    return this.userModel.find();
  }

  async getUserById(id: string) {
    const user = await this.userModel.findById(id);
    return this.validateUserFound(user);
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto) {
    const updatedUser = await this.userModel.findByIdAndUpdate(
      id,
      updateUserDto,
      { new: true },
    );
    return this.validateUserFound(updatedUser);
  }

  async deleteUser(id: string) {
    const deletedUser = await this.userModel.findByIdAndDelete(id);
    return this.validateUserFound(deletedUser);
  }

  private validateUserFound(user) {
    if (!user) throw new HttpException('User not found!', 404);
    return user;
  }
}
