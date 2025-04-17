
import { useState } from "react";
import { tools, rentals, users } from "@/data/toolsData";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Check, 
  X, 
  Edit, 
  Trash, 
  Plus, 
  Filter, 
  Download,
  ShieldAlert 
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const Admin = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("tools");
  const { toast } = useToast();

  // Filter tools based on search term
  const filteredTools = tools.filter(tool => 
    tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tool.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Filter rentals based on search term
  const filteredRentals = rentals.filter(rental => 
    rental.toolId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    rental.userId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Filter users based on search term
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAction = (action: string, type: string, id: string) => {
    toast({
      title: `${action} ${type}`,
      description: `Successfully ${action.toLowerCase()}ed ${type.toLowerCase()} with ID ${id}`,
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-gray-500">Manage tools, rentals, and users</p>
        </div>
        <div className="mt-4 md:mt-0">
          <Button className="flex items-center">
            <Plus className="mr-2 h-4 w-4" />
            Add New Tool
          </Button>
        </div>
      </div>

      <div className="mb-6">
        <Input
          type="search"
          placeholder={`Search ${activeTab}...`}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-md"
        />
      </div>

      <Tabs defaultValue="tools" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="tools">Tools</TabsTrigger>
          <TabsTrigger value="rentals">Rentals</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
        </TabsList>

        <TabsContent value="tools">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Tool Inventory</CardTitle>
                  <CardDescription>Manage and update lab tools</CardDescription>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" className="flex items-center">
                    <Filter className="mr-2 h-4 w-4" />
                    Filter
                  </Button>
                  <Button variant="outline" size="sm" className="flex items-center">
                    <Download className="mr-2 h-4 w-4" />
                    Export
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredTools.length > 0 ? (
                      filteredTools.map(tool => (
                        <TableRow key={tool.id}>
                          <TableCell className="font-medium">{tool.id}</TableCell>
                          <TableCell>{tool.name}</TableCell>
                          <TableCell>{tool.category}</TableCell>
                          <TableCell>
                            <Badge 
                              className={
                                tool.status === "Available" 
                                  ? "bg-green-100 text-green-800" 
                                  : tool.status === "In Use"
                                    ? "bg-blue-100 text-blue-800"
                                    : tool.status === "Maintenance"
                                      ? "bg-orange-100 text-orange-800"
                                      : "bg-purple-100 text-purple-800"
                              }
                            >
                              {tool.status}
                            </Badge>
                          </TableCell>
                          <TableCell>{tool.location}</TableCell>
                          <TableCell className="text-right">
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              onClick={() => handleAction("Edit", "Tool", tool.id)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => handleAction("Delete", "Tool", tool.id)}
                            >
                              <Trash className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-4">
                          No tools match your search
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rentals">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Rental Requests</CardTitle>
                  <CardDescription>Manage tool rentals and requests</CardDescription>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" className="flex items-center">
                    <Filter className="mr-2 h-4 w-4" />
                    Filter
                  </Button>
                  <Button variant="outline" size="sm" className="flex items-center">
                    <Download className="mr-2 h-4 w-4" />
                    Export
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Tool ID</TableHead>
                      <TableHead>User ID</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Checkout Date</TableHead>
                      <TableHead>Expected Return</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredRentals.length > 0 ? (
                      filteredRentals.map(rental => (
                        <TableRow key={rental.id}>
                          <TableCell className="font-medium">{rental.id}</TableCell>
                          <TableCell>{rental.toolId}</TableCell>
                          <TableCell>{rental.userId}</TableCell>
                          <TableCell>
                            <Badge 
                              className={
                                rental.status === "Returned" 
                                  ? "bg-green-100 text-green-800" 
                                  : rental.status === "Checked Out"
                                    ? "bg-blue-100 text-blue-800"
                                    : rental.status === "Overdue"
                                      ? "bg-red-100 text-red-800"
                                      : "bg-yellow-100 text-yellow-800"
                              }
                            >
                              {rental.status}
                            </Badge>
                          </TableCell>
                          <TableCell>{rental.checkoutDate}</TableCell>
                          <TableCell>{rental.expectedReturnDate}</TableCell>
                          <TableCell className="text-right">
                            {rental.status === "Pending" && (
                              <>
                                <Button 
                                  variant="ghost" 
                                  size="icon"
                                  className="text-green-500"
                                  onClick={() => handleAction("Approve", "Rental", rental.id)}
                                >
                                  <Check className="h-4 w-4" />
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="icon"
                                  className="text-red-500"
                                  onClick={() => handleAction("Reject", "Rental", rental.id)}
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              </>
                            )}
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => handleAction("Edit", "Rental", rental.id)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-4">
                          No rentals match your search
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>User Management</CardTitle>
                  <CardDescription>Manage system users and permissions</CardDescription>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" className="flex items-center">
                    <Filter className="mr-2 h-4 w-4" />
                    Filter
                  </Button>
                  <Button variant="outline" size="sm" className="flex items-center">
                    <Download className="mr-2 h-4 w-4" />
                    Export
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Active Rentals</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.length > 0 ? (
                      filteredUsers.map(user => (
                        <TableRow key={user.id}>
                          <TableCell className="font-medium">{user.id}</TableCell>
                          <TableCell>{user.name}</TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>{user.department}</TableCell>
                          <TableCell>
                            <Badge 
                              className={
                                user.role === "Admin" 
                                  ? "bg-purple-100 text-purple-800" 
                                  : user.role === "Manager"
                                    ? "bg-blue-100 text-blue-800"
                                    : "bg-gray-100 text-gray-800"
                              }
                            >
                              {user.role}
                            </Badge>
                          </TableCell>
                          <TableCell>{user.activeRentals}</TableCell>
                          <TableCell className="text-right">
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => handleAction("Edit", "User", user.id)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => handleAction("Delete", "User", user.id)}
                            >
                              <Trash className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-4">
                          No users match your search
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Admin;
