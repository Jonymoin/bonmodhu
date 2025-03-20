import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Checkout from "./componenets/Checkout";
import Home from "./componenets/Home";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </Router>
  );
}

export default App;
