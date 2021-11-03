import "./App.css";
import Header from './components/header'
import { BrowserRouter, Route } from "react-router-dom";
import Home from "./components/Home";
import Meeting from "./components/meeting";
import UpdateMeeting from './components/updateMeeting'
import AddMeeting from "./components/addMeeting";
function App() {

  return (
    <div style={{position:'relative'}}>
      <BrowserRouter>
        <Header />
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/meeting">
          <Meeting />
        </Route>
        <Route path="/updateMeeting">
          <UpdateMeeting />
        </Route>
        <Route path='/addMeeting'>
          <AddMeeting/>
        </Route>
      </BrowserRouter>
    </div>
  )
}

export default App;
