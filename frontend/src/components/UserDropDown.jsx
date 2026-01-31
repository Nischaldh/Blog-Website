import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/hooks/useAuth";
import {
  BadgeCheckIcon,
  UploadCloudIcon,
  LogOutIcon,
  Settings,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const UserDropDown = ({ image, user }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          <img
            src={image}
            alt="User Profile"
            className="w-full h-full rounded-full object-cover"
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        {/* User Info */}
        <div className="px-2 py-2 border-b">
          <p className="font-semibold text-sm">{user?.username || "User"}</p>
          <p className="text-xs text-gray-500 truncate">{user?.email || ""}</p>
        </div>

        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link to="/myprofile" className="flex items-center gap-2 cursor-pointer">
              <BadgeCheckIcon size={16} />
              Profile
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to="/blog/upload" className="flex items-center gap-2 cursor-pointer">
              <UploadCloudIcon size={16} />
              Upload Blog
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to="/settings" className="flex items-center gap-2 cursor-pointer">
              <Settings size={16} />
              Settings
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <Button
            variant="ghost"
            className="w-full justify-start gap-2 text-red-600 hover:text-red-700 hover:bg-red-50"
            onClick={handleLogout}
          >
            <LogOutIcon size={16} />
            Log Out
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropDown;