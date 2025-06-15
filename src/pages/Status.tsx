import { useState, useEffect } from "react";
import { Header } from "@/components/layout/Header";
import { MobileNav } from "@/components/layout/MobileNav";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertCircle, XCircle, Clock } from "lucide-react";

interface ServiceStatus {
  name: string;
  status: 'operational' | 'degraded' | 'outage';
  uptime: string;
  responseTime: string;
}

const Status = () => {
  const [uptime, setUptime] = useState("0d 0h 0m");
  const [lastChecked, setLastChecked] = useState(new Date());

  // Mock service statuses - in real app, fetch from monitoring service
  const services: ServiceStatus[] = [
    {
      name: "Web Application",
      status: "operational",
      uptime: "99.9%",
      responseTime: "245ms"
    },
    {
      name: "API Services",
      status: "operational",
      uptime: "99.8%",
      responseTime: "156ms"
    },
    {
      name: "Database",
      status: "operational",
      uptime: "99.9%",
      responseTime: "89ms"
    },
    {
      name: "Payment Processing",
      status: "operational",
      uptime: "99.7%",
      responseTime: "312ms"
    },
    {
      name: "File Storage",
      status: "operational",
      uptime: "99.8%",
      responseTime: "198ms"
    }
  ];

  const overallStatus = services.every(s => s.status === 'operational') 
    ? 'operational' 
    : services.some(s => s.status === 'outage') 
    ? 'outage' 
    : 'degraded';

  useEffect(() => {
    // Calculate uptime (mock data)
    const startTime = new Date('2025-01-01T00:00:00Z');
    const now = new Date();
    const diff = now.getTime() - startTime.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    setUptime(`${days}d ${hours}h ${minutes}m`);
    
    // Update last checked time every minute
    const interval = setInterval(() => {
      setLastChecked(new Date());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'operational':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'degraded':
        return <AlertCircle className="h-5 w-5 text-yellow-600" />;
      case 'outage':
        return <XCircle className="h-5 w-5 text-red-600" />;
      default:
        return <Clock className="h-5 w-5 text-muted-foreground" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'operational':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Operational</Badge>;
      case 'degraded':
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Degraded</Badge>;
      case 'outage':
        return <Badge variant="destructive">Outage</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto max-w-4xl px-4 pt-8 pb-20 md:pb-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">FanVault System Status</h1>
          <p className="text-muted-foreground">
            Current operational status of FanVault services
          </p>
        </div>

        {/* Overall Status */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center space-x-3">
                {getStatusIcon(overallStatus)}
                <span>Overall System Status</span>
              </CardTitle>
              {getStatusBadge(overallStatus)}
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <p className="text-sm font-medium text-muted-foreground">System Uptime</p>
                <p className="text-2xl font-bold">{uptime}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Users</p>
                <p className="text-2xl font-bold">2,847</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Last Checked</p>
                <p className="text-2xl font-bold">{lastChecked.toLocaleTimeString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Service Status */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Service Status</h2>
          
          {services.map((service) => (
            <Card key={service.name}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {getStatusIcon(service.status)}
                    <div>
                      <h3 className="font-semibold">{service.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        Uptime: {service.uptime} • Response Time: {service.responseTime}
                      </p>
                    </div>
                  </div>
                  {getStatusBadge(service.status)}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Incidents */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Recent Incidents</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Recent Incidents</h3>
              <p className="text-muted-foreground">
                All systems have been running smoothly. No incidents reported in the last 30 days.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* API Status for Monitoring */}
        <div className="mt-8 p-4 bg-muted rounded-lg">
          <h3 className="font-medium mb-2">API Status (JSON)</h3>
          <pre className="text-sm bg-background p-3 rounded border overflow-x-auto">
{JSON.stringify({
  status: "ok",
  uptime: uptime,
  timestamp: new Date().toISOString(),
  services: services.reduce((acc, service) => {
    acc[service.name.toLowerCase().replace(/\s+/g, '_')] = {
      status: service.status,
      uptime: service.uptime,
      response_time: service.responseTime
    };
    return acc;
  }, {} as any)
}, null, 2)}
          </pre>
        </div>
      </main>

      <MobileNav />
    </div>
  );
};

export default Status;