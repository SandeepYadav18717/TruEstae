import Logo from './Logo.jsx';
import SearchBar from '../components/search_bar.jsx'  
import '../Styles/Home.css';
function Home() {
  return (
    <>      
    <div className="Container_Ui">
        <div id ="Customer_Region">
             <label>Region </label>
              <select>
            <option>Central</option>
            <option>North</option>
            <option>South</option>
            <option>East</option>
            <option>West</option>
          </select>
        </div>
        </div>


        <div id ="Gender">
            <label>Gender </label>
               <select>
            
            <option>Male</option>
            <option>Female</option>
            
          </select>
        </div>


        <div id ="Age">
            <label>Age </label>
            
            <br></br><br/>
             <select>
            
            <option>18-25</option>
            <option>26-35</option>
            <option>36-50</option>
            <option>50+</option>
          </select>
        </div>
        <br></br><br/>
        <div id ="Product_Category">
            <select><option>Beauty</option>
            <option>Electronic</option>
            <option>Beauty</option></select>
        </div>
        <br></br><br/>
        <div id ="Tags"></div>
        <br></br><br/>


<br/>
        <div id ="Payment_Method">
            <label>Payment Method</label>
            <br></br><br/>
          <select>
            <option>Wallet</option>
            <option>Cash</option>
            <option>Card</option>
            <option>UPI</option>
            <option>Net Banking</option>
          </select>
        </div>

<br/>
        <div id ="Date">
            
            <br></br><br/>
            <label>Date</label>
            <br/>
          <input type="date" />
        
        </div>
    
    </>
    )
    }
    export default Home;