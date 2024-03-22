import "./App.css";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import CoinPage from "./pages/Coin";
import { Route, Routes } from "react-router-dom"
function App() {
  return (
    <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path='/coin/:id' element={<CoinPage />} />
        </Routes>
    </div>
  );
}

export default App;
