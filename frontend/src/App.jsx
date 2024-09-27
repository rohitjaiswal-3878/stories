import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import ViewStory from "./pages/ViewSlide";
import Bookmark from "./pages/Bookmark";

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Routes>
          <Route path="/" element={<Homepage />}>
            <Route path="view/:id/slide/:slideId" element={<ViewStory />} />
            <Route path="bookmark" element={<Bookmark />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
