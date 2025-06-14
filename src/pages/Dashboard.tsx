import { Header } from "@/components/layout/Header";
import { MobileNav } from "@/components/layout/MobileNav";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Package, TrendingUp, Eye, Edit } from "lucide-react";

const Dashboard = () => {
  const stats = {
    totalSales: 2457.89,
    totalItems: 15,
    followers: 1243,
    totalViews: 8976,
    salesGrowth: 12,
    followerGrowth: 23,
    viewsGrowth: 8
  };

  const recentItems = [
    {
      id: "1",
      title: "Vintage Band T-Shirt",
      price: 45,
      sold: 12,
      status: "active",
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=150&h=150&fit=crop"
    },
    {
      id: "2",
      title: "Signed Poster", 
      price: 75,
      sold: 8,
      status: "active",
      image: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=150&h=150&fit=crop"
    },
    {
      id: "3",
      title: "Limited Edition Vinyl",
      price: 120,
      sold: 5,
      status: "active", 
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=150&h=150&fit=crop"
    }
  ];

  const recentOrders = [
    {
      id: "ORD-1234",
      date: "2023-05-15",
      customer: "Alex Johnson",
      amount: 120,
      status: "shipped"
    },
    {
      id: "ORD-1235", 
      date: "2023-05-14",
      customer: "Jamie Smith",
      amount: 45,
      status: "delivered"
    },
    {
      id: "ORD-1236",
      date: "2023-05-12", 
      customer: "Casey Taylor",
      amount: 75,
      status: "processing"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 pt-6 pb-20 md:pb-6">
        {/* Creator Header */}
        <div className="flex items-center space-x-4 mb-8">
          <img 
            src="https://images.unsplash.com/photo-1494790108755-2616b612e04f?w=150&h=150&fit=crop&crop=face" 
            alt="Profile"
            className="w-16 h-16 rounded-full"
          />
          <div>
            <h1 className="text-2xl font-bold">Welcome back, Kayvon Moshiri!</h1>
            <p className="text-muted-foreground">@kayvonmoshiri</p>
            <div className="flex space-x-4 mt-2">
              <Badge>Creator</Badge>
              <Button variant="link" className="h-auto p-0 text-fanvault-pink">Edit Profile</Button>
              <Button variant="link" className="h-auto p-0 text-fanvault-pink">Creator Settings</Button>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 mb-8">
          <Button className="bg-fanvault-gradient">
            <Plus className="h-4 w-4 mr-2" />
            List New Item
          </Button>
          <Button variant="outline">
            <Package className="h-4 w-4 mr-2" />
            Build a Drop
          </Button>
          <Button variant="outline">
            Manage All Drops
          </Button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold">${stats.totalSales.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">Total Sales</p>
              <p className="text-xs text-green-600">+{stats.salesGrowth}% from last month</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold">{stats.totalItems}</div>
              <p className="text-xs text-muted-foreground">Total Items</p>
              <p className="text-xs text-muted-foreground">4 active drops</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold">{stats.followers.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">Followers</p>
              <p className="text-xs text-green-600">+{stats.followerGrowth} this week</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold">{stats.totalViews.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">Total Views</p>
              <p className="text-xs text-green-600">+{stats.viewsGrowth}% from last week</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full md:w-auto grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="items">Items</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="mt-6 space-y-6">
            {/* Recent Items */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Recent Items</CardTitle>
                <Button variant="link" className="text-fanvault-pink">View All</Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentItems.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <img 
                          src={item.image} 
                          alt={item.title}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                        <div>
                          <h4 className="font-medium">{item.title}</h4>
                          <p className="text-sm text-muted-foreground">${item.price} • {item.sold} sold</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className="bg-green-100 text-green-800">{item.status}</Badge>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Orders */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Recent Orders</CardTitle>
                <Button variant="link" className="text-fanvault-pink">View All</Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentOrders.map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-medium">{order.id}</h4>
                        <p className="text-sm text-muted-foreground">{order.date} • {order.customer}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">${order.amount}</p>
                        <Badge 
                          className={
                            order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                            order.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
                            'bg-yellow-100 text-yellow-800'
                          }
                        >
                          {order.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="items" className="mt-6">
            <div className="text-center py-12">
              <h3 className="text-lg font-semibold mb-2">Items Management</h3>
              <p className="text-muted-foreground">Manage your auction items here.</p>
            </div>
          </TabsContent>
          
          <TabsContent value="orders" className="mt-6">
            <div className="text-center py-12">
              <h3 className="text-lg font-semibold mb-2">Orders Management</h3>
              <p className="text-muted-foreground">View and manage your orders here.</p>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <MobileNav currentPath="/dashboard" />
    </div>
  );
};

export default Dashboard;