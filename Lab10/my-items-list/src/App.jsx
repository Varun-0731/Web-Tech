import React, { useState } from 'react';

const InputSection = ({ onAddItem }) => {
  const [inputValue, setInputValue] = useState('');

  const handleAdd = () => {
    if (inputValue.trim()) {
      onAddItem(inputValue);
      setInputValue('');
    }
  };

  return (
    <div className="input-container">
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Enter an item..."
      />
      <button onClick={handleAdd}>ADD</button>
    </div>
  );
};

const ListSection = ({ items, onRemoveItem }) => {
  if (items.length === 0) {
    return <p className="empty-message">The list is empty.</p>;
  }

  return (
    <ul className="item-list">
      {items.map((item) => (
        <li key={item.id} className="item">
          <span>{item.text}</span>
          <button onClick={() => onRemoveItem(item.id)}>REMOVE</button>
        </li>
      ))}
    </ul>
  );
};

const App = () => {
  const [items, setItems] = useState([]);

  const addItem = (text) => {
    const newItem = {
      id: crypto.randomUUID(),
      text: text
    };
    setItems([...items, newItem]);
  };

  const removeItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  return (
    <div className="app-container">
      <h1>Item Manager</h1>
      <InputSection onAddItem={addItem} />
      <ListSection items={items} onRemoveItem={removeItem} />
    </div>
  );
};

export default App;