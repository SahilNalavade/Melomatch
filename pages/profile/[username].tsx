// pages/YourPage.tsx
import React from 'react';
import SongForm from '@/components/SongForm';

const YourPage: React.FC = () => {
  const handleSongFormSubmit = (songs: string[]) => {
    // Implement logic to handle the submitted songs
    console.log('Submitted songs:', songs);
  };

  return (
    <div>
      <h1>Your Page</h1>
      {/* Pass the onSubmit prop to the SongForm component */}
      <SongForm onSubmit={handleSongFormSubmit} />
    </div>
  );
};

export default YourPage;
