// SongForm.tsx
import React, { useState } from 'react';
import axios from 'axios';
import _ from 'lodash';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { firestore } from '../firebase'; // Adjust the path accordingly
import { getAuth } from 'firebase/auth';
import { auth } from '../firebase'; // Adjust the path accordingly
import { onAuthStateChanged } from 'firebase/auth';
import {
  Input,
  Button,
  List,
  ListItem,
  VStack,
  Box,
} from '@chakra-ui/react';

interface SongFormProps {
  onSubmit: (songs: string[], username: string) => void;
}

const SongForm: React.FC<SongFormProps> = ({ onSubmit }) => {
  const [songInput, setSongInput] = useState('');
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [usernameInput, setUsernameInput] = useState('');

  // Debounce the API request function
  const debouncedSearch = _.debounce(async (input: string) => {
    try {
      // Make a request to the Last.fm API
      const response = await axios.get(
        `https://ws.audioscrobbler.com/2.0/?method=track.search&track=${input}&api_key=91e0b0d00eefb1d4b39d5a6b44f1ba75&format=json`
      );

      // Check if the necessary properties are present in the response
      if (response.data.results && response.data.results.trackmatches) {
        // Extract the song names from the response and update the state
        const songs = response.data.results.trackmatches.track.map(
          (item: any) => item.name
        );
        setSearchResults(songs);
      } else {
        // Handle the case where the expected properties are not present
        console.error('Invalid API response:', response.data);
      }
    } catch (error) {
      console.error('Error searching for songs:', error);
    }
  }, 300);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const input = event.target.value;
    setSongInput(input);
    debouncedSearch(input);
  };

  const handleUsernameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const input = event.target.value;
    setUsernameInput(input);
  };

  const handleSelectSong = async (selectedSong: string) => {
    // You can add logic here to handle the selected song
    setSongInput(selectedSong);
    setSearchResults([]); // Clear suggestions

    try {
      // Wait for the authentication state to be resolved
      await new Promise((resolve) => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
          resolve(user);
          unsubscribe();
        });
      });

      const user = auth.currentUser;
      const username = user?.displayName || usernameInput;

      // Store username and selected song in Firestore
      const userSongsCollection = collection(firestore, 'userSongs');
      await addDoc(userSongsCollection, {
        username: username,
        song: selectedSong,
        timestamp: new Date(),
      });

      // Pass songs and username to the parent component
      onSubmit([selectedSong], username);
    } catch (error) {
      console.error('Error retrieving user information:', error);
    }
  };

  const handleSubmit = () => {
    onSubmit([songInput], usernameInput);
    setSongInput(''); // Clear input after submission
    setUsernameInput(''); // Clear username input after submission
  };

  return (
    <VStack spacing={4} align="center">
      <Input
        type="text"
        placeholder="Enter username"
        value={usernameInput}
        onChange={handleUsernameChange}
        variant="filled"
        mb={2}
      />
      <Input
        type="text"
        placeholder="Enter song"
        value={songInput}
        onChange={handleInputChange}
        variant="filled"
        mb={2}
      />

      <Box w="100%" bg="gray.100" p={4} borderRadius="md">
        <h2>Search Results</h2>
        <List>
          {searchResults.map((result, index) => (
            <ListItem
              key={index}
              onClick={() => handleSelectSong(result)}
              cursor="pointer"
              p={2}
              _hover={{ bg: 'gray.200' }}
            >
              {result}
            </ListItem>
          ))}
        </List>
      </Box>

      <Button colorScheme="blue" onClick={handleSubmit}>
        Submit
      </Button>
    </VStack>
  );
};

export default SongForm;
