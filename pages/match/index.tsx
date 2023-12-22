// match/index.tsx
import React, { useState, useEffect } from 'react';
import useFirebaseAuth from '../../useFirebaseAuth';
import SongForm from '@/components/SongForm';

const MatchPage: React.FC = () => {
  const { user } = useFirebaseAuth();
  const [matchedUsers, setMatchedUsers] = useState<string[]>([]);

  useEffect(() => {
    // Fetch matched users based on the user's favorite songs
    // Replace this with your logic to fetch and set matchedUsers
    const fetchMatchedUsers = async () => {
      try {
        // Example: Fetch matched users from your backend or database
        // const response = await fetch(`/api/match?userId=${user?.uid}`);
        // const data = await response.json();
        // setMatchedUsers(data.matchedUsers);

        // For now, setting some dummy data
        setMatchedUsers(['User 1', 'User 2', 'User 3']);
      } catch (error) {
        console.error('Error fetching matched users:', error);
      }
    };

    if (user) {
      fetchMatchedUsers();
    }
  }, [user]);

  const handleSongFormSubmit = (songs: string[]) => {
    // Handle the submitted songs (e.g., save to database)
    console.log('Submitted Songs:', songs);
  };

  return (
    <div>
      <h2>Match Page</h2>
      {user ? (
        <div>
          {/* <p>Welcome, {user.displayName}!</p> */}
       
          <h3>Matched Users</h3>
          <ul>
            {matchedUsers.map((matchedUser, index) => (
              <li key={index}>{matchedUser}</li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Please log in to view this page.</p>
      )}
    </div>
  );
};

export default MatchPage;
