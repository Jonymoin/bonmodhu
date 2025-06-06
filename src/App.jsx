import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from 'react-hot-toast';

import Checkout from "./componenets/Checkout";
import Home from "./componenets/Home";
import WhatsAppButton from "./componenets/Whatsappbutton";

function App() {
  return (
    <Router>
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
      <WhatsAppButton />
    </Router>
  );
}

export default App;
