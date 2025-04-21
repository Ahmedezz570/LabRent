import { useState, useEffect } from "react";
import { Plus, Edit, Trash, Filter, Download } from "lucide-react";
import { Tool } from "@/types";
// import { tools } from "@/data/toolsData";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { AddToolDialog } from "./AddToolDialog";
import { EditToolDialog } from "./EditToolDialog";

export const ToolsManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedTool, setSelectedTool] = useState<Tool | null>(null);
  const { toast } = useToast();

  const [recentTools, setRecentTools] = useState<Tool[]>([]);
  const [loadingRecent, setLoadingRecent] = useState(true);

  useEffect(() => {
    const fetchRecentTools = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/tools/all");
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

  const handleDelete = async (tool: Tool) => {
    try {
      const res = await fetch(`http://localhost:3000/api/tools/delete/${tool._id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete");

      setRecentTools((prev) => prev.filter((t) => t._id !== tool._id));
      toast({
        title: "Tool Deleted",
        description: `Successfully deleted: ${tool.name}`,
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div >
            <CardTitle>Tool Management</CardTitle>
            <CardDescription>Add, update, and remove tools</CardDescription>
          </div>
          <div className="flex flex-wrap gap-2 mt-2 sm:mt-0">
            <Button onClick={() => setShowAddDialog(true)} className="flex items-center">
              <Plus className="mr-2 h-4 w-4" />
              Add New Tool
            </Button>
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
                {/* <TableHead>ID</TableHead> */}
                <TableHead>Name</TableHead>
                <TableHead className="hidden md:table-cell">Category</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="hidden md:table-cell">Location</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentTools.map((tool) => (
                <TableRow key={tool._id}>
                  {/* <TableCell className="font-medium">{tool._id}</TableCell> */}
                  <TableCell>{tool.name}</TableCell>
                  <TableCell className="hidden md:table-cell">{tool.category}</TableCell>
                  <TableCell>
                    <Badge
                      className={
                        tool.status === "Available"
                          ? "bg-green-100 text-green-800"
                          : tool.status === "In Use"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-orange-100 text-orange-800"
                      }
                    >
                      {tool.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">{tool.location}</TableCell>
                  <TableCell className="text-right flex gap-2 justify-end">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        setSelectedTool(tool);
                        setEditDialogOpen(true);
                      }}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(tool)}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>

      <AddToolDialog open={showAddDialog} onOpenChange={setShowAddDialog} />

      <EditToolDialog
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        tool={selectedTool}
        onUpdate={(updatedTool) => {
          setRecentTools((prev) => prev.map((t) => (t._id === updatedTool._id ? updatedTool : t)));
          toast({
            title: "Tool Updated",
            description: `Successfully updated: ${updatedTool.name}`,
          });
        }}
      />
    </Card>
  );
};
