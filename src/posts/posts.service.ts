import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post } from '../schemas/Post.schema';
import { CreatePostDto } from './dto/createPost.dto';
import { User } from '../schemas/User.schema';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post.name) private postModel: Model<Post>,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  async createPost({ userId, ...createPostDto }: CreatePostDto) {
    const findUser = await this.userModel.findById(userId);
    if (!findUser) throw new HttpException('User not found!', 404);
    const savedPosts = new this.postModel(createPostDto).save();
    return findUser.updateOne({ $push: { posts: (await savedPosts)._id } });
  }
}
