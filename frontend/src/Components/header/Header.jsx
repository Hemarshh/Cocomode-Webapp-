import React, { useContext, useState, useCallback, useMemo } from "react";
import Cocomode from "../../assets/Cocomode Logo.png";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "../../index.css";
import bag from "../../assets/bag.png";
import profile from "../../assets/profile.png";
import menu from "../../assets/menu.png";
import { ShopContext } from "../../context/shopContext";

const Header = React.memo(() => {
  const { token, setToken, cart } = useContext(ShopContext);
  const [menuToggle, setMenuToggle] = useState(false);
  const [profileDropdown, setProfileDropdown] = useState(false);
  const navigate = useNavigate();
  const loggedIn = !!token;

  const totalQuantityInCart = useMemo(
    () => Object.values(cart).reduce((total, item) => total + item.quantity, 0),
    [cart]
  );

  // const handleProfileDropdownToggle = useCallback(() => {
  //   setProfileDropdown((prev) => !prev);
  // }, []);

  const handleMenuItemClick = useCallback(() => {
    setMenuToggle(false);
  }, []);

  const handleLogout = useCallback(() => {
    setToken("");
    localStorage.clear();
    navigate("/login");
  }, [setToken, navigate]);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Chocolates", path: "/chocolates" },
    { name: "About Us", path: "/aboutus" },
    { name: "Contact Us", path: "/contactus" },
  ];

  return (
    <div className="bg-[#FAF8F1] flex items-center justify-between px-3 pr-4 py-5 font-medium max-h-28 relative">
      <Link to="/">
        <img width={175} height="auto" src={Cocomode} alt="logo" />
      </Link>

      {/* Desktop */}
      <ul className="hidden md:flex gap-4">
        {navItems.map(({ name, path }) => (
          <NavLink
            key={name}
            to={path}
            className={({ isActive }) =>
              `flex flex-col items-center group relative hover:opacity-75 ${
                isActive ? "text-[#D99328]" : ""
              }`
            }
          >
            <p>{name}</p>
            <hr className="group-hover:block w-3/4 border-none h-[1px] rounded-3xl bg-[#D99328] hidden" />
          </NavLink>
        ))}
      </ul>

      {/* Mobile Menu */}
      <div className="md:hidden flex items-center gap-4">
        <NavLink className="relative" to="/cart">
          <img width="35px" src={bag} alt="bag" />
          <p className="absolute right-0 bottom-[-5px] w-4 h-4 text-center leading-4 text-black bg-[#D99328] rounded-full text-xs">
            {totalQuantityInCart}
          </p>
        </NavLink>
        <img
          onClick={() => setMenuToggle((prev) => !prev)}
          className="max-w-[25px] cursor-pointer"
          src={menu}
          alt="menu"
        />
      </div>

      {/* Mobile Navigation */}
      <div
        className={`z-20 bg-[#7f4f39] text-white absolute right-2 top-[70px] transition-all duration-300 rounded-l-2xl overflow-hidden ${
          menuToggle ? "max-h-[200px] p-4 overflow-y-auto" : "max-h-0"
        }`}
      >
        <div className="flex flex-col p-2 gap-3">
          {["Home", "Chocolates", "About Us", "Contact Us"].map((item) => (
            <NavLink
              key={item}
              to={
                item === "Home"
                  ? "/"
                  : `/${item.replace(" ", "").toLowerCase()}`
              }
              className="hover:opacity-75"
              onClick={handleMenuItemClick}
            >
              {item}
            </NavLink>
          ))}

          {token ? (
            <p
              onClick={handleLogout}
              className="cursor-pointer hover:opacity-75"
            >
              Logout
            </p>
          ) : (
            <NavLink
              to="/login"
              className="hover:opacity-75"
              onClick={handleMenuItemClick}
            >
              Login
            </NavLink>
          )}
        </div>
      </div>

      {/* Right Section */}
      <div className="hidden md:flex items-center gap-2">
        {loggedIn ? (
          <div className="flex items-center gap-2">
            <NavLink className="relative" to="/cart">
              <img width="35px" src={bag} alt="bag" />
              <p className="absolute right-0 bottom-[-5px] w-4 h-4 text-center leading-4 text-black bg-[#D99328] rounded-full text-xs">
                {totalQuantityInCart}
              </p>
            </NavLink>
            <div
              className="relative"
              onMouseEnter={() => setProfileDropdown(true)}
              onMouseLeave={() => setProfileDropdown(false)}
            >
              <img width="35px" src={profile} alt="profile" />
              {profileDropdown && (
                <div className="absolute right-0 mt-1 bg-[#fad194] p-2 w-36 z-20 text-sm rounded shadow-lg">
                  <p
                    onClick={() => navigate("/my-account")}
                    className="p-1 hover:bg-[#7e4f35] hover:text-white rounded-sm"
                  >
                    My Account
                  </p>
                  <p
                    onClick={() => navigate("/my-orders")}
                    className="p-1 hover:bg-[#7e4f35] hover:text-white rounded-sm"
                  >
                    Orders
                  </p>
                  <p
                    onClick={handleLogout}
                    className="p-1 hover:bg-[#7e4f35] hover:text-white rounded-sm"
                  >
                    Logout
                  </p>
                </div>
              )}
            </div>
          </div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="px-3 py-1 bg-[#7e4f39] text-white rounded-md"
          >
            Login
          </button>
        )}
      </div>
    </div>
  );
});

export default Header;
