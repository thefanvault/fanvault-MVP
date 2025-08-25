import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import SettingsHome from "./settings/SettingsHome";

const Settings = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  useEffect(() => {
    if (isMobile) {
      navigate("/settings/home");
    }
  }, [isMobile, navigate]);

  // Show settings home for desktop
  if (!isMobile) {
    return <SettingsHome />;
  }

  // Fallback while redirecting
  return null;
};
export default Settings;