import { useState, useEffect } from "react";
import Logo from "./Logo.jsx";
import SearchBar from "../components/search_bar.jsx";
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
    page: 1,
    limit: 10,
  });

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    const { id, value } = e.target;
    setFilters((prev) => ({ ...prev, [id]: value, page: 1 })); // reset to page 1
  }

  useEffect(() => {
    async function fetchData() {
      setLoading(true);

      const res = await fetch("http://localhost:5000/get-data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(filters),
      });

      const result = await res.json();
      setData(result);

      setLoading(false);
    }

    fetchData();
  }, [filters]);

  return (
    <>
      <div className="topBar">
        <Logo />
        <SearchBar />
      </div>

      {/* FILTER UI */}
      <div className="Container_Ui">
        <div id="Customer_Region">
          <select id="region" onChange={handleChange}>
            <option hidden>Region</option>
            <option>Central</option>
            <option>North</option>
            <option>South</option>
            <option>East</option>
            <option>West</option>
          </select>
        </div>

        <div id="Gender">
          <select id="gender" onChange={handleChange}>
            <option hidden>Gender</option>
            <option>Male</option>
            <option>Female</option>
          </select>
        </div>

        <div id="Age">
          <select id="age" onChange={handleChange}>
            <option hidden>Age</option>
            <option>18-25</option>
            <option>26-35</option>
            <option>36-50</option>
            <option>50+</option>
          </select>
        </div>

        <div id="Product_Category">
          <select id="category" onChange={handleChange}>
            <option hidden>Product Category</option>
            <option>Beauty</option>
            <option>Electronic</option>
            <option>Clothing</option>
          </select>
        </div>

        <div id="Tags">
          <select id="tags" onChange={handleChange}>
            <option hidden>Tags</option>
          </select>
        </div>

        <div id="Payment_Method">
          <select id="payment" onChange={handleChange}>
            <option hidden>Payment Method</option>
            <option>Wallet</option>
            <option>Cash</option>
            <option>Card</option>
            <option>UPI</option>
            <option>Net Banking</option>
          </select>
        </div>

        <div id="Date">
          <input id="date" type="date" onChange={handleChange} />
        </div>

        <div id="SortBy">
          <select id="sortBy" onChange={handleChange}>
            <option hidden>Sort by</option>
            <option value="name-asc">Customer Name (A-Z)</option>
            <option value="name-desc">Customer Name (Z-A)</option>
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
          </select>
        </div>
      </div>

   
      {loading && (
        <h2 style={{ textAlign: "center", marginTop: "20px" }}>Loading...</h2>
      )}

      {/* TABLE */}
      {!loading && (
        <div style={{ margin: "20px" }}>
          <table
            border="1"
            cellPadding="8"
            style={{
              width: "70%",
              borderCollapse: "collapse",
              background: "white",
            }}
          >
            <thead>
              <tr>
                {data.length > 0 &&
                  Object.keys(data[0]).map((key) => (
                    <th
                      key={key}
                      style={{ background: "#eee", textTransform: "capitalize",width: }}
                    >
                      {key}
                    </th>
                  ))}
              </tr>
            </thead>

            <tbody>
              {data.map((row, index) => (
                <tr key={index}>
                  {Object.values(row).map((value, i) => (
                    <td key={i}>{value}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* PAGINATION BUTTONS */}
      <div style={{ display: "flex", justifyContent: "center", gap: "20px", marginTop: "20px" }}>
        <button
          disabled={filters.page === 1}
          onClick={() =>
            setFilters((prev) => ({ ...prev, page: prev.page - 1 }))
          }
        >
          Prev
        </button>

        <span>Page {filters.page}</span>

        <button
          disabled={data.length < filters.limit}
          onClick={() =>
            setFilters((prev) => ({ ...prev, page: prev.page + 1 }))
          }
        >
          Next
        </button>
      </div>
    </>
  );
}

export default Home;
