import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { User } from 'src/register/entities/register.entity';
import { Repository } from 'typeorm';



@Injectable()
export class PostService {
   constructor(
        @InjectRepository(Post)
        private readonly postrepository : Repository<Post>,
        @InjectRepository(User)
        private readonly userrepository : Repository<User>,
    ){}
     async create(createPostdto: CreatePostDto, user:User, userId:number): Promise<Post> {
        const userExists = await this.userrepository.findOne({ where: { id:userId } });
    if (!userExists) {
        throw new Error('User not found');
    }
    if(user.role!=='admin')
    {
      throw new UnauthorizedException('Not authorized to post.')
    }

    const post = this.postrepository.create({ ...createPostdto, user });
    return this.postrepository.save(post);
     }

    async update(postId: number, updatePostDto: UpdatePostDto, user: User, userId: number): Promise<Post> {

    const post = await this.postrepository.findOne({
        where: { id: postId },
        relations: ['user'],
    });

    if (!post) {
        throw new NotFoundException(`Post with ID ${postId} not found`);
    }

    const userExists = await this.userrepository.findOne({ where: { id: userId } });
    if (!userExists) {
        throw new NotFoundException(`User with ID ${userId} not found`);
    }

    if (user.role !== 'admin' && post.user.id !== userId) {
        throw new UnauthorizedException('Not authorized to update this post');
    }
    Object.assign(post, updatePostDto);
    return this.postrepository.save(post);
    }

     async getPost(user:User,userId: number): Promise<Post[]> {
      const userExists = await this.userrepository.findOne({ where: { id: userId } });
      if (!userExists) {
        throw new NotFoundException('User not found');
      }
      if(user.role!=="admin") throw new UnauthorizedException('Not authorized to get posts.')

    return this.postrepository.find({
      where:{user:{id:userId}},
      relations: ['user']});
     }
     
     async delete(postId: number, user: User): Promise<{message:string}> {
    const post = await this.postrepository.findOne({ 
      where: { id: postId },
        relations: ['user'],
    });
    if (!post) {
      throw new NotFoundException(`Post with ID ${postId} not found`);
    }

    if (user.role !== 'admin') {
      throw new UnauthorizedException('Not authorized to delete post');
    }

    await this.postrepository.remove(post);
    return { message: `Post with ID ${postId} deleted successfully`};
  }
 
}
