import { Header } from "@/components/layout/Header";
import { MobileNav } from "@/components/layout/MobileNav";

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto max-w-4xl px-4 pt-8 pb-20 md:pb-8">
        <div className="prose prose-slate dark:prose-invert max-w-none">
          <h1 className="text-3xl font-bold mb-8">Terms of Service</h1>
          
          <p className="text-muted-foreground mb-8">
            Last updated: June 15, 2025
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
            <p className="mb-4">
              By accessing and using FanVault ("the Service"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">2. Description of Service</h2>
            <p className="mb-4">
              FanVault is an online auction platform that allows creators to sell unique items to their fans through a bidding system. The Service includes web pages, tools, and services provided by FanVault.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">3. User Accounts</h2>
            <div className="space-y-4">
              <p>
                To access certain features of the Service, you may be required to create an account. You agree to:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Provide accurate, current, and complete information</li>
                <li>Maintain and promptly update your account information</li>
                <li>Maintain the security of your password and account</li>
                <li>Notify us immediately of any unauthorized use of your account</li>
              </ul>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">4. Auction Rules</h2>
            <div className="space-y-4">
              <p>When participating in auctions, you agree to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Place bids in good faith with intent to purchase</li>
                <li>Complete payment for won auctions within the specified timeframe</li>
                <li>Provide accurate shipping information</li>
                <li>Accept items in the condition described by the creator</li>
              </ul>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">5. Creator Responsibilities</h2>
            <div className="space-y-4">
              <p>As a creator on FanVault, you agree to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Accurately describe all items being auctioned</li>
                <li>Ship items within the specified timeframe</li>
                <li>Provide authentic items as described</li>
                <li>Respond to buyer inquiries in a timely manner</li>
              </ul>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">6. Payment and Fees</h2>
            <p className="mb-4">
              FanVault charges fees for successful transactions. Detailed fee information is available in your creator dashboard. Payment processing is handled securely through our payment partners.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">7. Prohibited Content</h2>
            <div className="space-y-4">
              <p>You may not use the Service to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Sell counterfeit, stolen, or illegal items</li>
                <li>Engage in fraudulent or deceptive practices</li>
                <li>Harass, abuse, or harm other users</li>
                <li>Violate any applicable laws or regulations</li>
              </ul>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">8. Limitation of Liability</h2>
            <p className="mb-4">
              FanVault shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">9. Termination</h2>
            <p className="mb-4">
              We may terminate or suspend your account and bar access to the Service immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever and without limitation.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">10. Changes to Terms</h2>
            <p className="mb-4">
              We reserve the right to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days notice prior to any new terms taking effect.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">11. Contact Information</h2>
            <p className="mb-4">
              If you have any questions about these Terms of Service, please contact us at legal@fanvault.app.
            </p>
          </section>
        </div>
      </main>

      <MobileNav />
    </div>
  );
};

export default TermsOfService;