import { useEffect, useState } from "react";
import Logo from './Logo.jsx';
import SearchBar from '../components/search_bar.jsx';  
import '../Styles/Home.css';

function Home() {
  
  // STATES TO STORE API DATA
  const [regions, setRegions] = useState([]);
  const [genders, setGenders] = useState([]);
  const [ages, setAges] = useState([]);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);

  // FETCH DATA FROM FASTAPI
  useEffect(() => {
    fetch("http://localhost:8000/regions")
      .then(res => res.json())
      .then(data => setRegions(data.regions));

    fetch("http://localhost:8000/gender")
      .then(res => res.json())
      .then(data => setGenders(data.gender));

    fetch("http://localhost:8000/age-ranges")
      .then(res => res.json())
      .then(data => setAges(data.ages));

    fetch("http://localhost:8000/product-categories")
      .then(res => res.json())
      .then(data => setCategories(data.categories));

    fetch("http://localhost:8000/tags")
      .then(res => res.json())
      .then(data => setTags(data.tags));
  }, []);

  return (
    <>
    <div className="Container_Ui">

      {/* REGION */}
      <div id="Customer_Region">
        <label>Region </label>
        <select>
          <option>All</option>
          {regions.map((r, i) => (
            <option key={i}>{r}</option>
          ))}
        </select>
      </div>

      {/* GENDER */}
      <div id="Gender">
        <label>Gender </label>
        <select>
          <option>All</option>
          {genders.map((g, i) => (
            <option key={i}>{g}</option>
          ))}
        </select>
      </div>

      {/* AGE */}
      <div id="Age">
        <label>Age </label
        <select>
          <option>All</option>
          {ages.map((age, i) => (
            <option key={i}>{age}</option>
          ))}
        </select>
      </div>

      {/* PRODUCT CATEGORY */}
      <div id="Product_Category">
        <label>Product Category</label>
        <select>
          <option>All</option>
          {categories.map((c, i) => (
            <option key={i}>{c}</option>
          ))}
        </select>
      </div>

      {/* TAGS */}
      <div id="Tags">
        <label>Tags</label>
        <select>
          <option>All</option>
          {tags.map((t, i) => (
            <option key={i}>{t}</option>
          ))}
        </select>
      </div>

      {/* PAYMENT METHOD (STATIC — unless you want dynamic) */}
      <div id="Payment_Method">
        <label>Payment Method</label>
        <select>
            <option>All</option>
            <option>Cash</option>
            <option>Card</option>
            <option>UPI</option>
            <option>Net Banking</option>
        </select>
      </div>

      {/* DATE */}
      <div id="Date">
        <label>Date</label>
        <input type="date" />
      </div>

    </div>
    </>
  );
}

export default Home;
