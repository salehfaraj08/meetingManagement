import "./App.css";
import Header from './components/header'
import { BrowserRouter, Route } from "react-router-dom";
import Home from "./components/Home";
import Meeting from "./components/meeting";
function App() {

  return (
    <div>
      <BrowserRouter>
        <Header />
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/meeting">
          <Meeting />
        </Route>
      </BrowserRouter>
    </div>
  )
}

export default App;
