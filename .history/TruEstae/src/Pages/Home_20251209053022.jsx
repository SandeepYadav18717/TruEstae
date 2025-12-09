import { useState, useEffect } from "react";
import Logo from "./Logo.jsx";
import SearchBar from "../components/search_bar.jsx";
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

  function Page(e) {
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
     

      {/*here is the loader if loading is true no data show  */}
      {loading && <h2>Loading...</h2>}

      {/* using props to get the table when loader is not true */}
      {!loading && <Table data={data} />}

      {/* PAGINATION BUTTONS */}
      <div>
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
