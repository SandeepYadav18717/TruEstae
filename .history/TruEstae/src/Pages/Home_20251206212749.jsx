import Logo from './Logo.jsx';
import SearchBar from '../components/search_bar.jsx'  
import '../Styles/Home.css';
function Home() {
  return (
    <>      
    <div className="Container_Ui">
        <div id ="Customer_Region">
             <label>Region </label>
        </div>


        <div id ="Gender">
            <label>Gender </label>
               <select>
            <option>All</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
        </div>


        <div id ="Age">
            <label>Age Group</label>
             <select>
            <option>All</option>
            <option>18-25</option>
            <option>26-35</option>
            <option>36-50</option>
            <option>50+</option>
          </select>
        </div>
        <div id ="Product_Category"></div>
        <div id ="Tags"></div>



        <div id ="Payment_Method">
            <label>Payment Method</label>
          <select>
            <option>All</option>
            <option>Cash</option>
            <option>Card</option>
            <option>UPI</option>
            <option>Net Banking</option>
          </select>
        </div>


        <div id ="Date">
            <label>Date Range</label>
          <input type="date" />
        
        </div>
    </div>
    </>
    )
    }
    export default Home;