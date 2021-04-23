import { Controller, Get, HttpStatus, Param, ParseIntPipe } from '@nestjs/common';
import { ReviewService } from './review.service';
import { Review } from '../entities/Review';

@Controller('review')
export class ReviewController {

  constructor(private reviewService: ReviewService) {}

  @Get('all')
  async getAllReviews(): Promise<Review[]>{
    return this.reviewService.findAllReviews();
  }

  @Get('all_by_user_id')
  async getAllByUserId(@Param ('id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }))
    id: number
  ): Promise<Review[]>{
    return this.reviewService.findReviewsByUserId(id);
  }

  @Get('all_by_professional_id')
  async getAllByProfessionnalId(@Param ('id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }))
    id: number
  ): Promise<Review[]>{
    return this.reviewService.findReviewsByProfessionalId(id);
  }

}
