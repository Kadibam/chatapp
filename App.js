import React, { useState } from 'react';
import { auth, provider } from './firebase';
import { signInWithPopup, signOut } from 'firebase/auth';
import Chat from './chat';
import './App.css';

function App() {
  const [user, setUser] = useState(null);

  // Sign in with Google
  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        setUser(result.user);
      })
      .catch((error) => {
        console.error('Login failed:', error);
      });
  };

  // Sign out
  const signOutUser = () => {
    signOut(auth)
      .then(() => {
        setUser(null);
      })
      .catch((error) => {
        console.error('Sign out failed:', error);
      });
  };

  return (
    <div>
      {user ? (
        <>
          <button onClick={signOutUser}>Sign Out</button>
          <Chat user={user} />
        </>
      ) : (
        <button onClick={signInWithGoogle}>Sign in with Google</button>
      )}
    </div>
  );
}

export default App;
