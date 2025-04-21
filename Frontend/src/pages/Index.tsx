import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ToolCard from "@/components/ToolCard";
import {
  tools,
  rentals,
  getToolById,
} from "@/data/toolsData";
import {
  LayoutDashboard,
  Wrench,
  Clock,
  AlertCircle,
  ArrowRight,
  Check,
  ListFilter,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const { currentUser } = useAuth();

  const [recentTools, setRecentTools] = useState([]);
  const [loadingRecent, setLoadingRecent] = useState(true);


  useEffect(() => {
    const fetchRecentTools = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/tools/all"); // غيّر الرابط حسب API عندك
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

  // Count tools by status
  const availableTools = recentTools.filter(tool => tool.status === "Available").length;
  const inUseTools = recentTools.filter(tool => tool.status === "In Use").length;
  const maintenanceTools = recentTools.filter(tool => tool.status === "Maintenance").length;
  // const calibrationTools = recentTools.filter(tool => tool.status === "Calibration").length;

  const popularCategories = [
    { name: "Control", count: recentTools.filter(t => t.category === "Control").length },
    { name: "PCB", count: recentTools.filter(t => t.category === "PCB").length },
    { name: "Structure", count: recentTools.filter(t => t.category === "Structure").length },
    // { name: "Diagnostic", count: tools.filter(t => t.category === "Diagnostic").length }
  ].sort((a, b) => b.count - a.count);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Lab Dashboard</h1>
          <p className="text-gray-500">
            {currentUser ? `Welcome back, ${currentUser.name}` : null}
          </p>
        </div>
        <Link
          to="/catalog"
          className="flex items-center bg-primary text-white px-4 py-2 rounded-md mt-4 md:mt-0"
        >
          Browse All Tools
          <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </div>

      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="overview" className="flex items-center gap-1.5">
            <LayoutDashboard className="h-4 w-4" />
            Overview
          </TabsTrigger>
          
        </TabsList>

        <TabsContent value="overview">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Available Tools</CardTitle>
                <Check className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{availableTools}</div>
                <p className="text-xs text-muted-foreground">
                  Ready for use
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">In Use</CardTitle>
                <Clock className="h-4 w-4 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{inUseTools}</div>
                <p className="text-xs text-muted-foreground">
                  Currently checked out
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Maintenance</CardTitle>
                <Wrench className="h-4 w-4 text-orange-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{maintenanceTools}</div>
                <p className="text-xs text-muted-foreground">
                  Under maintenance
                </p>
              </CardContent>
            </Card>
            {/* <Card> */}
              {/* <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Calibration</CardTitle>
                <AlertCircle className="h-4 w-4 text-purple-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{calibrationTools}</div>
                <p className="text-xs text-muted-foreground">
                  Being calibrated
                </p>
              </CardContent> */}
            {/* </Card> */}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
           
            
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>Recent Tools</CardTitle>
                </CardHeader>
                <CardContent>
                  {loadingRecent ? (
                    <p>Loading recent tools...</p>
                  ) : (
                    <>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {recentTools.slice(0, 4).map(tool => (
                          <ToolCard key={tool.id} tool={tool} />
                        ))}
                      </div>
                      <div className="mt-4 text-center">
                        <Link
                          to="/catalog"
                          className="text-primary hover:underline inline-flex items-center"
                        >
                          View all tools <ArrowRight className="ml-1 h-4 w-4" />
                        </Link>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            </div>

            <div>
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>Popular Categories</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {popularCategories.map(category => (
                      <div key={category.name} className="flex items-center justify-between">
                        <div className="flex items-center">
                          <ListFilter className="h-4 w-4 text-muted-foreground mr-2" />
                          <span>{category.name}</span>
                        </div>
                        <Badge variant="outline">{category.count} tools</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
