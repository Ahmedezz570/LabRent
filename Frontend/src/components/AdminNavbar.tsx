import { Link } from "react-router-dom";
import { User, LogOut, Moon, Sun, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "../contexts/ThemeContext";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useSidebar } from "@/components/ui/sidebar";

const AdminNavbar = () => {
  const { currentUser, logout } = useAuth();
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();
  const { toggleSidebar } = useSidebar();

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    navigate("/login");
  };

  return (
    <nav className="border-b bg-background py-2 sticky top-0 z-10">
      <div className="container mx-auto px-2 sm:px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {/* <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleSidebar}
              className="md:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button> */}
            <Link to="/admin/dashboard" className="text-primary font-bold text-lg">
              AirLab Admin
            </Link>
          </div>

          <div className="flex items-center gap-1 sm:gap-3">
            {/* <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              className="h-8 w-8"
            >
              {theme === "light" ? (
                <Moon className="h-4 w-4" />
              ) : (
                <Sun className="h-4 w-4" />
              )}
              <span className="sr-only">Toggle theme</span>
            </Button> */}

            <div className="flex items-center gap-1 sm:gap-2">
              <div className="hidden sm:block text-sm mr-1">
                <div className="font-medium truncate max-w-[100px] md:max-w-[150px]">{currentUser?.name}</div>
                <div className="text-xs text-muted-foreground truncate max-w-[100px] md:max-w-[150px]">
                  {currentUser?.role}
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="h-8 px-2"
              >
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline ml-1">Logout</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;