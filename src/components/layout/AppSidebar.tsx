
import { Home, Settings, Package, Truck, CreditCard } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const navigationItems = [
  {
    title: "Home",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Settings", 
    url: "/settings",
    icon: Settings,
  },
  {
    title: "Orders",
    url: "/orders", // You can update this to the correct orders page path
    icon: Package,
  },
  {
    title: "Shipping",
    url: "/address/add", // Using the shipping address page
    icon: Truck,
  },
  {
    title: "Payment",
    url: "/payment/add", // Using the payment method page  
    icon: CreditCard,
  },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;

  const isCollapsed = state === "collapsed";

  return (
    <Sidebar className="border-r border-border">
      <SidebarContent className="bg-background">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => {
                const isActive = currentPath === item.url;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <NavLink
                        to={item.url}
                        className={({ isActive }) =>
                          `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                            isActive
                              ? "bg-primary text-primary-foreground font-medium"
                              : "text-black hover:text-black hover:bg-sidebar-accent"
                          }`
                        }
                      >
                        <item.icon className="h-5 w-5 flex-shrink-0 text-black" />
                        <span className="block text-black">
                          {item.title}
                        </span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
