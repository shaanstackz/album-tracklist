// App.js
import React, { useState } from 'react';
import TracklistForm from './TracklistForm';
import './App.css';
import Tracklist from './Tracklist';

function App() {
  const [tracklist, setTracklist] = useState([]);

  const addTrack = (track) => {
    setTracklist([...tracklist, track]);
  };

  return (
    <div className="App">
      <h1>Album Tracklist Name Generator</h1>
      <TracklistForm addTrack={addTrack} />
      <Tracklist tracklist={tracklist} />
    </div>
  );
}

export default App;
