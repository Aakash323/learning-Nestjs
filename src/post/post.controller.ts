import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Put } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { JwtAuthGuard } from 'src/auth/auth.guard';


@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @UseGuards(JwtAuthGuard)
  @Post(':userId')
  create(
    @Param('userId') userId: string,
    @Body() createPostDto: CreatePostDto,
    @Req() req: any
  ) {
    return this.postService.create(createPostDto,req.user,parseInt(userId));
  }


  @Get(':userId')
  findAll(
    @Param('userId') userId :string,
    @Req() req:any
  ) {
    return this.postService.getPost(req.user,parseInt(userId));
  }

  @UseGuards(JwtAuthGuard)
  @Put(':postId/:userId')
  update(
  @Param('postId') postId: string,
  @Param('userId') userId :string,
  @Body() updatePostDto: UpdatePostDto,
  @Req() req:any
  ){
    return this.postService.update(parseInt(userId), updatePostDto,req.user,parseInt(postId));
  }
  
  @UseGuards(JwtAuthGuard)
  @Delete(':postId')
  remove(
    @Param('postId') postId: string,
    @Req() req:any
)
   {
    return this.postService.delete(parseInt(postId),req.user);
  }
}

