import { Link } from "react-router-dom";

function Movielist(s) {
    return(

        <div class="Content">       
        
        <h2>Roots Of Equations</h2>
        <fieldset class="box01">
          <label>

            <Link to="/Bisection">
            <img class = "MovieCover" alt="Bisection" src='./image/ROE-two.png'/>
            </Link>

            <Link to="/">
            <img class = "MovieCover" alt="FlasePosition" src='./image/ROE-tree.png'/>
            </Link>

            <Link to="/">
            <img class = "MovieCover" alt="OnePoint" src='./image/ROE-four.png'/>
            </Link>

            <Link to="/">
            <img class = "MovieCover" alt="NewtonRaphson" src='./image/ROE-five.png'/>
            </Link>

            <Link to="/">
            <img class = "MovieCover" alt="Secant" src='./image/ROE-six.png'/>
            </Link>
            
           

          </label>
        </fieldset>

        <h2>Linear Algebraic Equations</h2>
        <fieldset class="box01">
          <label>

          <Link to="/">
            <img class = "MovieCover" alt="01" src='./image/LAE-01.png'/>
            </Link>

            <Link to="/">
            <img class = "MovieCover" alt="01" src='./image/LAE-02.png'/>
            </Link>

            <Link to="/">
            <img class = "MovieCover" alt="01" src='./image/LAE-03.png'/>
            </Link>

            <Link to="/">
            <img class = "MovieCover" alt="01" src='./image/LAE-04.png'/>
            </Link>

          </label>
        </fieldset>


        <h2>Linear Algebraic Equations</h2>
        <fieldset class="box01">
          <label>

          <Link to="/PageAbout">
            <img class = "MovieCover" alt="01" src='./image/LAE-01.png'/>
            </Link>

            <Link to="/">
            <img class = "MovieCover" alt="01" src='./image/LAE-02.png'/>
            </Link>

            <Link to="/">
            <img class = "MovieCover" alt="01" src='./image/LAE-03.png'/>
            </Link>

            <Link to="/">
            <img class = "MovieCover" alt="01" src='./image/LAE-04.png'/>
            </Link>
               
          </label>
        </fieldset>

      </div>
    );
}

export default Movielist;