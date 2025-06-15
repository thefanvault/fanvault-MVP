import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  UserCheck, 
  ArrowLeft, 
  Shield, 
  Eye, 
  AlertTriangle,
  User,
  Calendar,
  MapPin,
  CreditCard
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";

interface UserProfile {
  id: string;
  display_name: string;
  username: string;
  email: string;
  bio?: string;
  avatar_url?: string;
  created_at: string;
  last_login?: string;
}

interface UserData {
  profile: UserProfile;
  activeBids: number;
  wonAuctions: number;
  totalSpent: number;
  accountStatus: 'active' | 'suspended' | 'restricted';
  addresses: Array<{
    id: string;
    full_name: string;
    street_address: string;
    city: string;
    state: string;
    is_default: boolean;
  }>;
  paymentMethods: Array<{
    id: string;
    last_four: string;
    brand: string;
    is_default: boolean;
  }>;
}

const AdminImpersonation = () => {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isImpersonating, setIsImpersonating] = useState(false);

  useEffect(() => {
    if (userId) {
      fetchUserData(userId);
    }
  }, [userId]);

  const fetchUserData = async (id: string) => {
    setIsLoading(true);
    
    // Simulate API call - in real app, fetch from Supabase
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock user data
    const mockUserData: UserData = {
      profile: {
        id: id,
        display_name: "John Smith",
        username: "johnsmith",
        email: "john.smith@email.com",
        bio: "Avid collector of vintage items and music memorabilia",
        avatar_url: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
        created_at: "2024-03-15T10:30:00Z",
        last_login: "2025-06-15T08:45:00Z"
      },
      activeBids: 3,
      wonAuctions: 12,
      totalSpent: 1247.50,
      accountStatus: 'active',
      addresses: [
        {
          id: "addr_1",
          full_name: "John Smith",
          street_address: "123 Main Street, Apt 4B",
          city: "San Francisco",
          state: "CA",
          is_default: true
        }
      ],
      paymentMethods: [
        {
          id: "pm_1",
          last_four: "4242",
          brand: "visa",
          is_default: true
        },
        {
          id: "pm_2",
          last_four: "0005",
          brand: "mastercard",
          is_default: false
        }
      ]
    };
    
    setUserData(mockUserData);
    setIsLoading(false);
  };

  const startImpersonation = () => {
    setIsImpersonating(true);
    
    // Log the impersonation start
    console.log(`Admin started impersonating user ${userId} at ${new Date().toISOString()}`);
    
    toast({
      title: "Impersonation started",
      description: `You are now viewing ${userData?.profile.display_name}'s account`,
    });
  };

  const stopImpersonation = () => {
    setIsImpersonating(false);
    
    // Log the impersonation end
    console.log(`Admin stopped impersonating user ${userId} at ${new Date().toISOString()}`);
    
    toast({
      title: "Impersonation ended",
      description: "You have returned to your admin account",
    });
    
    navigate('/admin/moderation');
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Active</Badge>;
      case 'suspended':
        return <Badge variant="destructive">Suspended</Badge>;
      case 'restricted':
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Restricted</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 pt-16">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Loading user data...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 pt-16">
          <Alert className="max-w-md mx-auto">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              User not found or access denied.
            </AlertDescription>
          </Alert>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Impersonation Banner */}
      {isImpersonating && (
        <div className="bg-red-600 text-white py-3">
          <div className="container mx-auto px-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Shield className="h-5 w-5" />
              <span className="font-medium">
                You are impersonating {userData.profile.display_name} (@{userData.profile.username})
              </span>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={stopImpersonation}
              className="bg-white text-red-600 hover:bg-gray-100"
            >
              Stop Impersonation
            </Button>
          </div>
        </div>
      )}
      
      <main className="container mx-auto px-4 pt-6 pb-8">
        {/* Admin Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <Button variant="outline" onClick={() => navigate('/admin/moderation')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Moderation
            </Button>
            
            {!isImpersonating && (
              <Button onClick={startImpersonation} className="bg-blue-600 hover:bg-blue-700">
                <Eye className="h-4 w-4 mr-2" />
                Start Impersonation
              </Button>
            )}
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <UserCheck className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">User Impersonation</h1>
              <p className="text-muted-foreground">
                {isImpersonating ? "Viewing user account" : "Review user data before impersonation"}
              </p>
            </div>
          </div>
        </div>

        {/* User Profile Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="h-5 w-5" />
                <span>User Profile</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-start space-x-4">
                <div className="w-20 h-20 rounded-full overflow-hidden bg-muted">
                  {userData.profile.avatar_url ? (
                    <img 
                      src={userData.profile.avatar_url} 
                      alt={userData.profile.display_name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                      <User className="h-8 w-8" />
                    </div>
                  )}
                </div>
                
                <div className="flex-1 space-y-3">
                  <div>
                    <h3 className="text-xl font-semibold">{userData.profile.display_name}</h3>
                    <p className="text-muted-foreground">@{userData.profile.username}</p>
                    <p className="text-sm text-muted-foreground">{userData.profile.email}</p>
                  </div>
                  
                  {userData.profile.bio && (
                    <p className="text-sm">{userData.profile.bio}</p>
                  )}
                  
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>Joined {format(new Date(userData.profile.created_at), 'MMM yyyy')}</span>
                    </div>
                    {userData.profile.last_login && (
                      <div className="flex items-center space-x-1">
                        <span>Last login {format(new Date(userData.profile.last_login), 'MMM d, h:mm a')}</span>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="text-right">
                  {getStatusBadge(userData.accountStatus)}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Account Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-muted rounded-lg">
                  <p className="text-2xl font-bold text-primary">{userData.activeBids}</p>
                  <p className="text-sm text-muted-foreground">Active Bids</p>
                </div>
                <div className="text-center p-3 bg-muted rounded-lg">
                  <p className="text-2xl font-bold text-green-600">{userData.wonAuctions}</p>
                  <p className="text-sm text-muted-foreground">Won Auctions</p>
                </div>
              </div>
              <div className="text-center p-3 bg-muted rounded-lg">
                <p className="text-2xl font-bold">${userData.totalSpent.toFixed(2)}</p>
                <p className="text-sm text-muted-foreground">Total Spent</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* User Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Addresses */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MapPin className="h-5 w-5" />
                <span>Shipping Addresses</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {userData.addresses.map((address) => (
                  <div key={address.id} className="p-3 border rounded-lg">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-medium">{address.full_name}</p>
                        <p className="text-sm text-muted-foreground">{address.street_address}</p>
                        <p className="text-sm text-muted-foreground">{address.city}, {address.state}</p>
                      </div>
                      {address.is_default && (
                        <Badge variant="secondary" className="text-xs">Default</Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Payment Methods */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <CreditCard className="h-5 w-5" />
                <span>Payment Methods</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {userData.paymentMethods.map((method) => (
                  <div key={method.id} className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <CreditCard className="h-8 w-8 text-muted-foreground" />
                        <div>
                          <p className="font-medium capitalize">{method.brand} •••• {method.last_four}</p>
                          <p className="text-sm text-muted-foreground">Card ending in {method.last_four}</p>
                        </div>
                      </div>
                      {method.is_default && (
                        <Badge variant="secondary" className="text-xs">Default</Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Read-Only Notice */}
        {isImpersonating && (
          <Alert className="mt-6">
            <Shield className="h-4 w-4" />
            <AlertDescription>
              <strong>Read-Only Mode:</strong> You are viewing this user's account in read-only mode. 
              No changes can be made during impersonation. All actions are logged for audit purposes.
            </AlertDescription>
          </Alert>
        )}
      </main>
    </div>
  );
};

export default AdminImpersonation;