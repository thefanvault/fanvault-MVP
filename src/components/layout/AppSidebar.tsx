
import { Home, Settings, Package, Truck, CreditCard, Heart, Crown, MessageCircle, Bell, User } from "lucide-react";
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
} from "@/components/ui/sidebar";

export function AppSidebar() {
  const location = useLocation();
  const currentPath = location.pathname;
  const { userRole, profile } = useAuth();

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
          title: "Profile",
          url: `/creator/${profile?.username || 'username'}`,
          icon: User,
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
          title: "Profile",
          url: `/creator/${profile?.username || 'username'}`,
          icon: User,
        },
      ];
    }
  };

  const navigationItems = getNavigationItems();

  // Key navigation buttons for all users
  const keyButtons = [
    { title: "Home", url: "/discover", icon: Home },
    { title: "Messages", url: "/messages", icon: MessageCircle },
    { title: "Alerts", url: "/notifications", icon: Bell },
    { title: "Settings", url: "/settings", icon: Settings },
  ];

  return (
    <Sidebar className="border-r border-border w-[18rem]" collapsible="none">
      <SidebarContent className="bg-background pt-4">
        {/* Key Buttons Section */}
        <SidebarGroup>
          <SidebarGroupContent>
            <div className="grid grid-cols-4 gap-1 p-2">
              {keyButtons.map((button) => {
                const isActive = currentPath === button.url;
                return (
                  <NavLink
                    key={button.title}
                    to={button.url}
                    className={`flex flex-col items-center justify-center p-2 rounded-lg transition-colors min-h-[3.5rem] ${
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground hover:bg-sidebar-accent"
                    }`}
                  >
                    <button.icon className="h-5 w-5 mb-1 flex-shrink-0" />
                    <span className="text-[10px] font-medium leading-tight text-center break-words">{button.title}</span>
                  </NavLink>
                );
              })}
            </div>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Role-based Navigation */}
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
              
              {/* Creator CTA for Fans Only */}
              {userRole === 'fan' && (
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to="/onboarding"
                      className="flex items-center gap-3 px-3 py-4 rounded-lg transition-all bg-fanvault-gradient text-white hover:opacity-90 shadow-md border border-white/20 hover:shadow-lg hover:shadow-fanvault-pink/20 min-h-[4rem]"
                      style={{
                        boxShadow: '0 0 0 1px rgba(255, 255, 255, 0.2), 0 0 8px rgba(236, 72, 153, 0.3)'
                      }}
                    >
                      <Crown className="h-6 w-6 flex-shrink-0 text-white" />
                      <div className="block text-white">
                        <div className="text-sm font-semibold">Start Selling!</div>
                        <div className="text-xs opacity-90">Apply to be a creator</div>
                      </div>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
