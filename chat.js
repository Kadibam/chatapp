import React, { useState, useEffect } from 'react';
import { db } from './firebase';
import { collection, addDoc, onSnapshot, query, orderBy } from 'firebase/firestore';
import { formatRelative } from 'date-fns';

function Chat({ user }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  // Fetch messages from Firestore in real-time
  useEffect(() => {
    const q = query(collection(db, 'messages'), orderBy('timestamp', 'asc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs.map(doc => ({
        id: doc.id,
        data: doc.data()
      })));
    });

    // Clean up the listener when the component unmounts
    return () => unsubscribe();
  }, []);

  // Send a message to Firestore
  const sendMessage = async (e) => {
    e.preventDefault();

    if (input.trim()) {
      await addDoc(collection(db, 'messages'), {
        username: user.displayName,
        text: input,
        timestamp: new Date(),
      });
      setInput('');
    }
  };

  return (
    <div>
      <div style={{ marginBottom: '20px' }}>
        {messages.map(({ id, data }) => (
          <div key={id} style={{ padding: '10px', margin: '5px 0', backgroundColor: '#f1f1f1', borderRadius: '10px', }}>
            <strong>{data.username}</strong><br></br> {data.text}
            <br />
            <small>{data.timestamp ? formatRelative(data.timestamp.toDate(), new Date()) : 'Sending...'}</small>
          </div>
        ))}
      </div>

      <form onSubmit={sendMessage}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          style={{ padding: '10px', width: '80%', borderRadius: '5px' }}
        />
        <button type="submit" style={{ padding: '10px 20px', marginLeft: '10px' }}>
          Send
        </button>
      </form>
    </div>
  );
}

export default Chat;
