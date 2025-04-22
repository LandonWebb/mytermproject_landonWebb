import React, { useEffect, useState } from 'react';
import { getReviews } from '../api';

const ReviewList = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    getReviews()
      .then(res => setReviews(res.data))
      .catch(err => console.error('Failed to load reviews:', err));
  }, []);

  return (
    <div>
      <h2>Reviews</h2>
      <ul>
        {reviews.map(review => (
          <li key={review.id}>
            <strong>Rating:</strong> {review.rating} <br />
            <strong>Review:</strong> {review.review_text}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReviewList;
