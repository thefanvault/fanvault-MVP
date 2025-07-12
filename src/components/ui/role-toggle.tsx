import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { User, Crown } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export function RoleToggle() {
  const { userRole, profile, updateProfile } = useAuth();
  
  const isCreator = userRole === 'creator';
  
  const handleToggle = async (checked: boolean) => {
    if (!profile) return;
    
    await updateProfile({
      ...profile,
      is_creator: checked
    });
  };

  return (
    <div className="flex items-center space-x-3 p-3 border rounded-lg bg-background">
      <div className="flex items-center space-x-2">
        <User className="h-4 w-4 text-muted-foreground" />
        <Label htmlFor="role-toggle" className="text-sm font-medium">
          Fan
        </Label>
      </div>
      
      <Switch
        id="role-toggle"
        checked={isCreator}
        onCheckedChange={handleToggle}
        className="data-[state=checked]:bg-fanvault-pink"
      />
      
      <div className="flex items-center space-x-2">
        <Crown className="h-4 w-4 text-fanvault-pink" />
        <Label htmlFor="role-toggle" className="text-sm font-medium">
          Creator
        </Label>
      </div>
    </div>
  );
}