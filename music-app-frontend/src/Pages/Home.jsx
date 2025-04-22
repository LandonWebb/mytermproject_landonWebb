import React from 'react';
import AlbumList from '../components/AlbumList';
import ReviewList from '../components/ReviewList';

const Home = () => {
  return (
    <div>
      <h1>Welcome to MusicApp 🎵</h1>
      <AlbumList />
      <ReviewList />
    </div>
  );
};

export default Home;
