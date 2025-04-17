
import { useState } from "react";
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
  const [categoryFilter, setCategoryFilter] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("");

  const categories: ToolCategory[] = [
    "Measurement",
    "Pneumatic",
    "Electric",
    "Hand Tool",
    "Diagnostic",
    "Calibration",
    "Safety"
  ];

  const statuses: ToolStatus[] = [
    "Available",
    "In Use",
    "Maintenance",
    "Calibration"
  ];

  const filteredTools = tools.filter((tool) => {
    // Search term filter
    const matchesSearch = tool.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          tool.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Category filter
    const matchesCategory = categoryFilter ? tool.category === categoryFilter : true;
    
    // Status filter
    const matchesStatus = statusFilter ? tool.status === statusFilter : true;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

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
                  <SelectItem value="">All Categories</SelectItem>
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
                  <SelectItem value="">All Statuses</SelectItem>
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
          {filteredTools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
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
