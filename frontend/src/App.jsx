import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Login from "./components/Login";
import Register from "./components/Register";
import CreateStory from "./components/CreateStory";
import ViewStory from "./pages/ViewSlide";

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Routes>
          <Route path="/" element={<Homepage />}>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="create" element={<CreateStory />} />
            <Route path="view" element={<ViewStory />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
