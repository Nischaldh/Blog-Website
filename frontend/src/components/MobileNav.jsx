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
  Tag,
  FileText,
  User,
  LogOut,
} from "lucide-react";
import { useState } from "react";

const MobileNav = () => {
  const [logged, setLogged] = useState(false);

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
              <Button
                variant="ghost"
                className="w-full justify-start gap-3"
              >
                <Home size={18} />
                Home
              </Button>

              <Button
                variant="ghost"
                className="w-full justify-start gap-3"
              >
                <Tag size={18} />
                Tags
              </Button>

              <Button
                variant="ghost"
                className="w-full justify-start gap-3"
              >
                <FileText size={18} />
                Post
              </Button>
            </nav>
          </SheetClose>

          {/* FOOTER */}
          <div className="flex flex-col gap-2 pt-2">
            {logged ? (
              <>
                <SheetClose asChild>
                  <Button
                    
                    className="w-full justify-start gap-3 text-black bg-white border"
                  >
                    <User size={18} />
                    Profile
                  </Button>
                </SheetClose>

                <SheetClose asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start gap-3 text-red-500 hover:bg-red-50"
                  >
                    <LogOut size={18} />
                    Logout
                  </Button>
                </SheetClose>
              </>
            ) : (
              <>
                <SheetClose asChild>
                  <Button className="w-full bg-blue-500 hover:bg-blue-600">
                    Log In
                  </Button>
                </SheetClose>

                <SheetClose asChild>
                  <Button variant="outline" className="w-full">
                    Sign Up
                  </Button>
                </SheetClose>
              </>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
