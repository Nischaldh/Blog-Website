import { Link, NavLink } from "react-router-dom";
import assest from "../assets/assets";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import UserDropDown from "./UserDropDown";
import MobileNav from "./MobileNav";


const NavBar = () => {
  const [loggedIn, setLoggedIn] = useState(true);
  return (
    <nav className="flex items-center justify-between py-5 font-medium fixed left-0 w-full bg-white px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] z-50 shadow-xl">
      <Link to="/" className="flex items-center space-x-2 border">
        <img src={assest.logo} alt="logo" className="w-12 h-12" />
      </Link>
      {/* NavLinks */}
      <div className="max-sm:hidden">
        <ul className=" flex gap-5 text-sm">
          <NavLink to="/">
            <p>Home</p>
          </NavLink>
          <NavLink to="/">
            <p>Post</p>
          </NavLink>
          <NavLink to="/">
            <p>Post</p>
          </NavLink>
          <NavLink to="/">
            <p>Post</p>
          </NavLink>
        </ul>
      </div>
      {/* Login button */}
      <div className="max-sm:hidden">
        {loggedIn ? (
            <UserDropDown image={assest.default}/>
        ) : (
          <Button
            variant="full"
            className="rounded-xl bg-blue-500 text-white hover:bg-blue-700"
          >
            Login
          </Button>
        )}
      </div>
      {/* mobile nav */}
      <div className="sm:hidden">
      <MobileNav />

      </div>
    </nav>
  );
};

export default NavBar;
