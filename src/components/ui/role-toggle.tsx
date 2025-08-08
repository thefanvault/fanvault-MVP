import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { User, Crown } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export function RoleToggle() {
  const { userRole, setUserRole } = useAuth();
  
  const isCreator = userRole === 'creator';
  
  const handleToggle = (checked: boolean) => {
    setUserRole(checked ? 'creator' : 'fan');
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
        className="data-[state=checked]:bg-primary"
      />
      
      <div className="flex items-center space-x-2">
        <Crown className="h-4 w-4 text-primary" />
        <Label htmlFor="role-toggle" className="text-sm font-medium">
          Creator
        </Label>
      </div>
    </div>
  );
}