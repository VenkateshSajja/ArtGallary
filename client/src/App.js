
import Home from "./screens/Home";
import MyOrder from "./screens/MyOrder.js";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./screens/Login";
import "../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
import "../node_modules/bootstrap/dist/js/bootstrap.min.js";
import Signup from "./screens/Signup.js";
import { CartProvider } from "./components/ContextReducer.js";
import Invoice from "./screens/invoice.js";


function App() {
  return (
    <CartProvider>
      <Router>
        <div>
          
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/myOrder" element={<MyOrder />} />
            <Route path="/invoice" element={<Invoice />} />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
