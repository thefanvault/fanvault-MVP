import { Layout } from "@/components/layout/Layout";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircle } from "lucide-react";

export default function Messages() {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex-1">
          <Layout>
            <div className="container mx-auto px-4 py-8">
              <div className="flex items-center gap-4 mb-6">
                <SidebarTrigger />
                <h1 className="text-3xl font-bold">Messages</h1>
              </div>
              
              <Card>
                <CardHeader className="text-center">
                  <div className="mx-auto w-12 h-12 bg-muted rounded-full flex items-center justify-center mb-4">
                    <MessageCircle className="w-6 h-6 text-muted-foreground" />
                  </div>
                  <CardTitle>Messages Coming Soon</CardTitle>
                  <CardDescription>
                    Direct messaging with creators and fans will be available soon.
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center text-muted-foreground">
                  <p>Stay tuned for updates on this feature!</p>
                </CardContent>
              </Card>
            </div>
          </Layout>
        </div>
      </div>
    </SidebarProvider>
  );
}