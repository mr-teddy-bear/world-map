import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import { Page } from "./components/Page";
import { QueryClientProvider } from "react-query";
import { queryClient } from "./config";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <Router>
          <Page />
        </Router>
      </div>
    </QueryClientProvider>
  );
}

export default App;
