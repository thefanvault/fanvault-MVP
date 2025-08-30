import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-white/10 backdrop-blur-md border-t border-white/20 mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <img 
                src="/fanvault-logo.png" 
                alt="FanVault Logo" 
                className="h-8 w-auto"
              />
            </Link>
            <p className="text-sm text-foreground/80">
              The premier auction platform connecting creators with their biggest fans.
            </p>
          </div>

          {/* Platform */}
          <div>
            <h3 className="font-semibold mb-4 text-foreground">Platform</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/discover" className="text-foreground/70 hover:text-foreground transition-colors">
                  Browse Auctions
                </Link>
              </li>
              <li>
                <Link to="/signup" className="text-foreground/70 hover:text-foreground transition-colors">
                  Become a Creator
                </Link>
              </li>
              <li>
                <Link to="/status" className="text-foreground/70 hover:text-foreground transition-colors">
                  System Status
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold mb-4 text-foreground">Support</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="mailto:support@fanvault.app" className="text-foreground/70 hover:text-foreground transition-colors">
                  Help Center
                </a>
              </li>
              <li>
                <a href="mailto:creators@fanvault.app" className="text-foreground/70 hover:text-foreground transition-colors">
                  Creator Support
                </a>
              </li>
              <li>
                <a href="mailto:safety@fanvault.app" className="text-foreground/70 hover:text-foreground transition-colors">
                  Safety & Trust
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold mb-4 text-foreground">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/legal/terms" className="text-foreground/70 hover:text-foreground transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/legal/privacy" className="text-foreground/70 hover:text-foreground transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/legal/dmca" className="text-foreground/70 hover:text-foreground transition-colors">
                  DMCA Guidelines
                </Link>
              </li>
              <li>
                <Link to="/legal/acceptable-use" className="text-foreground/70 hover:text-foreground transition-colors">
                  Acceptable Use
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-white/20 text-center">
          <p className="text-sm text-foreground/70">
            © {new Date().getFullYear()} FanVault. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export { Footer };