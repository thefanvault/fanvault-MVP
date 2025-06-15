import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface SocialLink {
  id: string;
  platform: string;
  prefix: string;
  value: string;
  icon: string;
}

const defaultSocials: Omit<SocialLink, 'id' | 'value'>[] = [
  { platform: "Twitter", prefix: "twitter.com/", icon: "🐦" },
  { platform: "Instagram", prefix: "instagram.com/", icon: "📸" },
  { platform: "OnlyFans", prefix: "onlyfans.com/", icon: "🔗" },
  { platform: "Fansly", prefix: "fansly.com/", icon: "💎" },
  { platform: "TikTok", prefix: "tiktok.com/@", icon: "🎵" },
  { platform: "YouTube", prefix: "youtube.com/@", icon: "▶️" }
];

const CreatorSocial = () => {
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>(
    defaultSocials.map((social, index) => ({
      ...social,
      id: index.toString(),
      value: ""
    }))
  );
  const [customLinks, setCustomLinks] = useState<SocialLink[]>([]);
  const navigate = useNavigate();

  const updateSocialLink = (id: string, value: string, isCustom = false) => {
    if (isCustom) {
      setCustomLinks(prev => 
        prev.map(link => link.id === id ? { ...link, value } : link)
      );
    } else {
      setSocialLinks(prev => 
        prev.map(link => link.id === id ? { ...link, value } : link)
      );
    }
  };

  const addCustomLink = () => {
    const newLink: SocialLink = {
      id: `custom-${Date.now()}`,
      platform: "Other",
      prefix: "https://",
      value: "",
      icon: "🌐"
    };
    setCustomLinks(prev => [...prev, newLink]);
  };

  const removeCustomLink = (id: string) => {
    setCustomLinks(prev => prev.filter(link => link.id !== id));
  };

  const hasAnyLinks = () => {
    return [...socialLinks, ...customLinks].some(link => link.value.trim() !== "");
  };

  const handleNext = () => {
    navigate("/onboarding/creator/payout");
  };

  const handleBack = () => {
    navigate("/onboarding/creator/profile");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <img 
                src="/lovable-uploads/a4c880dd-a727-40e6-b3eb-1fa7df905859.png" 
                alt="FanVault Logo" 
                className="h-8"
              />
            </div>
            <Button variant="outline">Sign Out</Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Progress */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Step 2 of 3</span>
              <span className="text-sm text-muted-foreground">Social Links</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div className="bg-fanvault-gradient h-2 rounded-full w-2/3 transition-all duration-300" />
            </div>
          </div>

          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Connect your channels</h1>
            <p className="text-muted-foreground">
              Link your social media accounts so fans can find you everywhere (optional)
            </p>
          </div>

          <div className="space-y-6">
            {/* Main Social Platforms */}
            <div className="grid gap-4">
              {socialLinks.map((social) => (
                <div key={social.id} className="space-y-2">
                  <Label htmlFor={social.id} className="flex items-center space-x-2">
                    <span className="text-lg">{social.icon}</span>
                    <span>{social.platform}</span>
                  </Label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-input bg-muted text-muted-foreground text-sm">
                      {social.prefix}
                    </span>
                    <Input
                      id={social.id}
                      placeholder="username"
                      value={social.value}
                      onChange={(e) => updateSocialLink(social.id, e.target.value)}
                      className="h-12 rounded-l-none"
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Custom Links */}
            {customLinks.length > 0 && (
              <div className="space-y-4">
                <h3 className="font-medium text-sm text-muted-foreground">Custom Links</h3>
                {customLinks.map((link) => (
                  <div key={link.id} className="space-y-2">
                    <Label htmlFor={link.id} className="flex items-center space-x-2">
                      <span className="text-lg">{link.icon}</span>
                      <span>Other Platform</span>
                    </Label>
                    <div className="flex">
                      <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-input bg-muted text-muted-foreground text-sm">
                        {link.prefix}
                      </span>
                      <Input
                        id={link.id}
                        placeholder="your-profile-url"
                        value={link.value}
                        onChange={(e) => updateSocialLink(link.id, e.target.value, true)}
                        className="h-12 rounded-l-none rounded-r-none border-r-0"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeCustomLink(link.id)}
                        className="rounded-l-none h-12 px-3"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Add Custom Link Button */}
            <Button
              type="button"
              variant="outline"
              onClick={addCustomLink}
              className="w-full border-dashed"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add another link
            </Button>

            {/* Info Text */}
            <div className="text-center text-sm text-muted-foreground bg-muted/50 p-4 rounded-lg">
              <p>
                These links will appear on your creator profile. You can always add or update them later.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4 pt-4">
              <Button 
                type="button" 
                variant="outline" 
                className="flex-1"
                onClick={handleBack}
              >
                Back
              </Button>
              <Button
                type="button"
                className="flex-1 bg-fanvault-gradient hover:opacity-90"
                onClick={handleNext}
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CreatorSocial;