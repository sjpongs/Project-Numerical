import { BrowserRouter, Link } from "react-router-dom";
import RoeGraphics from "./RoeGraphics";

function Header() {
    return(
    <div>
        <header>
      <img class="Nummer-logo" alt= "APPLogo" src='./image/netflix-logo.png'/>
      <a id="NName">พงศฑล ทะโทน 6204062636163</a>
      <a>
      <img class = "User" alt="sjpongs" src='./image/SJ-profile.png'/>
      </a>
      
      </header>

      <div class="menu">
        <ul>
        <li><Link to="/" exact>HOME</Link></li>
        <li><Link to="/PageAbout">ABOUT</Link></li>
        <li><Link to="/PageBook">BOOK</Link></li>
        </ul>       
    </div> 

    </div>   
    );
    }

export default Header;