import { useState, useEffect } from "react";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Search, 
  Filter, 
  Eye, 
  Flag, 
  CheckCircle, 
  XCircle, 
  Clock,
  Shield,
  MessageSquare,
  Calendar
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";

interface ItemFlag {
  id: string;
  item_id: string;
  item_title: string;
  item_image: string;
  creator_name: string;
  flagged_by_name: string;
  reason: string;
  details?: string;
  status: 'open' | 'resolved' | 'dismissed';
  resolved_by?: string;
  resolved_at?: string;
  resolution_notes?: string;
  created_at: string;
}

const AdminModeration = () => {
  const { toast } = useToast();
  const [flags, setFlags] = useState<ItemFlag[]>([]);
  const [selectedFlag, setSelectedFlag] = useState<ItemFlag | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [reasonFilter, setReasonFilter] = useState("all");
  const [resolutionNotes, setResolutionNotes] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Mock data - in real app, fetch from Supabase
  useEffect(() => {
    const mockFlags: ItemFlag[] = [
      {
        id: "flag_1",
        item_id: "item_1",
        item_title: "Vintage Band T-Shirt",
        item_image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=300&fit=crop",
        creator_name: "Sarah Smith",
        flagged_by_name: "John Doe",
        reason: "Copyright Violation",
        details: "This item appears to use copyrighted band logo without permission",
        status: "open",
        created_at: "2025-06-15T10:30:00Z"
      },
      {
        id: "flag_2",
        item_id: "item_2",
        item_title: "Signed Poster",
        item_image: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=300&h=300&fit=crop",
        creator_name: "Mike Johnson",
        flagged_by_name: "Jane Smith",
        reason: "Misleading Description",
        details: "Description claims item is signed but signature looks suspicious",
        status: "open",
        created_at: "2025-06-15T09:15:00Z"
      },
      {
        id: "flag_3",
        item_id: "item_3",
        item_title: "Concert Ticket Stub",
        item_image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop",
        creator_name: "Alex Chen",
        flagged_by_name: "Bob Wilson",
        reason: "Spam/Duplicate",
        details: "Same item posted multiple times by different accounts",
        status: "resolved",
        resolved_by: "Admin User",
        resolved_at: "2025-06-15T11:00:00Z",
        resolution_notes: "Duplicate listings removed, original kept active",
        created_at: "2025-06-14T16:20:00Z"
      }
    ];
    setFlags(mockFlags);
  }, []);

  const filteredFlags = flags.filter(flag => {
    const matchesSearch = flag.item_title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         flag.creator_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         flag.reason.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || flag.status === statusFilter;
    const matchesReason = reasonFilter === "all" || flag.reason === reasonFilter;
    
    return matchesSearch && matchesStatus && matchesReason;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'open':
        return <Badge variant="destructive"><Clock className="w-3 h-3 mr-1" />Open</Badge>;
      case 'resolved':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100"><CheckCircle className="w-3 h-3 mr-1" />Resolved</Badge>;
      case 'dismissed':
        return <Badge variant="outline"><XCircle className="w-3 h-3 mr-1" />Dismissed</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const handleResolveFlag = async (flagId: string, action: 'resolved' | 'dismissed') => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setFlags(prev => prev.map(flag => 
      flag.id === flagId 
        ? { 
            ...flag, 
            status: action,
            resolved_by: "Current Admin",
            resolved_at: new Date().toISOString(),
            resolution_notes: resolutionNotes
          }
        : flag
    ));
    
    setSelectedFlag(null);
    setResolutionNotes("");
    setIsLoading(false);
    
    toast({
      title: `Flag ${action}`,
      description: `The flag has been marked as ${action}.`,
    });
  };

  const handleUnlistItem = async (itemId: string) => {
    setIsLoading(true);
    
    // Simulate API call to unlist item
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsLoading(false);
    toast({
      title: "Item unlisted",
      description: "The item has been removed from active auctions.",
    });
  };

  const reasons = Array.from(new Set(flags.map(flag => flag.reason)));

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 pt-6 pb-8">
        {/* Admin Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <Shield className="h-5 w-5 text-red-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Admin Moderation</h1>
              <p className="text-muted-foreground">Review flagged content and moderate platform activity</p>
            </div>
          </div>
        </div>

        <Tabs defaultValue="flags" className="space-y-6">
          <TabsList>
            <TabsTrigger value="flags">Flagged Items</TabsTrigger>
            <TabsTrigger value="audit">Audit Log</TabsTrigger>
          </TabsList>

          <TabsContent value="flags" className="space-y-6">
            {/* Filters */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Filter className="h-5 w-5" />
                  <span>Filters</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search items, creators..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="open">Open</SelectItem>
                      <SelectItem value="resolved">Resolved</SelectItem>
                      <SelectItem value="dismissed">Dismissed</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={reasonFilter} onValueChange={setReasonFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Reason" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Reasons</SelectItem>
                      {reasons.map(reason => (
                        <SelectItem key={reason} value={reason}>{reason}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <div className="text-sm text-muted-foreground flex items-center">
                    <Flag className="w-4 h-4 mr-2" />
                    {filteredFlags.length} flag(s)
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Flags Table */}
            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Item</TableHead>
                        <TableHead>Creator</TableHead>
                        <TableHead>Reason</TableHead>
                        <TableHead>Flagged By</TableHead>
                        <TableHead>Time</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredFlags.map((flag) => (
                        <TableRow key={flag.id} className="hover:bg-muted/50">
                          <TableCell>
                            <div className="flex items-center space-x-3">
                              <img 
                                src={flag.item_image} 
                                alt={flag.item_title}
                                className="w-12 h-12 object-cover rounded-lg"
                              />
                              <div>
                                <p className="font-medium">{flag.item_title}</p>
                                <p className="text-sm text-muted-foreground">ID: {flag.item_id}</p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>{flag.creator_name}</TableCell>
                          <TableCell>
                            <div>
                              <p className="font-medium">{flag.reason}</p>
                              {flag.details && (
                                <p className="text-sm text-muted-foreground line-clamp-2">{flag.details}</p>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>{flag.flagged_by_name}</TableCell>
                          <TableCell>
                            <div className="text-sm">
                              <p>{format(new Date(flag.created_at), 'MMM d, yyyy')}</p>
                              <p className="text-muted-foreground">{format(new Date(flag.created_at), 'h:mm a')}</p>
                            </div>
                          </TableCell>
                          <TableCell>{getStatusBadge(flag.status)}</TableCell>
                          <TableCell>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setSelectedFlag(flag)}
                            >
                              <Eye className="w-4 h-4 mr-2" />
                              Review
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="audit">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5" />
                  <span>Admin Audit Log</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No Recent Activity</h3>
                  <p className="text-muted-foreground">
                    Admin actions and moderation activities will appear here.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Flag Review Modal */}
        <Dialog open={selectedFlag !== null} onOpenChange={(open) => !open && setSelectedFlag(null)}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Review Flag: {selectedFlag?.reason}</DialogTitle>
            </DialogHeader>
            
            {selectedFlag && (
              <div className="space-y-6">
                {/* Item Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <img 
                      src={selectedFlag.item_image} 
                      alt={selectedFlag.item_title}
                      className="w-full aspect-square object-cover rounded-lg"
                    />
                  </div>
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-lg">{selectedFlag.item_title}</h3>
                      <p className="text-muted-foreground">by {selectedFlag.creator_name}</p>
                    </div>
                    
                    <div className="space-y-2">
                      <p><strong>Item ID:</strong> {selectedFlag.item_id}</p>
                      <p><strong>Flagged by:</strong> {selectedFlag.flagged_by_name}</p>
                      <p><strong>Flag reason:</strong> {selectedFlag.reason}</p>
                      <p><strong>Flagged on:</strong> {format(new Date(selectedFlag.created_at), 'PPpp')}</p>
                      <p><strong>Status:</strong> {getStatusBadge(selectedFlag.status)}</p>
                    </div>

                    {selectedFlag.details && (
                      <div>
                        <p className="font-medium mb-2">Details:</p>
                        <p className="text-sm bg-muted p-3 rounded-lg">{selectedFlag.details}</p>
                      </div>
                    )}

                    {selectedFlag.status !== 'open' && selectedFlag.resolution_notes && (
                      <div>
                        <p className="font-medium mb-2">Resolution Notes:</p>
                        <p className="text-sm bg-muted p-3 rounded-lg">{selectedFlag.resolution_notes}</p>
                        <p className="text-xs text-muted-foreground mt-2">
                          Resolved by {selectedFlag.resolved_by} on {selectedFlag.resolved_at && format(new Date(selectedFlag.resolved_at), 'PPpp')}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Actions */}
                {selectedFlag.status === 'open' && (
                  <div className="space-y-4 border-t pt-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Resolution Notes</label>
                      <Textarea
                        value={resolutionNotes}
                        onChange={(e) => setResolutionNotes(e.target.value)}
                        placeholder="Add notes about the resolution..."
                        className="min-h-[100px]"
                      />
                    </div>
                    
                    <div className="flex flex-wrap gap-3">
                      <Button
                        onClick={() => handleUnlistItem(selectedFlag.item_id)}
                        variant="destructive"
                        disabled={isLoading}
                      >
                        <XCircle className="w-4 h-4 mr-2" />
                        Unlist Item
                      </Button>
                      
                      <Button
                        onClick={() => handleResolveFlag(selectedFlag.id, 'resolved')}
                        className="bg-green-600 hover:bg-green-700"
                        disabled={isLoading}
                      >
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Mark Resolved
                      </Button>
                      
                      <Button
                        onClick={() => handleResolveFlag(selectedFlag.id, 'dismissed')}
                        variant="outline"
                        disabled={isLoading}
                      >
                        <XCircle className="w-4 h-4 mr-2" />
                        Dismiss Flag
                      </Button>
                      
                      <Button variant="outline">
                        <MessageSquare className="w-4 h-4 mr-2" />
                        Contact Creator
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
};

export default AdminModeration;