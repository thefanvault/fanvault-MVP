
import { Home, Settings, Package, Truck, CreditCard, Heart } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
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

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  const { userRole } = useAuth();

  const isCollapsed = state === "collapsed";

  // Define navigation based on user role
  const getNavigationItems = () => {
    if (userRole === 'creator') {
      return [
        {
          title: "Dashboard",
          url: "/dashboard",
          icon: Home,
        },
        {
          title: "Orders",
          url: "/orders",
          icon: Package,
        },
        {
          title: "My Bids",
          url: "/bids/active",
          icon: Heart,
        },
        {
          title: "Shipping",
          url: "/address/add",
          icon: Truck,
        },
        {
          title: "Payment",
          url: "/payment/add",
          icon: CreditCard,
        },
        {
          title: "Settings",
          url: "/settings",
          icon: Settings,
        },
      ];
    } else {
      // Fan navigation - no Dashboard or Orders
      return [
        {
          title: "My Bids",
          url: "/bids/active",
          icon: Heart,
        },
        {
          title: "Shipping",
          url: "/address/add",
          icon: Truck,
        },
        {
          title: "Payment",
          url: "/payment/add",
          icon: CreditCard,
        },
        {
          title: "Settings",
          url: "/settings",
          icon: Settings,
        },
      ];
    }
  };

  const navigationItems = getNavigationItems();

  return (
    <Sidebar className="border-r border-border w-[11rem]">
      <SidebarContent className="bg-background pt-16">
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
