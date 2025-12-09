import { useState } from 'react';
import '../Styles/search_bar.css';

function InputBar({ onSearch }) {
  const [query, setQuery] = useState("7827xxxx or ");

  return (
    <div className="search_bar">
      <input 
        type="text" 
        placeholder="name or phone number" 
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button type="submit" onClick={() => onSearch(query)}>
        Search
      </button>
    </div>
  );
}

export default InputBar;
