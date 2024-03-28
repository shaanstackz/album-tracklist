// TracklistForm.js
import React, { useState } from 'react';
import './TracklistForm.css'; // Import CSS file for styling

function TracklistForm({ addTrack }) {
  const [inputText, setInputText] = useState('');
  const [rhymingWords, setRhymingWords] = useState([]);
  const [relatedWords, setRelatedWords] = useState([]);
  const [randomRhymingWord, setRandomRhymingWord] = useState('');
  const [randomRelatedWord, setRandomRelatedWord] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const inputValue = e.target.value;
    const capitalizedInput = capitalizeFirstLetter(inputValue);
    setInputText(capitalizedInput);
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const fetchedRhymingWords = await fetchRhymingWords(inputText);
      console.log("Rhyming words:", fetchedRhymingWords); // Log fetched rhyming words
      setRhymingWords(fetchedRhymingWords);
  
      const fetchedRelatedWords = await fetchRelatedWords(inputText);
      console.log("Related words:", fetchedRelatedWords); // Log fetched related words
      setRelatedWords(fetchedRelatedWords);
  
      // Select one random rhyming word
      let randomRhyming = '';
      if (inputText.trim().split(' ').length > 1) {
        const lastWord = inputText.trim().split(' ').pop(); // Get the last word
        randomRhyming = fetchedRhymingWords.find(word => word.startsWith(lastWord)) || '';
      } else {
        randomRhyming = fetchedRhymingWords.length > 0 ? fetchedRhymingWords[Math.floor(Math.random() * fetchedRhymingWords.length)] : '';
      }
      console.log("Selected random rhyming word:", randomRhyming); // Log selected random rhyming word
      setRandomRhymingWord(randomRhyming);
  
      // Select one random related word
      const randomRelated = fetchedRelatedWords[Math.floor(Math.random() * fetchedRelatedWords.length)];
      console.log("Selected random related word:", randomRelated); // Log selected random related word
      setRandomRelatedWord(randomRelated);
    } catch (error) {
      console.error('Error fetching word information:', error);
    }
    setIsLoading(false);
  };

  const generateTitle = (selectedWord) => {
    if (selectedWord) {
      const songTitle = `${inputText} ${selectedWord}`;
      addTrack(songTitle);
      setInputText(''); // Clear the input text
    }
  };

  const fetchRhymingWords = async (word) => {
    const response = await fetch(`https://api.datamuse.com/words?rel_rhy=${word}`);
    const data = await response.json();
    return data.map(item => capitalizeFirstLetter(item.word));
  };

  const fetchRelatedWords = async (word) => {
    const response = await fetch(`https://api.datamuse.com/words?ml=${word}`);
    const data = await response.json();
    const relatedWords = data.map(item => capitalizeFirstLetter(item.word));
    // Filter out the input word itself and return the remaining related words
    return relatedWords.filter(w => w !== inputText);
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <input
          className="input-field"
          type="text"
          placeholder="Enter a word or phrase"
          value={inputText}
          onChange={handleChange}
          style={{ textTransform: 'capitalize' }}
        />
        <button className="button" type="submit" disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Fetch Words'}
        </button>
      </form>
      <div className="word-container">
        <h3>Rhyming Word:</h3>
        <p className="clickable" onClick={() => { generateTitle(randomRhymingWord); }}>{randomRhymingWord}</p>
      </div>
      <div className="word-container">
        <h3>Related Word:</h3>
        <p className="clickable" onClick={() => { generateTitle(randomRelatedWord); }}>{randomRelatedWord}</p>
      </div>
    </div>
  );
}

export default TracklistForm;
