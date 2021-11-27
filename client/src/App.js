import './App.css';
//imports 
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Home from './components/Home';
import Detail from './components/Detail';
import Create from './components/Create';
import Genres from './components/Genres';


function App() {
  return (
    <BrowserRouter>
      <div className="App">
      <Routes>
        <Route exact path = '/' element = {<LandingPage/>}/>
        <Route exact path = '/home' element = {<Home/>}/>
        <Route path='/videogame' element={<Create/>}/>
        {/* <Route  path = 'videogame/:id' 
        element = {({match})=> {console.log(match.params.id); return <Detail id={match.params.id}/>}}/>
         */}<Route path='/genres' element = {<Genres/>}/>
          <Route path="/videogame/:id" element={<Detail/>}/>
      </Routes>
      </div>
    </BrowserRouter>

  );
}

export default App;
