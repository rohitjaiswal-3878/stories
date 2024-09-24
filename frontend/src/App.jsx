import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Login from "./components/Login";
import Register from "./components/Register";
import CreateStory from "./components/CreateStory";

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Routes>
          <Route path="/" element={<Homepage />}>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="create" element={<CreateStory />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
