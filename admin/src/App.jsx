import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./Components/Navbar";
import Sidebar from "./Components/Sidebar";
import Add from "./Pages/Add";
import List from "./Pages/List";
import Orders from "./Pages/Orders";
import Messages from "./Pages/Messages";
import { useEffect, useState } from "react";
import Login from "./Components/Login";
import { Toaster } from "react-hot-toast";
import Reviews from "./Pages/Reviews";
export const backendurl = process.env.REACT_APP_BACKEND_URL;

function App() {
  const [token, setToken] = useState(
    localStorage.getItem("token") ? localStorage.getItem("token") : ""
  );

  useEffect(() => {
    localStorage.setItem("token", token);
  }, [token]);

  return (
    <div className="min-h-screen">
      <Toaster />
      {token === "" ? (
        <Login setToken={setToken} />
      ) : (
        <>
          <div className="min-h-[20%]">
            <Navbar setToken={setToken} />
          </div>
          <hr />
          <div className="flex w-full ">
            <Sidebar />
            <div className="p-8 bg-[#FAF8F1] flex-1">
              <Routes>
                <Route path="/add" element={<Add token={token} />} />
                <Route path="/" element={<List token={token} />} />
                <Route path="/orders" element={<Orders token={token} />} />
                <Route path="/messages" element={<Messages token={token} />} />
                <Route path="/comments" element={<Reviews token={token} />} />
              </Routes>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
