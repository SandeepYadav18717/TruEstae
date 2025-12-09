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
                <Male></Male>
            </options>
        </div>
        <div id ="Age"></div>
        <div id ="Product_Category"></div>
        <div id ="Tags"></div>
        <div id ="Payment_Method"></div>
        <div id ="Date"></div>
    </div>
    </>
    )
    }
    export default Home;