import { Header } from "@/components/layout/Header";
import { MobileNav } from "@/components/layout/MobileNav";

const AcceptableUse = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto max-w-4xl px-4 pt-8 pb-20 md:pb-8">
        <div className="prose prose-slate dark:prose-invert max-w-none">
          <h1 className="text-3xl font-bold mb-8">Acceptable Use Policy</h1>
          
          <p className="text-muted-foreground mb-8">
            Last updated: June 15, 2025
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
            <p className="mb-4">
              This Acceptable Use Policy ("Policy") governs your use of FanVault's services. By using our platform, you agree to comply with this Policy and our Terms of Service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Prohibited Activities</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-medium mb-3">Illegal Activities</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Using our service for any illegal purpose or in violation of any local, state, or federal law</li>
                  <li>Selling stolen, counterfeit, or illegal items</li>
                  <li>Money laundering or other financial crimes</li>
                  <li>Tax evasion or fraud</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-medium mb-3">Harmful Content</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Posting content that is hateful, discriminatory, or promotes violence</li>
                  <li>Sharing content that is defamatory, libelous, or invasive of privacy</li>
                  <li>Uploading pornographic, obscene, or sexually explicit material</li>
                  <li>Distributing malware, viruses, or other harmful code</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-medium mb-3">Fraudulent Behavior</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Creating fake accounts or impersonating others</li>
                  <li>Manipulating auctions or bidding processes</li>
                  <li>Providing false or misleading information about items</li>
                  <li>Using stolen payment methods or credit cards</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-medium mb-3">Spam and Abuse</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Sending unsolicited messages or spam</li>
                  <li>Harassing, threatening, or intimidating other users</li>
                  <li>Creating multiple accounts to circumvent restrictions</li>
                  <li>Attempting to manipulate our systems or algorithms</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Intellectual Property</h2>
            <div className="space-y-4">
              <p>You must respect intellectual property rights:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Do not upload copyrighted content without permission</li>
                <li>Respect trademark and patent rights</li>
                <li>Accurately represent the authenticity of items</li>
                <li>Do not sell replica items as authentic</li>
              </ul>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Platform Integrity</h2>
            <div className="space-y-4">
              <p>Help us maintain a trustworthy platform:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Provide accurate and truthful information</li>
                <li>Complete transactions in good faith</li>
                <li>Report suspicious or inappropriate behavior</li>
                <li>Use our platform as intended</li>
              </ul>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Community Standards</h2>
            <div className="space-y-4">
              <p>We expect all users to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Treat other users with respect and courtesy</li>
                <li>Communicate professionally and appropriately</li>
                <li>Resolve disputes amicably when possible</li>
                <li>Follow all posted guidelines and rules</li>
              </ul>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Enforcement</h2>
            <div className="space-y-4">
              <p>Violations of this Policy may result in:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Warning or notice of violation</li>
                <li>Temporary suspension of account privileges</li>
                <li>Permanent termination of account</li>
                <li>Legal action for serious violations</li>
              </ul>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Reporting Violations</h2>
            <p className="mb-4">
              If you encounter content or behavior that violates this Policy, please report it to us immediately at abuse@fanvault.app. Include as much detail as possible to help us investigate.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Policy Updates</h2>
            <p className="mb-4">
              We may update this Policy from time to time. Continued use of our service after changes constitutes acceptance of the updated Policy.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
            <p className="mb-4">
              Questions about this Acceptable Use Policy should be directed to legal@fanvault.app.
            </p>
          </section>
        </div>
      </main>

      <MobileNav />
    </div>
  );
};

export default AcceptableUse;