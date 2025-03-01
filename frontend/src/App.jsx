import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ContactUs from "./pages/ContactUs";
import Chocolates from "./pages/Chocolates";
import Aboutus from "./pages/Aboutus";
import Login from "./pages/Login";
import Header from "./Components/header/Header";
import Footer from "./Components/footer/Footer";
import SpecificChocolate from "./pages/SpecificChocolate";
import Cart from "./pages/Cart";
import PlaceOrder from "./Components/PlaceOrder";
import Orders from "./pages/Orders";
import { Toaster } from "react-hot-toast";
import Verify from "./Components/Verify";
import Demo from "./Components/Demo";
import MyAccount from "./pages/MyAccount";

function App() {
  return (
    <div className="">
      <Toaster />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chocolates" element={<Chocolates />} />
        <Route path="/chocolates/:id" element={<SpecificChocolate />} />
        <Route path="/aboutus" element={<Aboutus />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/place-order" element={<PlaceOrder />} />
        <Route path="/my-orders" element={<Orders />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="/demo" element={<Demo />} />
        <Route path="/my-account" element={<MyAccount />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
