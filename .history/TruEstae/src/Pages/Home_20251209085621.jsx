import { useState, useEffect } from "react";
import Logo from "./Logo.jsx";
import InputBar from "../components/search_bar.jsx";
import "../Styles/Home.css";
import Table from "./Table.jsx";

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

  // SEARCH STATES
  const [isSearching, setIsSearching] = useState(false);
  const [searchPage, setSearchPage] = useState(1);
  const [totalSearchRows, setTotalSearchRows] = useState(0);
  const [currentQuery, setCurrentQuery] = useState("");

  // ===================== SEARCH FUNCTION (PAGE 1) =====================
  const handleSearch = async (query) => {
    setLoading(true);
    setIsSearching(true);
    setSearchPage(1);
    setCurrentQuery(query);

    const res = await fetch("http://localhost:5000/search-name-phone", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query, page: 1, limit: 20 }),
    });

    const result = await res.json();
    setTotalSearchRows(result.total);
    setData(result.data);

    setLoading(false);
  };

  // ===================== LOAD NEXT SEARCH PAGE =====================
  const loadSearchPage = async (pageNum) => {
    setLoading(true);
    setSearchPage(pageNum);

    const res = await fetch("http://localhost:5000/search-name-phone", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: currentQuery,
        page: pageNum,
        limit: 20,
      }),
    });

    const result = await res.json();
    setData(result.data);

    setLoading(false);
  };

  // ===================== FILTER CHANGE =====================
  const Page = (e) => {
    const { id, value } = e.target;

    setIsSearching(false); 
    setFilters((prev) => ({ ...prev, [id]: value, page: 1 }));
  };

  // ===================== APPLY FILTERS =====================
  useEffect(() => {
    if (isSearching) return; 

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
        <InputBar onSearch={handleSearch} />
      </div>

      {/* ---------------- FILTER UI ---------------- */}
      <div className="Container_Ui">
        <select id="region" onChange={Page}>
          <option hidden>Region</option>
          <option>Central</option>
          <option>North</option>
          <option>South</option>
          <option>East</option>
          <option>West</option>
        </select>

        <select id="gender" onChange={Page}>
          <option hidden>Gender</option>
          <option>Male</option>
          <option>Female</option>
        </select>

        <select id="age" onChange={Page}>
          <option hidden>Age</option>
          <option>18-25</option>
          <option>26-35</option>
          <option>36-50</option>
          <option>50+</option>
        </select>

        <select id="category" onChange={Page}>
          <option hidden>Product Category</option>
          <option>Beauty</option>
          <option>Electronic</option>
          <option>Clothing</option>
        </select>

        <select id="tags" onChange={Page}>
          <option hidden>Tags</option>
          <option>skincare</option>
          <option>beauty</option>
          <option>fashion</option>
          <option>organic</option>
          <option>makeup</option>
        </select>

        <select id="payment" onChange={Page}>
          <option hidden>Payment Method</option>
          <option>Wallet</option>
          <option>Cash</option>
          <option>DebitCard</option>
          <option>UPI</option>
          <option>Net Banking</option>
        </select>

        <input id="date" type="date" onChange={Page} />

        <select id="sortBy" onChange={Page}>
          <option hidden>Sort by</option>
          <option value="name-asc">Customer Name (A-Z)</option>
          <option value="name-desc">Customer Name (Z-A)</option>
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
        </select>
      </div>

      {/* ---------------- LOADER ---------------- */}
      {loading && <h2>Loading...</h2>}

      {/* ---------------- TABLE ---------------- */}
      {!loading && <Table data={data} />}

      {/* ---------------- PAGINATION ---------------- */}
      <div className="pagination_section">

        {/* SEARCH PAGINATION */}
        {isSearching ? (
          <>
            <button
              disabled={searchPage === 1}
              onClick={() => loadSearchPage(searchPage - 1)}
            >
              Prev
            </button>

            <span>Search Page {searchPage}</span>

            <button
              disabled={searchPage * 20 >= totalSearchRows}
              onClick={() => loadSearchPage(searchPage + 1)}
            >
              Next
            </button>
          </>
        ) : (
          /* FILTER PAGINATION */
          <>
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
          </>
        )}
      </div>
    </>
  );
}

export default Home;
