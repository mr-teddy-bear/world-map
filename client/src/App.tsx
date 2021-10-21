import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import { Page } from "./components/Page";

function App() {
  return (
    <div className="App">
      <Router>
        <Page />
      </Router>
    </div>
  );
}

export default App;
