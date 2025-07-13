import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function FaqBidding() {
  return (
    <Layout>
      <div className="min-h-screen bg-background">
        <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="max-w-4xl mx-auto px-4 md:px-6 h-16 flex items-center gap-4">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/">
                <ArrowLeft className="h-4 w-4" />
                Back
              </Link>
            </Button>
            <h1 className="text-lg font-semibold">How Bidding Works</h1>
          </div>
        </header>

        <div className="max-w-4xl mx-auto p-4 md:p-6 space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold">How Bidding Works</h1>
            <p className="text-muted-foreground">
              Understanding our auction process
            </p>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">1</span>
                  Open Bidding
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  You place your bid against other buyers. This phase usually lasts for a few days or weeks.
                </p>
                
                <div className="bg-muted p-4 rounded-lg space-y-3">
                  <p className="font-semibold text-sm">Important Note:</p>
                  <p className="text-sm">
                    The "Current Bid" does not always exactly equal the highest bid. Instead, it's an incremental 
                    increase from the second highest bid. For instance, if the highest bid for an auction is $500, 
                    but the second highest bid is $100, the current bid will be shown as $100 + an incremental increase*. 
                    That way the highest bid is never exposed.
                  </p>
                </div>

                <div className="space-y-3">
                  <p className="font-semibold">How it works:</p>
                  <p>
                    The current bidder has set a maximum bid that they are willing to go up to. Once your bid 
                    surpasses their maximum, you will become the top bidder. If you are the second highest bidder 
                    and you place a bid that's higher than your current one but lower than the top bidder's, the 
                    "Current Bid" value may increase, while you still wouldn't overtake the top bidding position.
                  </p>
                </div>

                <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg space-y-2">
                  <p className="font-semibold text-sm">Example:</p>
                  <ul className="text-sm space-y-1 list-disc list-inside">
                    <li>Top bid is $500</li>
                    <li>Your bid is $225</li>
                    <li>Current Bid shown as $225 + incremental increase (could be $0)</li>
                    <li>If you bid $300, Current Bid updates to $300 + increment</li>
                    <li>You're still not the top bidder since max is $500</li>
                    <li>Once you bid above $500, you become the top bidder</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">2</span>
                  Extended Bidding
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  Any auction with at least two bidders leads to an extended bidding session; a private bidding 
                  period open only to users who placed a bid during the Open Bidding period.
                </p>
                
                <div className="space-y-3">
                  <p className="font-semibold">How Extended Bidding works:</p>
                  <ul className="space-y-2 list-disc list-inside">
                    <li>Begins immediately when Open Bidding ends</li>
                    <li>Initially lasts for 15 minutes</li>
                    <li>Each new bid extends the duration by 15 minutes for that item</li>
                    <li>Ends when no bids are placed for 15 minutes</li>
                    <li>Winner is determined at the end</li>
                  </ul>
                </div>

                <div className="bg-green-50 dark:bg-green-950/20 p-4 rounded-lg space-y-2">
                  <p className="font-semibold text-sm">Timing Example:</p>
                  <ul className="text-sm space-y-1 list-disc list-inside">
                    <li>Open Bidding ends at 6:00 PM</li>
                    <li>Extended Bidding initially ends at 6:15 PM</li>
                    <li>If bid placed at 6:03 PM → Extended until 6:18 PM</li>
                    <li>Process continues until 15 minutes pass without bids</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Incremental Increase</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  * The incremental increase is not a set/static number, but is calculated based on the second 
                  highest bid. Depending on the current value, the incremental increase is occasionally $0, 
                  meaning that the current bid may exactly equal the second highest bid.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center pt-6">
            <Button asChild>
              <Link to="/">
                Start Bidding
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
}