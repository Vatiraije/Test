import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from './components/firebaseConfig';
import { TextField, Button, Typography, Container, Box, Link } from '@mui/material';
import './login.css';

export default function LoginAuth() {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [signUp, setSignUp] = useState<boolean>(false);
  const [helperText, setHelperText] = useState<string>('');

  const handleSignUp = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        setHelperText('Congratulations! You can now Sign In.');
        setTimeout(() => setHelperText(''), 2000);
        setSignUp(false); // Switch to sign-in mode after successful sign-up
      })
      .catch((error) => {
        const errorMessage = error.message;
        setHelperText(errorMessage);
        setTimeout(() => setHelperText(''), 2000);
      });
  };

  const handleSignIn = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        navigate('/index'); // Navigate to your to-do list page after sign-in
      })
      .catch((error) => {
        const errorMessage = error.message;
        setHelperText(errorMessage);
        setTimeout(() => setHelperText(''), 2000);
      });
  };

  return (
    <Container maxWidth='sm'>
      <Box
        sx={{
          marginTop: '10vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            backgroundColor: 'white',
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
            padding: '32px',
            borderRadius: '8px',
            width: '100%',
          }}
        >
          <Typography variant='h4' gutterBottom align='center'>
            {signUp ? 'Sign Up' : 'Sign In'}
          </Typography>
          <form onSubmit={(e) => e.preventDefault()}>
            <TextField
              id='eMailField'
              label='Email'
              variant='outlined'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              margin='normal'
            />
            <TextField
              id='passwordField'
              label='Password'
              type='password'
              variant='outlined'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              margin='normal'
            />
            <Button
              type='button' // Ensure type is 'button' to prevent form submission
              onClick={signUp ? handleSignUp : handleSignIn}
              variant='contained'
              fullWidth
              size='large'
              sx={{ marginTop: '16px' }}
            >
              {signUp ? 'Sign Up' : 'Sign In'}
            </Button>
          </form>
          <Typography variant='body2' align='center' sx={{ marginTop: '16px' }}>
            {signUp ? "Already have an account? " : "Don't have an account? "}
            <Link
              component='button'
              variant='body2'
              onClick={() => setSignUp(!signUp)}
              sx={{ fontWeight: 'bold', cursor: 'pointer' }}
            >
              {signUp ? 'Sign In' : 'Sign Up'}
            </Link>
          </Typography>
          {helperText && (
            <Typography
              variant='body2'
              align='center'
              color={helperText.includes('Congratulations') ? 'success.dark' : 'error.dark'}
              sx={{ marginTop: '16px' }}
            >
              {helperText}
            </Typography>
          )}
        </Box>
      </Box>
    </Container>
  );
}
