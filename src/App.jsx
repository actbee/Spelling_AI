import logo from './logo.svg';
import './App.css';
import {Route, Routes} from "react-router-dom";
import Main from "./components/main/main"
import Data from "./components/data/data"
import Error from "./components/error"

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path= "/" element = {<Main />} exact/>
        <Route path = "/data" element = {<Data />} exact></Route>
        <Route element = {<Error />} />
      </Routes>
    </div>
  );
}

export default App;
