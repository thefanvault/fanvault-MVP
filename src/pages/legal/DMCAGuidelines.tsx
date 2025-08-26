import { Header } from "@/components/layout/Header";
import { MobileNav } from "@/components/layout/MobileNav";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const DMCAGuidelines = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <header className="border-b bg-background sticky top-0 z-10">
        <div className="container mx-auto max-w-4xl px-4 h-16 flex items-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleBack}
            className="flex-shrink-0"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </div>
      </header>
      
      <main className="container mx-auto max-w-4xl px-4 pt-8 pb-20 md:pb-8">
        <div className="prose prose-slate dark:prose-invert max-w-none">
          <h1 className="text-3xl font-bold mb-8">DMCA Guidelines</h1>
          
          <p className="text-muted-foreground mb-8">
            Last updated: June 15, 2025
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Digital Millennium Copyright Act Notice</h2>
            <p className="mb-4">
              FanVault respects the intellectual property rights of others and expects our users to do the same. In accordance with the Digital Millennium Copyright Act of 1998 (DMCA), we will respond expeditiously to claims of copyright infringement committed using our service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Filing a DMCA Notice</h2>
            <div className="space-y-4">
              <p>If you believe that your copyrighted work has been copied and is accessible on our platform in a way that constitutes copyright infringement, you may submit a DMCA takedown notice. Your notice must include:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>A physical or electronic signature of the copyright owner or authorized agent</li>
                <li>Identification of the copyrighted work claimed to have been infringed</li>
                <li>Identification of the material that is claimed to be infringing and information sufficient to locate the material</li>
                <li>Your contact information (address, telephone number, and email address)</li>
                <li>A statement that you have a good faith belief that use of the material is not authorized by the copyright owner</li>
                <li>A statement that the information in the notification is accurate and, under penalty of perjury, that you are authorized to act on behalf of the copyright owner</li>
              </ul>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Where to Send DMCA Notices</h2>
            <div className="bg-muted p-4 rounded-lg">
              <p className="font-medium mb-2">DMCA Agent:</p>
              <p>FanVault Legal Department</p>
              <p>Email: dmca@fanvault.app</p>
              <p>Subject Line: DMCA Takedown Notice</p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Counter-Notification</h2>
            <div className="space-y-4">
              <p>If you believe that your content was removed by mistake or misidentification, you may file a counter-notification. Your counter-notification must include:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Your physical or electronic signature</li>
                <li>Identification of the material that was removed and the location where it appeared</li>
                <li>A statement under penalty of perjury that you have a good faith belief that the material was removed as a result of mistake or misidentification</li>
                <li>Your name, address, and telephone number</li>
                <li>A statement that you consent to the jurisdiction of federal court in your district</li>
              </ul>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Repeat Infringer Policy</h2>
            <p className="mb-4">
              FanVault will terminate the accounts of users who are repeat infringers of copyright. A repeat infringer is a user who has been notified of infringing activity more than twice and/or has had content removed from our platform more than twice.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Content Guidelines for Creators</h2>
            <div className="space-y-4">
              <p>As a creator on FanVault, you must ensure that:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>You own or have proper licensing for all content you post</li>
                <li>You do not upload copyrighted material without permission</li>
                <li>You respect trademark and other intellectual property rights</li>
                <li>You accurately represent the authenticity of items being auctioned</li>
              </ul>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">False Claims</h2>
            <p className="mb-4">
              Please note that under Section 512(f) of the DMCA, any person who knowingly materially misrepresents that material or activity is infringing may be subject to liability for damages.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
            <p className="mb-4">
              For questions about our DMCA policy or to report copyright infringement, please contact our DMCA agent at dmca@fanvault.app.
            </p>
          </section>
        </div>
      </main>

      <MobileNav />
    </div>
  );
};

export default DMCAGuidelines;