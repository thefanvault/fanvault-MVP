import { Layout } from "@/components/layout/Layout";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/AppSidebar";

export default function Messages() {
  return (
    <Layout>
      <SidebarProvider>
        <div className="flex w-full min-h-screen">
          <AppSidebar />
          
          <div className="flex-1 flex flex-col min-w-0">
            <header className="h-16 border-b flex items-center px-4 bg-background sticky top-0 z-10">
              <SidebarTrigger />
              <div className="ml-4">
                <h1 className="text-lg font-semibold">Messages</h1>
              </div>
            </header>
            
            <div className="flex-1 overflow-auto p-4 md:p-6">
              <div className="w-full max-w-4xl mx-auto">
                <div className="bg-card rounded-lg border p-8 text-center">
                  <div className="text-muted-foreground">
                    <p className="text-lg mb-2">Messages feature coming soon!</p>
                    <p>This is where you'll be able to chat with creators and fans.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SidebarProvider>
    </Layout>
  );
}