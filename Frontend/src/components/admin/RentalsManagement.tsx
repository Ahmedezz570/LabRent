
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Filter, Download, Check, X, Edit } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { rentals } from "@/data/toolsData";

interface RentalsManagementProps {
  searchTerm: string;
}

export const RentalsManagement = ({ searchTerm }: RentalsManagementProps) => {
  const { toast } = useToast();

  // Filter rentals based on search term
  const filteredRentals = rentals.filter(rental =>
    rental.toolId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    rental.userId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAction = (action: string, id: string) => {
    toast({
      title: `${action} Rental`,
      description: `Successfully ${action.toLowerCase()}ed rental with ID ${id}`,
    });
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <CardTitle>Rental Requests</CardTitle>
            <CardDescription>Manage tool rentals and requests</CardDescription>
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
                <TableHead className="hidden sm:table-cell">ID</TableHead>
                <TableHead>Tool ID</TableHead>
                <TableHead>User ID</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="hidden md:table-cell">Checkout Date</TableHead>
                <TableHead className="hidden lg:table-cell">Expected Return</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRentals.length > 0 ? (
                filteredRentals.map(rental => (
                  <TableRow key={rental.id}>
                    <TableCell className="font-medium hidden sm:table-cell">{rental.id}</TableCell>
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
                    <TableCell className="hidden md:table-cell">{rental.checkoutDate}</TableCell>
                    <TableCell className="hidden lg:table-cell">{rental.expectedReturnDate}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        {rental.status === "Pending" && (
                          <>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-green-500"
                              onClick={() => handleAction("Approve", rental.id)}
                            >
                              <Check className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-red-500"
                              onClick={() => handleAction("Reject", rental.id)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </>
                        )}
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleAction("Edit", rental.id)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
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
  );
};
