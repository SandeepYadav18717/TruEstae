import '../Styles/search_bar.css';


function InputBar() {
  return (
    <div className="search_bar">
      <input type="text" placeholder="number and phone number" />
      <button type="submit">Search</button>
    </div>
  );
}

export default InputBar;