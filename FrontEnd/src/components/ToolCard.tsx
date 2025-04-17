
import { Link } from "react-router-dom";
import { Tool } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

interface ToolCardProps {
  tool: Tool;
}

const ToolCard = ({ tool }: ToolCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Available":
        return "bg-green-500";
      case "In Use":
        return "bg-blue-500";
      case "Maintenance":
        return "bg-orange-500";
      case "Calibration":
        return "bg-purple-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <div className="relative h-48 w-full bg-gray-200">
        <img
          src={tool.imageUrl}
          alt={tool.name}
          className="h-full w-full object-cover"
        />
        <div className="absolute top-2 right-2">
          <Badge className={`${getStatusColor(tool.status)} text-white`}>
            {tool.status}
          </Badge>
        </div>
      </div>
      <CardContent className="p-4">
        <h3 className="text-lg font-semibold line-clamp-1">{tool.name}</h3>
        <p className="text-sm text-gray-500 mb-2">{tool.category}</p>
        <p className="text-sm line-clamp-2 text-gray-700 mb-2">{tool.description}</p>
        <p className="text-xs text-gray-500">Location: {tool.location}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between">
        <Link 
          to={`/tools/${tool.id}`}
          className="text-primary text-sm font-medium hover:underline"
        >
          View Details
        </Link>
        <Badge variant="outline" className="text-xs">
          ID: {tool.id}
        </Badge>
      </CardFooter>
    </Card>
  );
};

export default ToolCard;
