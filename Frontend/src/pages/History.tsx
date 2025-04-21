
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { rentals } from "@/data/toolsData";

const History = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl md:text-3xl font-bold mb-6">Rental History</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Recent Rentals</CardTitle>
          <CardDescription>View your past tool rentals and their status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {rentals.map((rental) => (
              <div
                key={rental.id}
                className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 border rounded-lg"
              >
                <div className="space-y-1 mb-4 md:mb-0">
                  <p className="font-medium">Tool ID: {rental.toolId}</p>
                  <p className="text-sm text-muted-foreground">
                    Checkout: {new Date(rental.checkoutDate).toLocaleDateString()}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Return: {new Date(rental.expectedReturnDate).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  <Badge 
                    variant={rental.status === "Returned" ? "secondary" : "default"}
                    className="self-start md:self-center"
                  >
                    {rental.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default History;
