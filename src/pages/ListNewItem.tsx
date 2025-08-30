import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowRight, Upload, X, Star, Package, Truck, Plane, Link as LinkIcon, Image, FileText, Settings, Zap, Eye, Video } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface ListingData {
  contentUrl: string;
  contentVideo: File | null;
  photos: File[];
  title: string;
  description: string;
  wear: string;
  notableWear: string;
  signed: boolean;
  duration: string;
  startingBid: number;
  reservePrice: number;
  shippingTier: string;
}

const ListNewItem = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isUploading, setIsUploading] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  
  const [listingData, setListingData] = useState<ListingData>({
    contentUrl: "",
    contentVideo: null,
    photos: [],
    title: "",
    description: "",
    wear: "",
    notableWear: "",
    signed: false,
    duration: "",
    startingBid: 0,
    reservePrice: 0,
    shippingTier: ""
  });

  const totalSteps = 6;
  const stepTitles = [
    "Content Link",
    "Item Photos", 
    "Item Details",
    "Auction Settings",
    "Shipping Tier",
    "Preview & Publish"
  ];

  const stepIcons = [LinkIcon, Image, FileText, Settings, Truck, Eye];

  const updateListingData = (updates: Partial<ListingData>) => {
    setListingData(prev => ({ ...prev, ...updates }));
  };

  const handlePhotoUpload = async (files: FileList) => {
    if (listingData.photos.length + files.length > 5) {
      toast({
        title: "Too many photos",
        description: "You can upload a maximum of 5 photos",
        variant: "destructive"
      });
      return;
    }

    const validFiles = Array.from(files).filter(file => {
      if (!file.type.startsWith('image/')) {
        toast({
          title: "Invalid file type",
          description: "Please upload image files only",
          variant: "destructive"
        });
        return false;
      }
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Photos must be under 5MB",
          variant: "destructive"
        });
        return false;
      }
      return true;
    });

    updateListingData({ photos: [...listingData.photos, ...validFiles] });
  };

  const removePhoto = (index: number) => {
    updateListingData({ 
      photos: listingData.photos.filter((_, i) => i !== index) 
    });
  };

  const handleVideoUpload = async (file: File) => {
    if (!file.type.startsWith('video/')) {
      toast({
        title: "Invalid file type",
        description: "Please upload a video file",
        variant: "destructive"
      });
      return;
    }
    
    if (file.size > 100 * 1024 * 1024) { // 100MB limit
      toast({
        title: "File too large",
        description: "Video must be under 100MB",
        variant: "destructive"
      });
      return;
    }

    updateListingData({ contentVideo: file });
    toast({
      title: "Video uploaded",
      description: "Video will be shared with the buyer after sale completion",
    });
  };

  const removeVideo = () => {
    updateListingData({ contentVideo: null });
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return true; // Content URL is optional
      case 2:
        return listingData.photos.length > 0;
      case 3:
        return listingData.title.trim() && listingData.description.trim();
      case 4:
        return listingData.duration && listingData.startingBid > 0;
      case 5:
        return listingData.shippingTier;
      default:
        return true;
    }
  };

  const nextStep = () => {
    if (canProceed() && currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      // If on first step, go back to creator dashboard
      navigate('/dashboard');
    }
  };

  const handlePublish = async () => {
    setIsPublishing(true);
    
    try {
      // Simulate publishing process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "🎉 Auction published!",
        description: "Your item is now live and accepting bids",
      });
      
      // Navigate back to dashboard
      window.location.href = "/dashboard";
    } catch (error) {
      toast({
        title: "Publishing failed",
        description: "Please try again",
        variant: "destructive"
      });
    } finally {
      setIsPublishing(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <LinkIcon className="h-12 w-12 mx-auto mb-4 text-primary" />
              <h2 className="text-2xl font-bold mb-2">Content Link</h2>
              <p className="text-muted-foreground">
                Link to the post or video where this item appeared (optional)
              </p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="contentUrl">Content URL</Label>
              <Input
                id="contentUrl"
                type="url"
                placeholder="https://youtube.com/watch?v=... or https://instagram.com/p/..."
                value={listingData.contentUrl}
                onChange={(e) => updateListingData({ contentUrl: e.target.value })}
              />
              <p className="text-sm text-muted-foreground">
                Paste a link to help fans see where this item appeared
              </p>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex-1 h-px bg-border"></div>
              <span className="text-sm text-muted-foreground">OR</span>
              <div className="flex-1 h-px bg-border"></div>
            </div>

            <div className="space-y-4">
              <Label>Upload Content Video</Label>
              {listingData.contentVideo ? (
                <div className="relative">
                  <div className="flex items-center space-x-3 p-4 bg-muted rounded-lg">
                    <Video className="h-8 w-8 text-primary" />
                    <div className="flex-1">
                      <p className="font-medium">{listingData.contentVideo.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {(listingData.contentVideo.size / (1024 * 1024)).toFixed(1)}MB
                      </p>
                    </div>
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={removeVideo}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    This video will be shared with the buyer after sale completion
                  </p>
                </div>
              ) : (
                <label className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:border-primary/50 transition-colors">
                  <Video className="h-12 w-12 text-muted-foreground mb-2" />
                  <span className="font-medium mb-1">Upload Video</span>
                  <span className="text-sm text-muted-foreground text-center">
                    Video will be shared with buyer after sale (Max 100MB)
                  </span>
                  <input
                    type="file"
                    accept="video/*"
                    className="hidden"
                    onChange={(e) => e.target.files?.[0] && handleVideoUpload(e.target.files[0])}
                  />
                </label>
              )}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <Image className="h-12 w-12 mx-auto mb-4 text-primary" />
              <h2 className="text-2xl font-bold mb-2">Item Photos</h2>
              <p className="text-muted-foreground">
                Upload clear photos of your item (at least 1 required)
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {listingData.photos.map((photo, index) => (
                <div key={index} className="relative">
                  <img
                    src={URL.createObjectURL(photo)}
                    alt={`Photo ${index + 1}`}
                    className="w-full h-32 object-cover rounded-lg border"
                  />
                  <Button
                    variant="destructive"
                    size="icon"
                    className="absolute -top-2 -right-2 h-6 w-6"
                    onClick={() => removePhoto(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              
              {listingData.photos.length < 5 && (
                <label className="border-2 border-dashed border-muted-foreground/25 rounded-lg h-32 flex flex-col items-center justify-center cursor-pointer hover:border-primary/50 transition-colors">
                  <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                  <span className="text-sm text-muted-foreground">Add Photo</span>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={(e) => e.target.files && handlePhotoUpload(e.target.files)}
                  />
                </label>
              )}
            </div>

            <p className="text-sm text-muted-foreground text-center">
              {listingData.photos.length}/5 photos • Max 5MB each
            </p>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <FileText className="h-12 w-12 mx-auto mb-4 text-primary" />
              <h2 className="text-2xl font-bold mb-2">Item Details</h2>
              <p className="text-muted-foreground">
                Tell fans about your item
              </p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  placeholder="Jacket from Summer Night video"
                  value={listingData.title}
                  onChange={(e) => updateListingData({ title: e.target.value })}
                  maxLength={100}
                />
                <p className="text-sm text-muted-foreground text-right">
                  {listingData.title.length}/100
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  placeholder="Tell the story of this item - where it appeared, special features, or anything fans should know..."
                  value={listingData.description}
                  onChange={(e) => updateListingData({ description: e.target.value })}
                  className="min-h-[120px]"
                  maxLength={500}
                />
                <p className="text-sm text-muted-foreground text-right">
                  {listingData.description.length}/500
                </p>
              </div>

              <div className="space-y-2">
                <Label>Wear (optional)</Label>
                <Select value={listingData.wear} onValueChange={(value) => updateListingData({ wear: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select wear level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Leave blank</SelectItem>
                    <SelectItem value="like-new">Like New</SelectItem>
                    <SelectItem value="lightly-worn">Lightly Worn</SelectItem>
                    <SelectItem value="worn">Worn</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground">
                  How much has this item been used or worn?
                </p>
              </div>

              {listingData.wear && (
                <div className="space-y-2">
                  <Label htmlFor="notableWear">Notable wear (optional)</Label>
                  <Textarea
                    id="notableWear"
                    placeholder="Any specific signs of wear, damage, or condition details..."
                    value={listingData.notableWear}
                    onChange={(e) => updateListingData({ notableWear: e.target.value })}
                    className="min-h-[80px]"
                    maxLength={240}
                  />
                  <p className="text-sm text-muted-foreground text-right">
                    {listingData.notableWear.length}/240
                  </p>
                </div>
              )}

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="flex items-center space-x-2">
                    <Star className="h-4 w-4" />
                    <span>Signed/Autographed</span>
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Is this item signed or autographed?
                  </p>
                </div>
                <Switch
                  checked={listingData.signed}
                  onCheckedChange={(checked) => updateListingData({ signed: checked })}
                />
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <Settings className="h-12 w-12 mx-auto mb-4 text-primary" />
              <h2 className="text-2xl font-bold mb-2">Auction Settings</h2>
              <p className="text-muted-foreground">
                Set your auction duration and pricing
              </p>
            </div>

            <div className="space-y-6">
              <div className="space-y-3">
                <Label>Auction Duration *</Label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { value: "1", label: "1 Day" },
                    { value: "3", label: "3 Days" },
                    { value: "7", label: "7 Days" }
                  ].map((option) => (
                    <Button
                      key={option.value}
                      variant={listingData.duration === option.value ? "default" : "outline"}
                      className="h-12"
                      onClick={() => updateListingData({ duration: option.value })}
                    >
                      {option.label}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startingBid">Starting Bid (USD) *</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">$</span>
                    <Input
                      id="startingBid"
                      type="number"
                      min="1"
                      placeholder="0"
                      className="pl-8"
                      value={listingData.startingBid || ""}
                      onChange={(e) => updateListingData({ startingBid: Number(e.target.value) })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="reservePrice">Reserve Price (USD)</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">$</span>
                    <Input
                      id="reservePrice"
                      type="number"
                      min="0"
                      placeholder="Optional"
                      className="pl-8"
                      value={listingData.reservePrice || ""}
                      onChange={(e) => updateListingData({ reservePrice: Number(e.target.value) })}
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Minimum price to sell (hidden from bidders)
                  </p>
                </div>
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <Truck className="h-12 w-12 mx-auto mb-4 text-primary" />
              <h2 className="text-2xl font-bold mb-2">Shipping Tier</h2>
              <p className="text-muted-foreground">
                Choose the shipping category for this item
              </p>
            </div>

            <div className="grid gap-4">
              {[
                { 
                  value: "light", 
                  label: "Light", 
                  description: "Small items, jewelry, cards", 
                  price: "$5",
                  icon: Package 
                },
                { 
                  value: "medium", 
                  label: "Medium", 
                  description: "Clothing, shoes, accessories", 
                  price: "$12",
                  icon: Truck 
                },
                { 
                  value: "heavy", 
                  label: "Heavy", 
                  description: "Large items, electronics", 
                  price: "$25",
                  icon: Plane 
                }
              ].map((tier) => (
                <Card
                  key={tier.value}
                  className={`cursor-pointer transition-all ${
                    listingData.shippingTier === tier.value ? 'ring-2 ring-primary' : ''
                  }`}
                  onClick={() => updateListingData({ shippingTier: tier.value })}
                >
                  <CardContent className="p-4 flex items-center space-x-4">
                    <tier.icon className="h-8 w-8 text-primary" />
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <h3 className="font-semibold">{tier.label}</h3>
                        <Badge variant="secondary">{tier.price}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{tier.description}</p>
                    </div>
                    {listingData.shippingTier === tier.value && (
                      <div className="w-4 h-4 rounded-full bg-primary flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-white"></div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <Eye className="h-12 w-12 mx-auto mb-4 text-primary" />
              <h2 className="text-2xl font-bold mb-2">Preview & Publish</h2>
              <p className="text-muted-foreground">
                Review your listing before publishing
              </p>
            </div>

            <Card>
              <CardContent className="p-6">
                {/* Preview of the listing */}
                {listingData.photos.length > 0 && (
                  <div className="mb-4">
                    <img
                      src={URL.createObjectURL(listingData.photos[0])}
                      alt="Item"
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    {listingData.photos.length > 1 && (
                      <p className="text-sm text-muted-foreground mt-2">
                        +{listingData.photos.length - 1} more photos
                      </p>
                    )}
                  </div>
                )}

                  <div className="space-y-3">
                    <h3 className="text-xl font-bold">{listingData.title}</h3>
                    
                    <div className="flex items-center space-x-4">
                      {listingData.wear && (
                        <Badge>
                          {listingData.wear === 'like-new' && 'Like New'}
                          {listingData.wear === 'lightly-worn' && 'Lightly Worn'}
                          {listingData.wear === 'worn' && 'Worn'}
                        </Badge>
                      )}
                      {listingData.signed && <Badge variant="secondary">Signed</Badge>}
                    </div>

                    <p className="text-muted-foreground">{listingData.description}</p>
                    
                    {listingData.notableWear && (
                      <div className="p-3 bg-muted rounded-lg">
                        <p className="text-sm">
                          <span className="font-medium">Notable wear:</span> {listingData.notableWear}
                        </p>
                      </div>
                    )}

                  <div className="pt-4 border-t">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium">Starting Bid:</span>
                        <p className="text-lg font-bold text-primary">${listingData.startingBid}</p>
                      </div>
                      <div>
                        <span className="font-medium">Duration:</span>
                        <p>{listingData.duration} day{listingData.duration !== "1" ? "s" : ""}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Button
              onClick={handlePublish}
              disabled={isPublishing}
              className="w-full h-12 text-lg font-semibold bg-fanvault-gradient"
            >
              {isPublishing ? "Publishing..." : "🚀 Publish Auction"}
            </Button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 pt-6 pb-6">
        <div className="max-w-2xl mx-auto">
          {/* Progress Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <Button variant="ghost" onClick={prevStep}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <div className="text-center">
                <p className="text-sm text-muted-foreground">Step {currentStep} of {totalSteps}</p>
                <p className="font-medium">{stepTitles[currentStep - 1]}</p>
              </div>
              <div className="w-16" /> {/* Spacer */}
            </div>
            
            <Progress value={(currentStep / totalSteps) * 100} className="h-2" />
            
            {/* Step indicators */}
            <div className="flex justify-between mt-4">
              {Array.from({ length: totalSteps }, (_, i) => {
                const StepIcon = stepIcons[i];
                return (
                  <div
                    key={i}
                    className={`flex flex-col items-center space-y-1 ${
                      i + 1 <= currentStep ? 'text-primary' : 'text-muted-foreground'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      i + 1 <= currentStep ? 'bg-primary text-white' : 'bg-muted'
                    }`}>
                      <StepIcon className="h-4 w-4" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Step Content */}
          <Card>
            <CardContent className="p-8">
              {renderStep()}
            </CardContent>
          </Card>

          {/* Navigation */}
          {currentStep < totalSteps && (
            <div className="mt-6 flex justify-end">
              <Button
                onClick={nextStep}
                disabled={!canProceed()}
                className="bg-fanvault-gradient px-8"
              >
                Next
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ListNewItem;