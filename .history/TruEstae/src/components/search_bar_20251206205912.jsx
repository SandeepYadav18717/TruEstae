import '../Styles/search_bar.css';


function InputBar() {
  return (
    <div className="search_bar">
      <input type="text" placeholder="Search properties..." /> <h1></h1>
      <button type="submit">Search</button>
    </div>
  );
}

export default InputBar;