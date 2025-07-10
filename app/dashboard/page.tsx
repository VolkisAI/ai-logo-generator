/**
 * Dashboard page for Template App
 * Displays the main dashboard interface for authenticated users
 * Features a sidebar navigation and content area
 * Requires a paid membership to access
 */
import { LogoCanvas } from "@/components/logo-generator/logo-canvas";

/**
 * Main dashboard page component
 * The profile is provided by the parent layout component
 */
export default function DashboardPage() {
  return (
    <div className="absolute inset-0">
      <LogoCanvas />
    </div>
  );
} 