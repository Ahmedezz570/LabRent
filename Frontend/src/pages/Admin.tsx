  import { useState } from "react";
  import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
  import { Input } from "@/components/ui/input";
  import { ToolsManagement } from "@/components/admin/ToolsManagement";
  import { RentalsManagement } from "@/components/admin/RentalsManagement";
  import { UsersManagement } from "@/components/admin/UsersManagement";

  const Admin = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [activeTab, setActiveTab] = useState("tools");

    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 space-y-4 md:space-y-0">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-1">Admin Dashboard</h1>
            <p className="text-gray-500 text-sm md:text-base">Manage tools, rentals, and users</p>
          </div>
        </div>

        <div className="mb-6">
          <Input
            type="search"
            placeholder={`Search ${activeTab}...`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:w-1/3"
          />
        </div>

        <Tabs defaultValue="tools" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-6 w-full sm:w-auto flex flex-wrap gap-4 md:gap-6">
            <TabsTrigger value="tools" className="flex-1 sm:flex-initial text-center">
              Tools
            </TabsTrigger>
            <TabsTrigger value="rentals" className="flex-1 sm:flex-initial text-center">
              Rentals
            </TabsTrigger>
            <TabsTrigger value="users" className="flex-1 sm:flex-initial text-center">
              Users
            </TabsTrigger>
          </TabsList>

          <TabsContent value="tools">
            <ToolsManagement />
          </TabsContent>

          <TabsContent value="rentals">
            <RentalsManagement searchTerm={searchTerm} />
          </TabsContent>

          <TabsContent value="users">
            <UsersManagement searchTerm={searchTerm} />
          </TabsContent>
        </Tabs>
      </div>
    );
  };

  export default Admin;
