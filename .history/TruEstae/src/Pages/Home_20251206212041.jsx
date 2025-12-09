import Logo from './Logo.jsx';
import SearchBar from '../components/search_bar.jsx'  
import '../Styles/Home.css';
function Home() {
  return (
    <>      
    <div className="Container_Ui">
        <div id ="Customer_Region">
            <options></options>
        </div>
        <div id ="Gender">
            <options>
                Male
                Female

            </options>
        </div>
        <div id ="Age"></div>
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
          <div className="date-range">
            <input type="date" />
            <input type="date" />
        </div>
    </div>
    </>
    )
    }
    export default Home;