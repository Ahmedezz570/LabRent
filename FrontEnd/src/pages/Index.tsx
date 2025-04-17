
import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ToolCard from "@/components/ToolCard";
import { 
  tools, 
  rentals, 
  getToolById, 
  currentUser 
} from "@/data/toolsData";
import { 
  LayoutDashboard, 
  Wrench, 
  Clock, 
  AlertCircle,
  ArrowRight,
  Check,
  ListFilter
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");

  // Count tools by status
  const availableTools = tools.filter(tool => tool.status === "Available").length;
  const inUseTools = tools.filter(tool => tool.status === "In Use").length;
  const maintenanceTools = tools.filter(tool => tool.status === "Maintenance").length;
  const calibrationTools = tools.filter(tool => tool.status === "Calibration").length;

  // Get user's active rentals
  const userRentals = rentals.filter(
    rental => rental.userId === currentUser.id && 
    (rental.status === "Checked Out" || rental.status === "Approved")
  );

  const recentTools = tools.slice(0, 4);

  // Get recently added tools
  const popularCategories = [
    { name: "Measurement", count: tools.filter(t => t.category === "Measurement").length },
    { name: "Pneumatic", count: tools.filter(t => t.category === "Pneumatic").length },
    { name: "Electric", count: tools.filter(t => t.category === "Electric").length },
    { name: "Diagnostic", count: tools.filter(t => t.category === "Diagnostic").length }
  ].sort((a, b) => b.count - a.count);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Lab Dashboard</h1>
          <p className="text-gray-500">Welcome back, {currentUser.name}</p>
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
          <TabsTrigger value="myRentals" className="flex items-center gap-1.5">
            <Wrench className="h-4 w-4" />
            My Rentals
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
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Calibration</CardTitle>
                <AlertCircle className="h-4 w-4 text-purple-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{calibrationTools}</div>
                <p className="text-xs text-muted-foreground">
                  Being calibrated
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>Recent Tools</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {recentTools.map(tool => (
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

        <TabsContent value="myRentals">
          {userRentals.length > 0 ? (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold mb-4">Your Current Rentals</h2>
              {userRentals.map(rental => {
                const tool = getToolById(rental.toolId);
                return (
                  <Card key={rental.id}>
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row gap-4 items-start">
                        <div className="h-24 w-24 bg-gray-200 flex-shrink-0">
                          <img
                            src={tool?.imageUrl}
                            alt={tool?.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="flex-grow">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-semibold text-lg">{tool?.name}</h3>
                              <p className="text-sm text-gray-500">{tool?.category}</p>
                            </div>
                            <Badge className="bg-blue-500 text-white">
                              {rental.status}
                            </Badge>
                          </div>
                          <div className="mt-2 text-sm">
                            <p><span className="text-gray-500">Checkout Date:</span> {rental.checkoutDate}</p>
                            <p><span className="text-gray-500">Expected Return:</span> {rental.expectedReturnDate}</p>
                            <p className="mt-2 text-gray-700">{rental.purpose}</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          ) : (
            <Card>
              <CardContent className="p-6 text-center">
                <Wrench className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                <h3 className="text-xl font-semibold mb-2">No Active Rentals</h3>
                <p className="text-gray-500 mb-4">
                  You don't have any tools checked out at the moment.
                </p>
                <Link
                  to="/catalog"
                  className="inline-flex items-center text-primary hover:underline"
                >
                  Browse Available Tools <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
