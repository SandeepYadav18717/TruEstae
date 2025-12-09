import Search_bar from './components/search_bar.jsx'

function InputBar() {
  return (
    <div className="search_bar">
      <input type="text" placeholder="Search properties..." />
      <button type="submit">Search</button>
    </div>
  );
}

export default InputBar;