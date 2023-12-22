// pages/signup.tsx
// pages/signup.tsx
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import useFirebaseAuth from '../useFirebaseAuth';
import SongForm from '../components/SongForm';

const SignupPage: React.FC = () => {
  const router = useRouter();
  const { signUpWithEmailAndPassword } = useFirebaseAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await signUpWithEmailAndPassword(email, password);

      // Additional logic to handle the username (e.g., save to database)
      console.log('Username:', username);

      // Redirect to the user's profile page
      router.push(`/profile/${encodeURIComponent(username)}`);
    } catch (error) {
      console.error('Username is undefined or null');
    }
  };
  return (
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input type="email" value={email} onChange={handleEmailChange} required />
        </label>
        <br />
        <label>
          Password:
          <input type="password" value={password} onChange={handlePasswordChange} required />
        </label>
        <br />
        <label>
          Username:
          <input type="text" value={username} onChange={handleUsernameChange} required />
        </label>

        <br />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignupPage;
