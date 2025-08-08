import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import GeneralSettings from "./settings/GeneralSettings";

const Settings = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  useEffect(() => {
    if (isMobile) {
      navigate("/settings/home");
    }
  }, [isMobile, navigate]);

  // Show general settings for desktop
  if (!isMobile) {
    return <GeneralSettings />;
  }

  // Fallback while redirecting
  return null;
};
export default Settings;