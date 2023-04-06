//ออกแบบตัว App 
import { BrowserRouter as Router,Route,Link,Switch } from 'react-router-dom';
import './App.css';
import Header from './Header';
import MovieA from './MovieA';
import RoeGraphics from './RoeGraphics';
import Movielist from './MovieList';
import PageAbout from './PageAbout';
import PageBook from './PageBook';

const Title =()=> <h1 align = 'center' style = {{color:'red'}}>Ultraman Name list</h1>
const Play =()=> <h2>KAMEN RIDER SUPER - ONE</h2>
function App() {
  return (
      <Router>
        <Header />
        <Switch>
          <Route exact path ="/" component={Movielist} />
          <Route path='/PageAbout' component={PageAbout}/>
          <Route path='/PageBook' component={PageBook}/> 
        </Switch>       
      </Router>   

  );
}

export default App;