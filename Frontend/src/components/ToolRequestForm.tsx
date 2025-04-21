
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

interface ToolRequestFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ToolRequestForm = ({ open, onOpenChange }: ToolRequestFormProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    toolName: "",
    reason: "",
    duration: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Store the request in localStorage
    const requests = JSON.parse(localStorage.getItem("toolRequests") || "[]");
    const newRequest = {
      id: `req-${Date.now()}`,
      ...formData,
      status: "Pending",
      requestDate: new Date().toISOString(),
    };
    
    localStorage.setItem("toolRequests", JSON.stringify([...requests, newRequest]));
    
    toast({
      title: "Request Submitted",
      description: "Your tool request has been submitted successfully.",
    });
    
    setFormData({ toolName: "", reason: "", duration: "" });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Request New Tool</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="toolName">Tool Name</Label>
            <Input
              id="toolName"
              value={formData.toolName}
              onChange={(e) => setFormData({ ...formData, toolName: e.target.value })}
              placeholder="Enter tool name"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="duration">Rental Duration (days)</Label>
            <Input
              id="duration"
              type="number"
              value={formData.duration}
              onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
              placeholder="Enter rental duration"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="reason">Reason for Request</Label>
            <Textarea
              id="reason"
              value={formData.reason}
              onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
              placeholder="Explain why you need this tool"
              required
            />
          </div>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Submit Request</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
