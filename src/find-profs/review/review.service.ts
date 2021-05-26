import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Review } from '../entities/Review';
import { Repository } from "typeorm";
import { ReviewsDto } from '../model/reviews.dto';
import { validate } from 'class-validator';

@Injectable()
export class ReviewService {

  constructor(
    @InjectRepository(Review)
    private readonly reviewRepo:  Repository<Review>
  ) {}

  async findAllReviews(): Promise<Review[] | undefined>{
    const allReviews = await this.reviewRepo
      .createQueryBuilder("reviews")
      .innerJoinAndSelect("reviews.user", "user")
      .innerJoinAndSelect("reviews.professional", "professional")
      .getMany();

    if(!allReviews){
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: 'Could not find reviews',
      }, HttpStatus.NOT_FOUND);
    }

    return allReviews;
  }

  async findReviewsByUserId(id: number): Promise<Review[] | undefined>{
    const reviewsByUser = await this.reviewRepo
      .createQueryBuilder("reviews")
      .innerJoinAndSelect("reviews.user", "user")
      .innerJoinAndSelect("reviews.professional", "professional")
      .where("user.id = :id", { id: id })
      .getMany();

    if(!reviewsByUser){
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: 'Could not find reviews for this user',
      }, HttpStatus.NOT_FOUND);
    }
    return reviewsByUser;
  }

  async findReviewsByProfessionalId(id: number): Promise<Review[] | undefined>{
    const reviewsByPro = await this.reviewRepo
      .createQueryBuilder("reviews")
      .innerJoinAndSelect("review.user", "user")
      .innerJoinAndSelect("review.professional", "professional")
      .where("professional.id = :id", { id: id })
      .getMany();

    if(!reviewsByPro){
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: 'Could not find reviews for this professional',
      }, HttpStatus.NOT_FOUND);
    }

    return reviewsByPro;
  }

  async addNewReview(newReview: ReviewsDto): Promise<Review> | undefined {
    const addedReview = await this.reviewRepo
      .create({
        professional: newReview.prof,
        user: newReview.user,
        stars: newReview.stars,
        review: newReview.review,
        tag: newReview.tag,
        date_hour: Date.now(),
      })

    const errors =await validate(addedReview)
    if (errors.length > 0) {
      throw new HttpException( {
        status: HttpStatus.BAD_REQUEST,
        error: errors[0].constraints,
      }, HttpStatus.BAD_REQUEST);
    }

    return await this.reviewRepo.save(addedReview);
  }


}
