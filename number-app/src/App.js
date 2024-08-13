import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [number, setNumber] = useState(0);
  const [history, setHistory] = useState([{ number: 0 }]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [inputValue, setInputValue] = useState('');

  const maxNumber = 150;
  const minNumber = 0;

  const updateNumber = (newNumber) => {
    if (newNumber >= minNumber && newNumber <= maxNumber) {
      const newHistory = history.slice(0, currentIndex + 1);
      newHistory.push({ number: newNumber });
      setHistory(newHistory);
      setCurrentIndex(newHistory.length - 1);
      setNumber(newNumber);
    }
  };

  const handleAdd = () => updateNumber(number + 1);
  const handleSubtract = () => updateNumber(number - 1);
  const handleUndo = () => {
    if (currentIndex > 0) {
      setNumber(history[currentIndex - 1].number);
      setCurrentIndex(currentIndex - 1);
    }
  };
  const handleRedo = () => {
    if (currentIndex < history.length - 1) {
      setNumber(history[currentIndex + 1].number);
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSetNumber = () => {
    const newNumber = parseInt(inputValue, 10);
    if (!isNaN(newNumber)) {
      updateNumber(newNumber);
    }
    setInputValue('');
  };

  return (
    <div className="App">
      <div className="controls">
        <button onClick={handleSubtract}>-1</button>
        <button onClick={handleAdd}>+1</button>
        <button onClick={handleUndo} disabled={currentIndex === 0}>Undo</button>
        <button onClick={handleRedo} disabled={currentIndex === history.length - 1}>Redo</button>
      </div>
      <div className="input-container">
        <input
          type="number"
          value={inputValue}
          onChange={handleInputChange}
          min={minNumber}
          max={maxNumber}
          placeholder="Enter number"
        />
        <button onClick={handleSetNumber}>Set Number</button>
      </div>
      <div className="progress-container">
        <div
          className="progress-bar"
          style={{ width: `${(number / maxNumber) * 100}%` }}
        ></div>
      </div>
      <div className="number-display">{number}</div>
    </div>
  );
};

export default App;
