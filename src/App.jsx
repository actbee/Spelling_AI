import logo from './logo.svg';
import './App.css';
import {Route, Routes} from "react-router-dom";
import Main from "./components/main/main"
import Error from "./components/error"

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path= "/" element = {<Main />} exact/>
        <Route element = {<Error />} />
      </Routes>
    </div>
  );
}

export default App;
