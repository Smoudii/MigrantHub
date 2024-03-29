const Review = require('../models/Review');
const { ServerError } = require('../errors/ServerError');

module.exports = {

  createReview(reviewUser, parsedReviewObject) {
    const review = new Review();
    review.user = reviewUser;
    review.serviceId = parsedReviewObject.serviceId;
    review.rating = parsedReviewObject.rating;
    review.comment = parsedReviewObject.comment;
    return review.save().then(() => Promise.resolve('Review has been created.')).catch((error) => {
      throw new ServerError('There was an error creating the review.', 400, error);
    });
  },

  getReview(query) {
    return Review.findOne(query).exec().then(review => Promise.resolve(review)).catch((error) => {
      throw new ServerError('There was an error retrieving review.', 400, error);
    });
  },

  getReviews(query) {
    return Review.find(query).exec().then(reviews => Promise.resolve(reviews)).catch((error) => {
      throw new ServerError('There was an error getting reviews.', 400, error);
    });
  },

  deleteReview(reviewId) {
    return Review.updateOne({ _id: reviewId }, {
      deleted: true,
      deletedDate: Date.now(),
    }).exec().then(() => Promise.resolve('Review has been deleted.')).catch((error) => {
      throw new ServerError('There was an error deleting review.', 400, error);
    });
  },
};
