import Logo from "./Logo.jsx";
import SearchBar from "../components/search_bar.jsx";
import "../Styles/Home.css";
function Home() {
  return (
    <>
      <div className="Container_Ui">
        <div id="Customer_Region">
         
          <select>
  <option value="" hidden>Region</option>
  <option>Central</option>
  <option>North</option>
  <option>South</option>
  <option>East</option>
  <option>West</option>
</select>
        
          </div>

      <div id="Gender">
        
        <select>
            <option value="" hidden>Gender</option>
          <option>Male</option>
          <option>Female</option>
        </select>
      </div>

      <div id="Age">
        
        <select>
            <option value="" hidden>Age</option>
          <option>18-25</option>
          <option>26-35</option>
          <option>36-50</option>
          <option>50+</option>
        </select>
      </div>

      <div id="Product_Category">
        <select>
            <option value="" hidden>Product Category</option>
          <option>Beauty</option>
          <option>Electronic</option>
          <option>Clothing</option>
        </select>
      </div>

      <div id="Tags"></div>

      <div id="Payment_Method">
        
        <select>
            <option value="" hidden>Payment Method</option>
          <option>Wallet</option>
          <option>Cash</option>
          <option>Card</option>
          <option>UPI</option>
          <option>Net Banking</option>
        </select>
      </div>

      <div id="Date">
        <select>
        <option value="" hidden>Date</option>
        <input type="date" />
        </select>
      </div>
</div>
    </>
  );
}
export default Home;
