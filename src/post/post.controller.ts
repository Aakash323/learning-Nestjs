import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  Put,
  BadRequestException,
} from '@nestjs/common';
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
    @Req() req: any,
  ) {

    const uid = parseInt(userId)
    if (isNaN(uid)) {
    throw new BadRequestException('Invalid postId or userId');
    }

    const files = req.files as { [fieldname: string]: Express.Multer.File[] };

    const image = files?.image ? files.image[0].filename:'';
    const video = files?.video ? files.video[0].filename:'';
    return this.postService.create(
      createPostDto,
      req.user,
      uid,
      image,
      video,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get(':userId')
  findById(@Param('userId') userId: string, @Req() req: any) {
    return this.postService.getPost(req.user, parseInt(userId));
  }

  @Get()
  findAll() {
    return this.postService.getAllPosts();
  }
@UseGuards(JwtAuthGuard)
@Put(':postId/:userId')
update(
  @Param('postId') postId: string,
  @Param('userId') userId: string,
  @Body() updatePostDto: UpdatePostDto,
  @Req() req: any,
) {
  const files = req.files as { [fieldname: string]: Express.Multer.File[] };

  const image = files?.image ? files.image[0] : undefined;
  const video = files?.video ? files.video[0] : undefined;

  return this.postService.update(
    parseInt(postId),
    updatePostDto,
    req.user,
    parseInt(userId),
    image,
    video,
  );
}


  @UseGuards(JwtAuthGuard)
  @Delete(':postId')
  remove(@Param('postId') postId: string, @Req() req: any) {
    return this.postService.delete(parseInt(postId), req.user);
  }
}
