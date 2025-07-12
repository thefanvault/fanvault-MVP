import { Layout } from "@/components/layout/Layout";

export default function Messages() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-foreground mb-8">Messages</h1>
          
          <div className="bg-card rounded-lg border p-8 text-center">
            <div className="text-muted-foreground">
              <p className="text-lg mb-2">Messages feature coming soon!</p>
              <p>This is where you'll be able to chat with creators and fans.</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}