import React, { useState } from 'react';
import Axios_request from '../Axios_request';
import { useNavigate } from 'react-router-dom';

const FeedbackForm = () => {
  const [rating, setRating] = useState(0);
  const [subject, setSubject] = useState('');
  const [suggestions, setSuggestions] = useState('');
  const navigate = useNavigate();

  const handleStarClick = (value) => {
    setRating(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Create the payload
    const payload = {
      rating : rating,
      subject : subject,
      suggestions : suggestions
    };

    try {
      // Send the data via Axios
      await Axios_request("post","/feedback", payload);
      alert('Feedback sent successfully!');
      // Clear the form
      setRating(0);
      setSubject('');
      setSuggestions('');
      navigate("/loginHome")
      alert("FeedBack Submitted Successfully");
    } catch (error) {
      console.error('Error sending feedback:', error);
      alert('There was an error sending your feedback.');
    }
  };

  const starStyle = {
    fontSize: '1.5rem',
    cursor: 'pointer',
    color: '#ddd',
    transition: 'color 0.2s'
  };

  const filledStarStyle = {
    ...starStyle,
    color: '#ffcc00'
  };

  const formStyle = {
    maxWidth: '500px',
    margin: '0 auto',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)'
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Feedback Form</h2>
      <div style={formStyle}>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Rating</label>
            <div className="star-rating" style={{ display: 'flex', direction: 'row-reverse' }}>
              {[5, 4, 3, 2, 1].map((star) => (
                <span
                  key={star}
                  className={`star ${rating >= star ? 'filled' : ''}`}
                  onClick={() => handleStarClick(star)}
                  style={rating >= star ? filledStarStyle : starStyle}
                >
                  &#9733;
                </span>
              ))}
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="subject" className="form-label">Subject</label>
            <input
              type="text"
              className="form-control"
              id="subject"
              placeholder="Enter subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="suggestions" className="form-label">Suggestions</label>
            <textarea
              className="form-control"
              id="suggestions"
              rows="3"
              placeholder="Enter your suggestions"
              value={suggestions}
              onChange={(e) => setSuggestions(e.target.value)}
              required
            ></textarea>
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default FeedbackForm;
