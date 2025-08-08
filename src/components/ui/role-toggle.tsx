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
    <div className="flex items-center space-x-2 md:space-x-3 p-2 md:p-3 border rounded-lg bg-background">
      <div className="flex items-center space-x-1 md:space-x-2">
        <User className="h-3 w-3 md:h-4 md:w-4 text-muted-foreground" />
        <Label htmlFor="role-toggle" className="text-xs md:text-sm font-medium">
          Fan
        </Label>
      </div>
      
      <Switch
        id="role-toggle"
        checked={isCreator}
        onCheckedChange={handleToggle}
        className="data-[state=checked]:bg-primary scale-75 md:scale-100"
      />
      
      <div className="flex items-center space-x-1 md:space-x-2">
        <Crown className="h-3 w-3 md:h-4 md:w-4 text-primary" />
        <Label htmlFor="role-toggle" className="text-xs md:text-sm font-medium">
          Creator
        </Label>
      </div>
    </div>
  );
}