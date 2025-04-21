import React, { useState , useEffect } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Filter, Download, Edit, Trash } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
// import { users } from "@/data/toolsData";

interface UsersManagementProps {
  searchTerm: string;
}

export const UsersManagement = ({ searchTerm }: UsersManagementProps) => {
  const { toast } = useToast();
  const [users, setUsers] = useState([]); 
  const [loadingRecent, setLoadingRecent] = useState(true);
  const filteredUsers = users.filter(user =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAction = (action: string, id: string) => {
    toast({
      title: `${action} User`,
      description: `Successfully ${action.toLowerCase()}ed user with ID ${id}`,
    });
  };
  useEffect(() => {
    const usersInDB = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/users/allusers");
        const data = await res.json();
        setUsers(data);
      } catch (err) {
        console.error("Failed to fetch recent tools:", err);
      } finally {
        setLoadingRecent(false);
      }
    };

    usersInDB();
  }, []);
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <CardTitle>User Management</CardTitle>
            <CardDescription>Manage system users and permissions</CardDescription>
          </div>
          <div className="flex flex-wrap gap-2 mt-2 sm:mt-0">
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
        <div className="rounded-md border overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                {/* <TableHead className="hidden sm:table-cell">ID</TableHead> */}
                <TableHead>Name</TableHead>
                <TableHead className="hidden md:table-cell">Email</TableHead>
                {/* <TableHead className="hidden lg:table-cell">Department</TableHead> */}
                <TableHead>Role</TableHead>
                <TableHead className="hidden md:table-cell">Active Rentals</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map(user => (
                  <TableRow key={user._id}>
                    {/* <TableCell className="font-medium hidden sm:table-cell">{user._id}</TableCell> */}
                    <TableCell>{user.username}</TableCell>
                    <TableCell className="hidden md:table-cell">{user.email}</TableCell>
                    {/* <TableCell className="hidden lg:table-cell">{user.department}</TableCell> */}
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
                    <TableCell className="hidden md:table-cell">{user.activeRentals}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleAction("Edit", user.id)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleAction("Delete", user.id)}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
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
  );
};
