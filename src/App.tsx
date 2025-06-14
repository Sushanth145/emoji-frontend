import React, { useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [text, setText] = useState('');
  const [emojiOutput, setEmojiOutput] = useState('');
  const [emojiInput, setEmojiInput] = useState(''); 
  const [decryptedText, setDecryptedText] = useState('');

  const handleEncrypt = async () => {
    try {
      const res = await axios.post('http://localhost:3000/emoji/encrypt', { text });
      setEmojiOutput(res.data.encrypted);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDecrypt = async () => {
    try {
      const res = await axios.post('http://localhost:3000/emoji/decrypt', { emoji: emojiInput });
      setDecryptedText(res.data.decrypted);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="App">
      <h1>🔐 Emoji Encryptor</h1>

      <div>
        <textarea
          rows={4}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text to encrypt..."
        />
        <br />
        <button onClick={handleEncrypt}>Encrypt</button>
        <div><strong>Encrypted:</strong> <p>{emojiOutput}</p></div>
      </div>

      <hr />

      <div>
        <textarea
          rows={4}
          value={emojiInput}
          onChange={(e) => setEmojiInput(e.target.value)}
          placeholder="Paste encrypted emojis..."
        />
        <br />
        <button onClick={handleDecrypt}>Decrypt</button>
        <div><strong>Decrypted:</strong> <p>{decryptedText}</p></div>
      </div>
    </div>
  );
}

export default App;
