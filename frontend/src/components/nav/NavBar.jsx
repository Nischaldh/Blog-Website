import { Link, NavLink } from "react-router-dom";
import assest from "../../assets/assets";
import { Button } from "@/components/ui/button";
import UserDropDown from "../UserDropDown";
import MobileNav from "./MobileNav";
import { useAuth } from "@/hooks/useAuth";

const NavBar = () => {
  const { isAuthenticated, user } = useAuth();

  return (
    <nav className="flex items-center justify-between py-5 font-medium fixed left-0 w-full bg-white px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] z-50 shadow-xl">
      <Link to="/" className="flex items-center space-x-2 border">
        <img src={assest.logo} alt="logo" className="w-12 h-12" />
      </Link>

      {/* Desktop Navigation */}
      <div className="max-sm:hidden">
        {isAuthenticated && user ? (
          <UserDropDown image={user.image || assest.default} user={user} />
        ) : (
          <Link to="/login">
            <Button
              variant="full"
              className="rounded-xl bg-blue-500 text-white hover:bg-blue-700"
            >
              Login
            </Button>
          </Link>
        )}
      </div>

      {/* Mobile Navigation */}
      <div className="sm:hidden">
        <MobileNav />
      </div>
    </nav>
  );
};

export default NavBar;