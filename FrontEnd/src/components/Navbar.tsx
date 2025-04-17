
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  Wrench, 
  User, 
  ShieldCheck, 
  Search,
  Menu,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { currentUser } from "@/data/toolsData";

const Navbar = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, we would implement search functionality here
    console.log("Search for:", searchQuery);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navItems = [
    { path: "/", label: "Dashboard", icon: LayoutDashboard },
    { path: "/catalog", label: "Tool Catalog", icon: Wrench },
    { path: "/profile", label: "My Profile", icon: User },
    { path: "/admin", label: "Admin Panel", icon: ShieldCheck },
  ];

  return (
    <nav className="border-b bg-white py-3 sticky top-0 z-10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="text-primary font-bold text-xl mr-8">
              AirLab Manager
            </Link>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-6">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-1.5 py-2 ${
                    location.pathname === item.path
                      ? "text-primary font-medium"
                      : "text-gray-600 hover:text-primary"
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <form onSubmit={handleSearch} className="relative w-64">
              <Input
                type="search"
                placeholder="Search tools..."
                className="w-full pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
            </form>
            <div className="flex items-center">
              <div className="text-sm mr-2">
                <div className="font-medium">{currentUser.name}</div>
                <div className="text-xs text-gray-500">{currentUser.department}</div>
              </div>
              <div className="bg-secondary text-white rounded-full w-8 h-8 flex items-center justify-center">
                {currentUser.name.charAt(0)}
              </div>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-gray-600 focus:outline-none"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-2">
            <form onSubmit={handleSearch} className="relative mb-4">
              <Input
                type="search"
                placeholder="Search tools..."
                className="w-full pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
            </form>
            <div className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-2 py-2 px-2 rounded ${
                    location.pathname === item.path
                      ? "bg-primary/10 text-primary font-medium"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>
            <div className="flex items-center mt-4 pt-4 border-t">
              <div className="bg-secondary text-white rounded-full w-8 h-8 flex items-center justify-center mr-2">
                {currentUser.name.charAt(0)}
              </div>
              <div>
                <div className="font-medium">{currentUser.name}</div>
                <div className="text-xs text-gray-500">{currentUser.department}</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
