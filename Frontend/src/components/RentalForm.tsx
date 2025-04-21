
import { useState } from "react";
import { Tool } from "@/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useToast } from "@/hooks/use-toast";

interface RentalFormProps {
  tool: Tool;
}

const RentalForm = ({ tool }: RentalFormProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date(Date.now() + 86400000 * 7) // Default to 7 days from now
  );
  const [purpose, setPurpose] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, this would send the rental request to the backend
    console.log("Rental request submitted:", {
      toolId: tool.id,
      expectedReturnDate: selectedDate,
      purpose
    });

    toast({
      title: "Rental Request Submitted",
      description: `Your request for the ${tool.name} has been submitted for approval.`,
    });

    // Clear form
    setPurpose("");
  };

  if (tool.status !== "Available") {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Tool Unavailable</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            This tool is currently {tool.status.toLowerCase()} and cannot be requested for rental.
            Please check back later or contact the lab manager for more information.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Request Rental</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="return-date">Expected Return Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="return-date"
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !selectedDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {selectedDate ? (
                    format(selectedDate, "PPP")
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  initialFocus
                  disabled={(date) => date < new Date()}
                  className="p-3 pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label htmlFor="purpose">Purpose for Rental</Label>
            <Textarea
              id="purpose"
              placeholder="Briefly describe how you will use this tool..."
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              required
              className="min-h-24"
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full" disabled={!selectedDate || !purpose}>
            Submit Rental Request
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default RentalForm;
