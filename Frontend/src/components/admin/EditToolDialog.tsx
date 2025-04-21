import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Tool } from "@/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  tool: Tool | null;
  onUpdate: (updatedTool: Tool) => void;
};

export const EditToolDialog = ({ open, onOpenChange, tool, onUpdate }: Props) => {
  const [form, setForm] = useState({
    name: "",
    category: "",
    location: "",
    description: "",
    status: "",
  });

  useEffect(() => {
    if (tool) {
      setForm({
        name: tool.name || "",
        category: tool.category || "",
        location: tool.location || "",
        description: tool.description || "",
        status: tool.status || "",
      });
    }
  }, [tool]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!tool) return;

    try {
      const res = await fetch(`http://localhost:3000/api/tools/update/${tool._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Failed to update tool");
      const data = await res.json();
      onUpdate(data.tool);
      onOpenChange(false);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Tool</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Tool Name</Label>
            <Input
              id="name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Enter tool name"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select
              value={form.category}
              onValueChange={(value) => setForm({ ...form, category: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
              <SelectItem value="Control">Control</SelectItem>
                <SelectItem value="PCB">PCB</SelectItem>
                <SelectItem value="Structure">Structure</SelectItem>
                {/* <SelectItem value="Measurement">Measurement</SelectItem>
                <SelectItem value="Pneumatic">Pneumatic</SelectItem>
                <SelectItem value="Electric">Electric</SelectItem>
                <SelectItem value="Hand Tool">Hand Tool</SelectItem>
                <SelectItem value="Diagnostic">Diagnostic</SelectItem>
                <SelectItem value="Calibration">Calibration</SelectItem>
                <SelectItem value="Safety">Safety</SelectItem> */}
              </SelectContent>
            </Select>
            <Label htmlFor="category">status</Label>
            <Select
              value={form.status}
              onValueChange={(value) => setForm({ ...form, status: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
              <SelectItem value="Available">Available</SelectItem>
                <SelectItem value="In Use">In Use</SelectItem>
                <SelectItem value="Maintenance">Maintenance</SelectItem>
                {/* <SelectItem value="Measurement">Measurement</SelectItem>
                <SelectItem value="Pneumatic">Pneumatic</SelectItem>
                <SelectItem value="Electric">Electric</SelectItem>
                <SelectItem value="Hand Tool">Hand Tool</SelectItem>
                <SelectItem value="Diagnostic">Diagnostic</SelectItem>
                <SelectItem value="Calibration">Calibration</SelectItem>
                <SelectItem value="Safety">Safety</SelectItem> */}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
              placeholder="Enter tool location"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="Enter tool description"
              required
            />
          </div>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" type="button" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Update Tool</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
