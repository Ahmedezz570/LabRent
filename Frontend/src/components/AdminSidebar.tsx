
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarHeader,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  Wrench,
  Users,
  Settings,
  ClipboardList,
  History,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

export function AdminSidebar() {
  const location = useLocation();

  const items = [
    {
      title: "Dashboard",
      url: "/admin/dashboard",  
      icon: LayoutDashboard,
    },
    // {
    //   title: "Tools",
    //   url: "/admin/tools",
    //   icon: Wrench,
    // },
    // {
    //   title: "Users",
    //   url: "/admin/users",
    //   icon: Users,
    // },
    // {
    //   title: "Rentals",
    //   url: "/admin/rentals",
    //   icon: ClipboardList,
    // },
    {
      title: "History",
      url: "/history",
      icon: History,
    },
    {
      title: "Settings",
      url: "/settings",
      icon: Settings,
    },
  ];

  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <h2 className="text-lg font-semibold">Admin Panel</h2>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Management</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={location.pathname === item.url}
                    tooltip={item.title}
                  >
                    <Link to={item.url}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
