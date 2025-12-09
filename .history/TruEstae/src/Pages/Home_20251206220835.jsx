import { useEffect, useState } from "react";
import "../Styles/Home.css";

const PAGE_SIZE = 10;

function Home() {
  // ------- STATE: Search, Filters, Sort, Pagination ------- //
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState([]);
  const [gender, setGender] = useState([]);
  const [ageRange, setAgeRange] = useState([]);
  const [productCategory, setProductCategory] = useState([]);
  const [tags, setTags] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState([]);
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  const [sortBy, setSortBy] = useState("date_desc");
  const [page, setPage] = useState(1);

  // ------- DATA STATE ------- //
  const [rows, setRows] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ------- STATIC FILTER OPTIONS (baad me backend se la sakte ho) ------- //
  const regionOptions = ["Central", "North", "South", "East", "West"];
  const genderOptions = ["Male", "Female", "Other"];
  const ageOptions = ["18-25", "26-35", "36-50", "50+"];
  const categoryOptions = ["Electronics", "Clothing", "Grocery", "Furniture"];
  const tagOptions = ["New", "Popular", "Discount", "Seasonal"];
  const paymentOptions = ["Cash", "Card", "UPI", "Net Banking"];

  // --------- Helper for multi-select checkbox filters --------- //
  const toggleMultiSelect = (value, current, setter) => {
    if (current.includes(value)) {
      setter(current.filter((v) => v !== value));
    } else {
      setter([...current, value]);
    }
    setPage(1); // filter change -> go to page 1
  };

  // ------- Build query string for API ------- //
  const buildQuery = () => {
    const params = new URLSearchParams();
    if (search) params.append("search", search);
    if (region.length) params.append("region", region.join(","));
    if (gender.length) params.append("gender", gender.join(","));
    if (ageRange.length) params.append("ageRange", ageRange.join(","));
    if (productCategory.length)
      params.append("productCategory", productCategory.join(","));
    if (tags.length) params.append("tags", tags.join(","));
    if (paymentMethod.length)
      params.append("paymentMethod", paymentMethod.join(","));
    if (dateFrom) params.append("dateFrom", dateFrom);
    if (dateTo) params.append("dateTo", dateTo);
    if (sortBy) params.append("sortBy", sortBy);
    params.append("page", page);
    params.append("pageSize", PAGE_SIZE);
    return params.toString();
  };

  // ------- Fetch data from backend ------- //
  const fetchData = async () => {
    try {
      setLoading(true);
      setError("");

      const query = buildQuery();

      // TODO: apna backend URL yaha daalna
      const res = await fetch(`http://localhost:3000/api/sales?${query}`);

      if (!res.ok) throw new Error("Failed to fetch data");

      const data = await res.json();
      // Expecting: { items: [...], totalPages: number }
      setRows(data.items || []);
      setTotalPages(data.totalPages || 1);
    } catch (err) {
      console.error(err);
      setError("Error loading data");
    } finally {
      setLoading(false);
    }
  };

  // call whenever search/filters/sort/page change
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, region, gender, ageRange, productCategory, tags, paymentMethod, dateFrom, dateTo, sortBy, page]);

  // ------- Clear all filters ------- //
  const clearFilters = () => {
    setRegion([]);
    setGender([]);
    setAgeRange([]);
    setProductCategory([]);
    setTags([]);
    setPaymentMethod([]);
    setDateFrom("");
    setDateTo("");
    setPage(1);
  };

  // ------- Pagination handlers ------- //
  const handlePrev = () => {
    if (page > 1) setPage((p) => p - 1);
  };

  const handleNext = () => {
    if (page < totalPages) setPage((p) => p + 1);
  };

  return (
    <div className="page-container">
      {/* HEADER / TITLE */}
      <header className="header">
        <h1>Retail Sales Management</h1>
      </header>

      {/* SEARCH BAR */}
      <div className="search-bar-wrapper">
        <input
          type="text"
          className="search-input"
          placeholder="Search by customer name or phone..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />
      </div>

      <div className="content-layout">
        {/* LEFT: FILTER PANEL */}
        <aside className="filters-panel">
          <div className="filters-header">
            <h3>Filters</h3>
            <button className="clear-btn" onClick={clearFilters}>
              Clear All
            </button>
          </div>

          {/* REGION */}
          <section className="filter-block">
            <h4>Customer Region</h4>
            {regionOptions.map((r) => (
              <label key={r} className="checkbox-label">
                <input
                  type="checkbox"
                  checked={region.includes(r)}
                  onChange={() => toggleMultiSelect(r, region, setRegion)}
                />
                {r}
              </label>
            ))}
          </section>

          {/* GENDER */}
          <section className="filter-block">
            <h4>Gender</h4>
            {genderOptions.map((g) => (
              <label key={g} className="checkbox-label">
                <input
                  type="checkbox"
                  checked={gender.includes(g)}
                  onChange={() => toggleMultiSelect(g, gender, setGender)}
                />
                {g}
              </label>
            ))}
          </section>

          {/* AGE RANGE */}
          <section className="filter-block">
            <h4>Age Range</h4>
            {ageOptions.map((a) => (
              <label key={a} className="checkbox-label">
                <input
                  type="checkbox"
                  checked={ageRange.includes(a)}
                  onChange={() => toggleMultiSelect(a, ageRange, setAgeRange)}
                />
                {a}
              </label>
            ))}
          </section>

          {/* PRODUCT CATEGORY */}
          <section className="filter-block">
            <h4>Product Category</h4>
            {categoryOptions.map((c) => (
              <label key={c} className="checkbox-label">
                <input
                  type="checkbox"
                  checked={productCategory.includes(c)}
                  onChange={() =>
                    toggleMultiSelect(c, productCategory, setProductCategory)
                  }
                />
                {c}
              </label>
            ))}
          </section>

          {/* TAGS */}
          <section className="filter-block">
            <h4>Tags</h4>
            {tagOptions.map((t) => (
              <label key={t} className="checkbox-label">
                <input
                  type="checkbox"
                  checked={tags.includes(t)}
                  onChange={() => toggleMultiSelect(t, tags, setTags)}
                />
                {t}
              </label>
            ))}
          </section>

          {/* PAYMENT METHOD */}
          <section className="filter-block">
            <h4>Payment Method</h4>
            {paymentOptions.map((p) => (
              <label key={p} className="checkbox-label">
                <input
                  type="checkbox"
                  checked={paymentMethod.includes(p)}
                  onChange={() =>
                    toggleMultiSelect(p, paymentMethod, setPaymentMethod)
                  }
                />
                {p}
              </label>
            ))}
          </section>

          {/* DATE RANGE */}
          <section className="filter-block">
            <h4>Date Range</h4>
            <label className="date-label">
              From:
              <input
                type="date"
                value={dateFrom}
                onChange={(e) => {
                  setDateFrom(e.target.value);
                  setPage(1);
                }}
              />
            </label>
            <label className="date-label">
              To:
              <input
                type="date"
                value={dateTo}
                onChange={(e) => {
                  setDateTo(e.target.value);
                  setPage(1);
                }}
              />
            </label>
          </section>
        </aside>

        {/* RIGHT: RESULTS SECTION */}
        <main className="results-section">
          {/* TOP BAR: SORTING */}
          <div className="top-bar">
            <div className="top-bar-left">
              <span>
                Showing page {page} of {totalPages}
              </span>
            </div>
            <div className="top-bar-right">
              <label>
                Sort By:{" "}
                <select
                  value={sortBy}
                  onChange={(e) => {
                    setSortBy(e.target.value);
                    setPage(1);
                  }}
                >
                  <option value="date_desc">Date (Newest First)</option>
                  <option value="quantity">Quantity</option>
                  <option value="customer_name">Customer Name (A–Z)</option>
                </select>
              </label>
            </div>
          </div>

          {/* TABLE / LIST */}
          <div className="table-wrapper">
            {loading ? (
              <div className="status-text">Loading...</div>
            ) : error ? (
              <div className="status-text error">{error}</div>
            ) : rows.length === 0 ? (
              <div className="status-text">No results found.</div>
            ) : (
              <table className="transactions-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Customer Name</th>
                    <th>Phone</th>
                    <th>Region</th>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Final Amount</th>
                    <th>Payment</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row) => (
                    <tr key={row.id}>
                      <td>{row.date}</td>
                      <td>{row.customerName}</td>
                      <td>{row.phoneNumber}</td>
                      <td>{row.customerRegion}</td>
                      <td>{row.productName}</td>
                      <td>{row.quantity}</td>
                      <td>{row.finalAmount}</td>
                      <td>{row.paymentMethod}</td>
                      <td>{row.orderStatus}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* PAGINATION */}
          <div className="pagination">
            <button onClick={handlePrev} disabled={page === 1}>
              Previous
            </button>
            <span>
              Page {page} of {totalPages}
            </span>
            <button onClick={handleNext} disabled={page === totalPages}>
              Next
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Home;
