
import { useState } from "react";
import { Link } from "react-router-dom";
import { currentUser, getRentalsByUser, getToolById } from "@/data/toolsData";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  User, 
  Mail, 
  Building, 
  ShieldCheck, 
  Package, 
  History, 
  Check,
  X,
  ArrowUpRight
} from "lucide-react";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("profile");
  
  const userRentals = getRentalsByUser(currentUser.id);
  const activeRentals = userRentals.filter(
    rental => rental.status === "Checked Out" || rental.status === "Approved"
  );
  const rentalHistory = userRentals.filter(
    rental => rental.status === "Returned"
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Profile</h1>

      <Tabs defaultValue="profile" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-8 w-full max-w-md">
          <TabsTrigger value="profile" className="flex-1">User Profile</TabsTrigger>
          <TabsTrigger value="rentals" className="flex-1">My Rentals</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>User Information</CardTitle>
                  <CardDescription>Your personal details</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center mb-6">
                    <div className="bg-secondary text-white rounded-full w-20 h-20 flex items-center justify-center text-2xl mb-4">
                      {currentUser.name.charAt(0)}
                    </div>
                    <h2 className="text-xl font-semibold">{currentUser.name}</h2>
                    <p className="text-gray-500">{currentUser.role}</p>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <Mail className="h-5 w-5 text-gray-400 mr-3 mt-0.5" />
                      <div>
                        <p className="font-medium">Email</p>
                        <p className="text-gray-600">{currentUser.email}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <Building className="h-5 w-5 text-gray-400 mr-3 mt-0.5" />
                      <div>
                        <p className="font-medium">Department</p>
                        <p className="text-gray-600">{currentUser.department}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <ShieldCheck className="h-5 w-5 text-gray-400 mr-3 mt-0.5" />
                      <div>
                        <p className="font-medium">Role</p>
                        <p className="text-gray-600">{currentUser.role}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <Package className="h-5 w-5 text-gray-400 mr-3 mt-0.5" />
                      <div>
                        <p className="font-medium">Active Rentals</p>
                        <p className="text-gray-600">{currentUser.activeRentals} tools</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-2">
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>Account Summary</CardTitle>
                  <CardDescription>Details about your account and activity</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-muted rounded-md p-4">
                      <h3 className="font-semibold mb-2 flex items-center">
                        <Package className="h-4 w-4 mr-2" /> 
                        Rental Statistics
                      </h3>
                      <ul className="space-y-2 text-sm">
                        <li className="flex justify-between">
                          <span>Total Rentals:</span>
                          <span>{userRentals.length}</span>
                        </li>
                        <li className="flex justify-between">
                          <span>Active Rentals:</span>
                          <span>{activeRentals.length}</span>
                        </li>
                        <li className="flex justify-between">
                          <span>Returned Items:</span>
                          <span>{rentalHistory.length}</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="bg-muted rounded-md p-4">
                      <h3 className="font-semibold mb-2 flex items-center">
                        <ShieldCheck className="h-4 w-4 mr-2" /> 
                        Permissions
                      </h3>
                      <ul className="space-y-2 text-sm">
                        <li className="flex justify-between">
                          <span>Request Tools:</span>
                          <Check className="h-4 w-4 text-green-500" />
                        </li>
                        <li className="flex justify-between">
                          <span>Extended Rentals:</span>
                          <Check className="h-4 w-4 text-green-500" />
                        </li>
                        <li className="flex justify-between">
                          <span>Admin Access:</span>
                          {currentUser.role === "Admin" || currentUser.role === "Manager" ? (
                            <Check className="h-4 w-4 text-green-500" />
                          ) : (
                            <X className="h-4 w-4 text-red-500" />
                          )}
                        </li>
                      </ul>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-4 flex items-center">
                      <History className="h-4 w-4 mr-2" /> 
                      Recent Activity
                    </h3>
                    
                    {userRentals.length > 0 ? (
                      <div className="space-y-4">
                        {userRentals.slice(0, 3).map(rental => {
                          const tool = getToolById(rental.toolId);
                          return (
                            <div key={rental.id} className="flex justify-between items-center border-b pb-3">
                              <div>
                                <p className="font-medium">{tool?.name}</p>
                                <p className="text-sm text-gray-500">
                                  {rental.status === "Returned" 
                                    ? `Returned on ${rental.actualReturnDate}` 
                                    : `Checked out on ${rental.checkoutDate}`}
                                </p>
                              </div>
                              <Badge 
                                className={
                                  rental.status === "Returned" 
                                    ? "bg-green-100 text-green-800" 
                                    : "bg-blue-100 text-blue-800"
                                }
                              >
                                {rental.status}
                              </Badge>
                            </div>
                          );
                        })}
                        
                        <div className="pt-2">
                          <Link 
                            to="#"
                            onClick={() => setActiveTab("rentals")}
                            className="text-primary hover:underline text-sm flex items-center"
                          >
                            View all activity <ArrowUpRight className="ml-1 h-3 w-3" />
                          </Link>
                        </div>
                      </div>
                    ) : (
                      <p className="text-gray-500 text-center py-4">
                        No rental activity yet
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="rentals">
          <div className="grid grid-cols-1 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Active Rentals</CardTitle>
                <CardDescription>Tools currently checked out to you</CardDescription>
              </CardHeader>
              <CardContent>
                {activeRentals.length > 0 ? (
                  <div className="space-y-6">
                    {activeRentals.map(rental => {
                      const tool = getToolById(rental.toolId);
                      return (
                        <div key={rental.id} className="flex flex-col md:flex-row gap-4 border-b pb-6 last:border-0">
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
                                <h3 className="font-semibold">
                                  <Link to={`/tools/${tool?.id}`} className="hover:text-primary">
                                    {tool?.name}
                                  </Link>
                                </h3>
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
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <Package className="mx-auto h-12 w-12 text-gray-300 mb-4" />
                    <h3 className="text-xl font-semibold mb-2">No Active Rentals</h3>
                    <p className="text-gray-500 mb-4">
                      You don't have any tools checked out at the moment.
                    </p>
                    <Link
                      to="/catalog"
                      className="text-primary hover:underline"
                    >
                      Browse Tools Catalog
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Rental History</CardTitle>
                <CardDescription>Previously returned tools</CardDescription>
              </CardHeader>
              <CardContent>
                {rentalHistory.length > 0 ? (
                  <div className="space-y-6">
                    {rentalHistory.map(rental => {
                      const tool = getToolById(rental.toolId);
                      return (
                        <div key={rental.id} className="flex flex-col md:flex-row gap-4 border-b pb-6 last:border-0">
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
                                <h3 className="font-semibold">
                                  <Link to={`/tools/${tool?.id}`} className="hover:text-primary">
                                    {tool?.name}
                                  </Link>
                                </h3>
                                <p className="text-sm text-gray-500">{tool?.category}</p>
                              </div>
                              <Badge className="bg-green-500 text-white">
                                {rental.status}
                              </Badge>
                            </div>
                            <div className="mt-2 text-sm">
                              <p><span className="text-gray-500">Checkout Date:</span> {rental.checkoutDate}</p>
                              <p><span className="text-gray-500">Returned Date:</span> {rental.actualReturnDate}</p>
                              <p className="mt-2 text-gray-700">{rental.purpose}</p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <History className="mx-auto h-12 w-12 text-gray-300 mb-4" />
                    <h3 className="text-xl font-semibold mb-2">No Rental History</h3>
                    <p className="text-gray-500">
                      Your rental history will appear here once you've returned items.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Profile;
