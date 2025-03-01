import React from "react";
import { NavLink } from "react-router-dom";
import {
  CirclePlus,
  ListMinus,
  BookCheck,
  MessagesSquare,
  MessageCircle,
} from "lucide-react";

const Sidebar = () => {
  return (
    <div className="w-[18%] min-h-screen border-r-2">
      <div className="flex flex-col gap-4 pt-5 pl-[20px] text-[15px]">
        <NavLink
          to={"/add"}
          className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2"
        >
          <CirclePlus />
          <p className="hidden md:block">Add Chocolates</p>
        </NavLink>
        <NavLink
          to={"/"}
          className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2"
        >
          <ListMinus />
          <p className="hidden md:block">List Items</p>
        </NavLink>
        <NavLink
          to={"/orders"}
          className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2"
        >
          <BookCheck />
          <p className="hidden md:block">Orders</p>
        </NavLink>
        <NavLink
          to={"/messages"}
          className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2"
        >
          <MessagesSquare />
          <p className="hidden md:block">Messages</p>
        </NavLink>
        <NavLink
          to={"/comments"}
          className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2"
        >
          <MessageCircle />
          <p className="hidden md:block">Reviews</p>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
