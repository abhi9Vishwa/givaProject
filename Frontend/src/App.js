import './App.css';
import CollapsibleExample from './Component/Header';
import { Route,Routes } from "react-router-dom";
import Register from './Component/Register';
import Login from './Component/Login';
import Posts from './Component/Post';

function App() {
  return (
  
    <div className="App">
        <CollapsibleExample/>
        <Routes>
                 <Route exact path='/login' element={< Login />}></Route>
                 <Route exact path='/regis' element={< Register />}></Route>
                 <Route exact path='/post' element={< Posts />}></Route>
                 
          </Routes>
      
      </div>
  );
}

export default App;
