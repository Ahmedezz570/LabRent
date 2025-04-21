
import { useState , useEffect} from "react";
import { tools } from "@/data/toolsData";
import ToolCard from "@/components/ToolCard";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Tool, ToolCategory, ToolStatus } from "@/types";
import { Search, Filter } from "lucide-react";

const Catalog = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all_categories");
  const [statusFilter, setStatusFilter] = useState<string>("all_statuses");
  const [recentTools, setRecentTools] = useState([]);
  const categories: ToolCategory[] = [
    "Control",
    "PCB",
    "Structure",
    // "Hand Tool",
    // "Diagnostic",
    // "Calibration",
    // "Safety"
  ];

  const statuses: ToolStatus[] = [
    "Available",
    "In Use",
    "Maintenance",
    // "Calibration"
  ];

  const filteredTools = recentTools.filter((tool) => {
    // Search term filter
    const matchesSearch = 
    (tool.name?.toLowerCase().includes(searchTerm.toLowerCase()) || false) || 
    (tool.description?.toLowerCase().includes(searchTerm.toLowerCase()) || false);
  
    
                  // console.log(tool.name.toLowerCase().includes(searchTerm.toLowerCase()));
                          // console.log(tool.description.toLowerCase().includes(searchTerm.toLowerCase()));
    // Category filter
    const matchesCategory = categoryFilter === "all_categories" || tool.category === categoryFilter;
    
    // Status filter
    const matchesStatus = statusFilter === "all_statuses" || tool.status === statusFilter;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });
  console.log("Filtered Tools:", filteredTools);

  const [loadingRecent, setLoadingRecent] = useState(true);


  useEffect(() => {
    const fetchRecentTools = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/tools/all"); 
        const data = await res.json();
        setRecentTools(data);
      } catch (err) {
        console.error("Failed to fetch recent tools:", err);
      } finally {
        setLoadingRecent(false);
      }
    };

    fetchRecentTools();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Tool Catalog</h1>
        <p className="text-gray-500">Browse and request tools for your projects</p>
      </div>

      <div className="mb-8">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Search & Filter</CardTitle>
            <CardDescription>Find the tools you need for your project</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search tools..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
              
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all_categories">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all_statuses">All Statuses</SelectItem>
                  {statuses.map((status) => (
                    <SelectItem key={status} value={status}>
                      {status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </div>

      {filteredTools.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
           {filteredTools.map(tool => (
                          <ToolCard key={tool._id} tool={tool} />
                        ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Filter className="mx-auto h-12 w-12 text-gray-300 mb-4" />
          <h3 className="text-xl font-semibold mb-2">No Tools Found</h3>
          <p className="text-gray-500">
            No tools match your current search criteria. Try adjusting your filters.
          </p>
        </div>
      )}
    </div>
  );
};

export default Catalog;
