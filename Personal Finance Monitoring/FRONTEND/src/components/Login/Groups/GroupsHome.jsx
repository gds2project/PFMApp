import React from 'react';

// URL for a placeholder image expressing disappointment
const disappointmentImageURL = 'https://www.example.com/disappointment-image.jpg';

const GroupHome = () => {
  return (
    <div style={styles.container}>
      <img src={disappointmentImageURL} alt="Disappointment" style={styles.image} />
      <p style={styles.message}>Oh no, that's disappointing!</p>
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  },
  image: {
    maxWidth: '100%',
    height: 'auto',
    borderRadius: '10px',
  },
  message: {
    marginTop: '10px',
    fontSize: '18px',
    color: '#333',
  },
};

export default GroupHome;
