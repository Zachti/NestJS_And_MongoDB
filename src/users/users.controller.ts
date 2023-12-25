import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UsePipes,
} from '@nestjs/common';
import { UserService } from './users.service';
import { CreateUserDto } from './dto/createUser.dto';
import { IdValidationPipe } from '../pipes/IdValidation.pipe';
import { UpdateUserDto } from './dto/updateUser.dto';

@Controller('users')
export class UsersController {
  constructor(private userService: UserService) {}

  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Get()
  getUsers() {
    return this.userService.getUsers();
  }

  @Get('id')
  @UsePipes(new IdValidationPipe())
  async getUserById(@Param('id') id: string) {
    return await this.userService.getUserById(id);
  }

  @Patch('id')
  @UsePipes(new IdValidationPipe())
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return await this.userService.updateUser(id, updateUserDto);
  }

  @Delete('id')
  @UsePipes(new IdValidationPipe())
  async deleteUser(@Param('id') id: string) {
    return await this.userService.deleteUser(id);
  }
}
