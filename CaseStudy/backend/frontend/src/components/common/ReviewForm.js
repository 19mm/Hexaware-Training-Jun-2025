import React, { useState } from 'react';
import { Form, Button, Message, Rating, TextArea, Header as SUIHeader, Icon } from 'semantic-ui-react';
import ReviewService from '../../services/ReviewService';
import AuthService from '../../services/AuthService';

const ReviewForm = ({ carId, onReviewSubmitted }) => {
  const currentUser = AuthService.getCurrentUser();

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState({ message: '', type: '' });

  const handleSubmit = async () => {
    setLoading(true);
    setFeedback({ message: '', type: '' });

    if (!currentUser || !currentUser.userId) {
      setFeedback({ message: 'You must be logged in to submit a review.', type: 'error' });
      setLoading(false);
      return;
    }
    if (!carId) {
      setFeedback({ message: 'Car ID is missing. Cannot submit review.', type: 'error' });
      setLoading(false);
      return;
    }
    if (rating === 0) {
      setFeedback({ message: 'Please provide a star rating.', type: 'error' });
      setLoading(false);
      return;
    }
    if (comment.trim().length < 10) {
      setFeedback({ message: 'Comment must be at least 10 characters long.', type: 'error' });
      setLoading(false);
      return;
    }

    try {
      await ReviewService.addReview(carId, rating, comment, currentUser.userId);
      setFeedback({ message: 'Review submitted successfully!', type: 'success' });
      setRating(0);
      setComment('');
      if (onReviewSubmitted) {
        onReviewSubmitted(); 
      }
    } catch (err) {
      setLoading(false);
      let errorMessage = 'Failed to submit review. An unexpected error occurred.';
      if (err.response && err.response.data) {
        if (err.response.data.message) {
          errorMessage = err.response.data.message;
        } else if (err.response.data.details) {
          errorMessage = err.response.data.details;
        } else if (typeof err.response.data === 'string') {
          errorMessage = err.response.data;
        }
      } else if (err.message) {
        errorMessage = err.message;
      }
      setFeedback({ message: errorMessage, type: 'error' });
      console.error("Review submission error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit} loading={loading} success={feedback.type === 'success'} error={feedback.type === 'error'}>
      <SUIHeader as='h4' style={{ color: '#333' }}>
        <Icon name='star' /> Leave a Review
      </SUIHeader>
      {!currentUser && (
        <Message warning>
          <Message.Header>Login Required</Message.Header>
          <p>You must be logged in to leave a review.</p>
        </Message>
      )}
      <Form.Field required>
        <label>Your Rating</label>
        <Rating
          icon='star'
          defaultRating={0}
          maxRating={5}
          onRate={(e, { rating }) => setRating(rating)}
          size='huge'
          disabled={!currentUser}
        />
      </Form.Field>
      <Form.Field required>
        <label>Your Comment</label>
        <TextArea
          placeholder='Tell us about your experience with this car...'
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={3}
          disabled={!currentUser}
        />
      </Form.Field>
      {feedback.message && (
        feedback.type === 'success' ? (
          <Message success header="Success" content={feedback.message} />
        ) : (
          <Message error header="Error" content={feedback.message} />
        )
      )}
      <Button
        primary
        type='submit'
        loading={loading}
        disabled={loading || !currentUser || rating === 0 || comment.trim().length < 10}
        style={{ backgroundColor: '#214EFF', borderRadius: '5px', marginTop: '1em' }}
      >
        Submit Review
      </Button>
    </Form>
  );
};

export default ReviewForm;