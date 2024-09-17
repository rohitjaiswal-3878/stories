import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Routes>
          <Route path="/" element={<Homepage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
