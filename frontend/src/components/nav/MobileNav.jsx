import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  Menu,
  Home,
  FileText,
  User,
  LogOut,
  Settings,
  Info,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

const MobileNav = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon">
          <Menu size={18} />
        </Button>
      </SheetTrigger>

      {/* RIGHT SIDE SHEET */}
      <SheetContent side="right" className="border-none flex flex-col">
        <SheetTitle className="text-2xl font-semibold text-center pt-10">
          Menu
        </SheetTitle>

        {/* CONTENT */}
        <div className="mt-6 flex h-full flex-col justify-between overflow-y-auto">
          {/* NAV LINKS */}
          <SheetClose asChild>
            <nav className="flex flex-col gap-4">
              {/* Home - Always visible */}
              <Link to="/">
                <Button variant="ghost" className="w-full justify-start gap-3">
                  <Home size={18} />
                  <h3 className="text-xl">Home</h3>
                </Button>
              </Link>

              {/* About - Always visible */}
              <Link to="/about">
                <Button variant="ghost" className="w-full justify-start gap-3">
                  <Info size={18} />
                  <h3 className="text-xl">About</h3>
                </Button>
              </Link>

              {/* Authenticated-only links */}
              {isAuthenticated && (
                <>
                  <Link to="/blog/upload">
                    <Button variant="ghost" className="w-full justify-start gap-3">
                      <FileText size={18} />
                      <h3 className="text-xl">Upload Blog</h3>
                    </Button>
                  </Link>

                  <Link to="/settings">
                    <Button variant="ghost" className="w-full justify-start gap-3">
                      <Settings size={18} />
                      <h3 className="text-xl">Settings</h3>
                    </Button>
                  </Link>
                </>
              )}
            </nav>
          </SheetClose>

          {/* FOOTER */}
          <div className="flex flex-col gap-2 pt-2">
            {isAuthenticated ? (
              <div className="p-4">
                {/* User Info */}
                <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                  <p className="font-semibold text-sm">{user?.username || "User"}</p>
                  <p className="text-xs text-gray-500 truncate">{user?.email || ""}</p>
                </div>

                <SheetClose asChild>
                  <Link to="/myprofile">
                    <Button className="w-full justify-start gap-3 text-black bg-white hover:text-gray-200 border mb-3">
                      <User size={18} />
                      Profile
                    </Button>
                  </Link>
                </SheetClose>

                <SheetClose asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start gap-3 text-red-500 hover:bg-red-50"
                    onClick={handleLogout}
                  >
                    <LogOut size={18} />
                    Logout
                  </Button>
                </SheetClose>
              </div>
            ) : (
              <div className="p-4">
                <SheetClose asChild>
                  <Link to="/login">
                    <Button className="w-full bg-blue-500 hover:bg-blue-600 mb-4">
                      Log In
                    </Button>
                  </Link>
                </SheetClose>

                <SheetClose asChild>
                  <Link to="/signup">
                    <Button variant="outline" className="w-full">
                      Sign Up
                    </Button>
                  </Link>
                </SheetClose>
              </div>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;