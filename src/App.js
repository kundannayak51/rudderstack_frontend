import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "./component/Home/HomePage";
import DetailsPage from "./component/Details/DetailsPage";

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/details" element={<DetailsPage />} />
      </Routes>
    </div>
  );
}

export default App;
