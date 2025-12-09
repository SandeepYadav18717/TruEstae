import { useState, useEffect } from "react";
import "../Styles/Home.css";

function Home() {
  const [filters, setFilters] = useState({
    region: "",
    gender: "",
    age: "",
    category: "",
    tags: "",
    payment: "",
    date: "",
    sortBy: "",
  });

  const [data, setData] = useState([]);

  // Handle filter changes
  function handleChange(e) {
    const { id, value } = e.target;
    setFilters((prev) => ({ ...prev, [id]: value }));
  }

  // Auto fetch when filters chage
  useEffect(() => {
    async function fetchData() {
      const res = await fetch("http://localhost:5000/get-data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(filters),
      });

      const result = await res.json();
      setData(result);
    }

    fetchData();
  }, [filters]);

  return (
    <>
      <h2 style={{ marginLeft: "20px" }}>Retail Dashboard</h2>

      <div className="Container_Ui">
        
        {/* REGION */}
        <select id="region" onChange={handleChange}>
          <option hidden>Region</option>
          <option>Central</option>
          <option>North</option>
          <option>South</option>
          <option>East</option>
          <option>West</option>
        </select>

        {/* GENDER */}
        <select id="gender" onChange={handleChange}>
          <option hidden>Gender</option>
          <option>Male</option>
          <option>Female</option>
        </select>

        {/* AGE */}
        <select id="age" onChange={handleChange}>
          <option hidden>Age</option>
          <option>18-25</option>
          <option>26-35</option>
          <option>36-50</option>
          <option>50+</option>
        </select>

        {/* CATEGORY */}
        <select id="category" onChange={handleChange}>
          <option hidden>Product Category</option>
          <option>Beauty</option>
          <option>Electronic</option>
          <option>Clothing</option>
        </select>

        {/* TAGS */}
        <select id="tags" onChange={handleChange}>
          <option hidden>Tags</option>
          <option>Sale</option>
          <option>Hot</option>
          <option>Popular</option>
        </select>

        {/* PAYMENT */}
        <select id="payment" onChange={handleChange}>
          <option hidden>Payment Method</option>
          <option>Wallet</option>
          <option>Cash</option>
          <option>Card</option>
          <option>UPI</option>
          <option>Net Banking</option>
        </select>

        {/* DATE */}
        <input id="date" type="date" onChange={handleChange} />

        {/* SORT */}
        <select id="sortBy" onChange={handleChange}>
          <option hidden>Sort By</option>
          <option value="name-asc">Customer Name (A-Z)</option>
          <option value="name-desc">Customer Name (Z-A)</option>
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
        </select>
      </div>

      {/* DISPLAY DATA */}
      <div style={{ marginTop: "20px", padding: "10px" }}>
        {data.length === 0 ? (
          <p>No records found</p>
        ) : (
          data.map((item, index) => (
            <div
              key={index}
              style={{
                border: "1px solid #ccc",
                marginBottom: "10px",
                padding: "10px",
                borderRadius: "6px",
              }}
            >
              {Object.entries(item).map(([key, value]) => (
                <p key={key}>
                  <b>{key}:</b> {value}
                </p>
              ))}
            </div>
          ))
        )}
      </div>
    </>
  );
}

export default Home;
