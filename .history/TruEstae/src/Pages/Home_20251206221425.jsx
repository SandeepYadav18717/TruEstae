import "../Styles/Home.css";

function Home() {
  return (
    <>
      <div className="Container_Ui">

      

        <div className="Main_Layout">

          {/* ---------------- FILTER PANEL ---------------- */}
          <div id="Filter_Panel">

            <h3>Filters</h3>

            {/* Customer Region */}
            <div id="Customer_Region" className="filter_block">
              <label>Region</label>
              <select>
                <option>All</option>
                <option>Central</option>
                <option>North</option>
                <option>South</option>
                <option>East</option>
                <option>West</option>
              </select>
            </div>

            {/* Gender */}
            <div id="Gender" className="filter_block">
              <label>Gender</label>
              <select>
                <option>All</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>

            {/* Age Range */}
            <div id="Age" className="filter_block">
              <label>Age</label>
              <select>
                <option>All</option>
                <option>18-25</option>
                <option>26-35</option>
                <option>36-50</option>
                <option>50+</option>
              </select>
            </div>

            {/* Product Category */}
            <div id="Product_Category" className="filter_block">
              <label>Product Category</label>
              <select>
                <option>All</option>
                <option>Electronics</option>
                <option>Clothing</option>
                <option>Grocery</option>
                <option>Furniture</option>
              </select>
            </div>

            {/* Tags */}
            <div id="Tags" className="filter_block">
              <label>Tags</label>
              <select>
                <option>All</option>
                <option>Popular</option>
                <option>Discount</option>
                <option>Seasonal</option>
                <option>New</option>
              </select>
            </div>

            {/* Payment Method */}
            <div id="Payment_Method" className="filter_block">
              <label>Payment Method</label>
              <select>
                <option>All</option>
                <option>Cash</option>
                <option>Card</option>
                <option>UPI</option>
                <option>Net Banking</option>
              </select>
            </div>

            {/* Date Filter */}
            <div id="Date" className="filter_block">
              <label>Date</label>
              <input type="date" />
            </div>

          </div>

          {/* ---------------- MAIN TABLE AREA ---------------- */}
          <div id="Main_Content">

            {/* Sorting */}
            <div id="Sorting">
              <label>Sort By:</label>
              <select>
                <option>Date (Newest First)</option>
                <option>Quantity</option>
                <option>Customer Name (A–Z)</option>
              </select>
            </div>

            {/* TABLE Placeholder */}
            <div id="Transaction_Table">
              <p>Transaction Table Will Appear Here...</p>
            </div>

            {/* Pagination */}
            <div id="Pagination">
              <button>Previous</button>
              <span>Page 1 of 10</span>
              <button>Next</button>
            </div>

          </div>

        </div>
      </div>
    </>
  );
}

export default Home;
