// Tracklist.js
import React from 'react';

function Tracklist({ tracklist }) {
  return (
    <div>
      <h2>Song Titles</h2>
      <ul>
        {tracklist.map((track, index) => (
          <li key={index}>{track}</li>
        ))}
      </ul>
    </div>
  );
}

export default Tracklist;
