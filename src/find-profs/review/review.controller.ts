import { Body, Controller, Get, HttpStatus, Param, ParseIntPipe, Post } from '@nestjs/common';
import { ReviewService } from './review.service';
import { Review } from '../entities/Review';
import { ReviewsDto } from '../model/reviews.dto';
import { validate } from 'class-validator';

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

  @Post('new_review')
  async postNewReview(@Body() body): Promise<Review> {

    const {
      user, professional, stars, review, tags
    } = body;

    const newReview = new ReviewsDto();
    newReview.prof = professional;
    newReview.user = user;
    newReview.stars = stars;
    newReview.review = review;
    newReview.tag = tags;

    const errors = await validate(newReview);
    if (errors.length > 0) {
      throw new Error(`Validation failed!`);
    }
    return await this.reviewService.addNewReview(newReview);
  }

}
