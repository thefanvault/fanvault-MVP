import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Upload, Trash2, Plus, X } from "lucide-react";

interface SocialPlatform {
  name: string;
  icon: string;
  placeholder: string;
  connected: boolean;
  username?: string;
}

interface CustomLink {
  id: string;
  title: string;
  url: string;
}

interface ProfileEditModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  profile: {
    displayName: string;
    bio: string;
    avatar: string;
    banner: string;
  };
  onSave: (data: any) => void;
}

export const ProfileEditModal = ({ open, onOpenChange, profile, onSave }: ProfileEditModalProps) => {
  const { toast } = useToast();
  const [displayName, setDisplayName] = useState(profile.displayName);
  const [bio, setBio] = useState(profile.bio);
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [bannerImage, setBannerImage] = useState<File | null>(null);
  const [customLinks, setCustomLinks] = useState<CustomLink[]>([]);
  
  const [socialPlatforms, setSocialPlatforms] = useState<SocialPlatform[]>([
    { name: "Instagram", icon: "📷", placeholder: "Enter Instagram username", connected: false },
    { name: "TikTok", icon: "🎵", placeholder: "Enter TikTok username", connected: false },
    { name: "YouTube", icon: "▶️", placeholder: "Enter YouTube channel", connected: true, username: "sarahsmithofficial" },
    { name: "Twitch", icon: "🎮", placeholder: "Enter Twitch username", connected: false },
    { name: "X", icon: "𝕏", placeholder: "Enter X username", connected: false },
    { name: "OnlyFans", icon: "🔥", placeholder: "Enter OnlyFans username", connected: false },
  ]);

  const handleProfileImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setProfileImage(file);
    }
  };

  const handleBannerImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setBannerImage(file);
    }
  };

  const handleDeleteBanner = () => {
    setBannerImage(null);
  };

  const handleSocialConnect = (index: number, username: string) => {
    const updatedPlatforms = [...socialPlatforms];
    updatedPlatforms[index] = {
      ...updatedPlatforms[index],
      connected: username.length > 0,
      username: username || undefined
    };
    setSocialPlatforms(updatedPlatforms);
  };

  const addCustomLink = () => {
    const newLink: CustomLink = {
      id: Date.now().toString(),
      title: "",
      url: ""
    };
    setCustomLinks([...customLinks, newLink]);
  };

  const updateCustomLink = (id: string, field: 'title' | 'url', value: string) => {
    setCustomLinks(links => 
      links.map(link => 
        link.id === id ? { ...link, [field]: value } : link
      )
    );
  };

  const removeCustomLink = (id: string) => {
    setCustomLinks(links => links.filter(link => link.id !== id));
  };

  const handleSave = () => {
    const formData = {
      displayName,
      bio,
      profileImage,
      bannerImage,
      socialPlatforms: socialPlatforms.filter(p => p.connected),
      customLinks: customLinks.filter(l => l.title && l.url)
    };

    onSave(formData);
    
    toast({
      title: "Profile updated",
      description: "Your profile has been updated successfully.",
    });
    
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Banner Image Upload */}
          <div className="space-y-2">
            <Label>Banner Image</Label>
            <div className="relative">
              <div className="h-32 bg-muted rounded-lg border-2 border-dashed border-muted-foreground/25 flex items-center justify-center overflow-hidden">
                {bannerImage ? (
                  <img 
                    src={URL.createObjectURL(bannerImage)} 
                    alt="Banner preview" 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-center">
                    <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">Upload banner image</p>
                  </div>
                )}
              </div>
              {bannerImage && (
                <Button
                  variant="destructive"
                  size="sm"
                  className="absolute top-2 right-2"
                  onClick={handleDeleteBanner}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>
            <Input
              type="file"
              accept="image/*"
              onChange={handleBannerImageUpload}
              className="file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
            />
          </div>

          {/* Profile Image Upload */}
          <div className="space-y-2">
            <Label>Profile Image</Label>
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 rounded-full bg-muted border-2 border-dashed border-muted-foreground/25 flex items-center justify-center overflow-hidden">
                {profileImage ? (
                  <img 
                    src={URL.createObjectURL(profileImage)} 
                    alt="Profile preview" 
                    className="w-full h-full object-cover rounded-full"
                  />
                ) : (
                  <Upload className="h-6 w-6 text-muted-foreground" />
                )}
              </div>
              <div className="flex-1">
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleProfileImageUpload}
                  className="file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
                />
              </div>
            </div>
          </div>

          {/* Display Name */}
          <div className="space-y-2">
            <Label htmlFor="displayName">Display Name</Label>
            <Input
              id="displayName"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="Enter your display name"
              maxLength={50}
            />
            <div className="text-right text-sm text-muted-foreground">
              {displayName.length}/50
            </div>
          </div>

          {/* Bio/Description */}
          <div className="space-y-2">
            <Label htmlFor="bio">Description</Label>
            <Textarea
              id="bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Tell us about yourself..."
              rows={4}
              maxLength={2000}
            />
            <div className="text-right text-sm text-muted-foreground">
              {bio.length}/2000
            </div>
          </div>

          {/* Content Type Selection */}
          <div className="space-y-2">
            <Label>What type of content are you planning on making?</Label>
            <div className="flex flex-wrap gap-2">
              {["Educational", "Coaching", "Gaming", "Fitness", "Lifestyle", "Music", "Sports", "Other"].map((type) => (
                <Badge key={type} variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
                  {type}
                </Badge>
              ))}
            </div>
          </div>

          {/* Social Media Accounts */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Label className="text-base font-medium">Connect Social Media Accounts</Label>
              <div className="w-4 h-4 rounded-full bg-muted flex items-center justify-center">
                <span className="text-xs">?</span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {socialPlatforms.map((platform, index) => (
                <div key={platform.name} className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">{platform.icon}</span>
                    <Label className="font-medium">{platform.name}</Label>
                  </div>
                  <div className="flex space-x-2">
                    <Input
                      placeholder={platform.placeholder}
                      value={platform.username || ""}
                      onChange={(e) => handleSocialConnect(index, e.target.value)}
                    />
                    <Button
                      variant={platform.connected ? "default" : "outline"}
                      size="sm"
                      onClick={() => {
                        toast({
                          title: platform.connected ? "Disconnected" : "Connected",
                          description: `${platform.name} ${platform.connected ? "disconnected" : "connected"} successfully.`,
                        });
                      }}
                    >
                      {platform.connected ? "Connect" : "Connect"}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Custom Links */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-base font-medium">Additional Links</Label>
              <Button variant="outline" size="sm" onClick={addCustomLink}>
                <Plus className="h-4 w-4 mr-1" />
                Add Link
              </Button>
            </div>
            
            {customLinks.map((link) => (
              <div key={link.id} className="flex space-x-2">
                <Input
                  placeholder="Link title"
                  value={link.title}
                  onChange={(e) => updateCustomLink(link.id, 'title', e.target.value)}
                />
                <Input
                  placeholder="https://..."
                  value={link.url}
                  onChange={(e) => updateCustomLink(link.id, 'url', e.target.value)}
                />
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={() => removeCustomLink(link.id)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>

          {/* Save Button */}
          <div className="pt-4">
            <Button onClick={handleSave} className="w-full">
              Save Profile
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};