import {
  Tv,
  Zap,
  Cpu,
  Layers,
  Bluetooth,
  Battery,
  Keyboard,
  Sliders,
  Eye,
  Sun,
  Compass,
  Droplet,
  Info,
  ShieldCheck,
  Dumbbell,
  Calendar,
} from "lucide-react";

// 1. Centralized master icon dictionary
const SYSTEM_ICONS: Record<
  string,
  React.ComponentType<{ className?: string }>
> = {
  // Power / Electronics
  wattage: Zap,
  voltage: Zap,
  power_source: Zap,
  battery_life: Battery,

  // Design / Hardware Spec
  capacity: Layers,
  layout_size: Keyboard,
  switch_type: Zap,
  backlight: Sun,
  control_type: Sliders,

  // Performance / Media
  resolution: Tv,
  display: Tv,
  brightness: Sun,
  throw_ratio: Compass,
  smart_os: Cpu,
  sensors: Cpu,

  // Connectivity
  connectivity: Bluetooth,
  connection_modes: Bluetooth,
  gps_tech: Compass,

  // Fitness / Outdoor / Groceries
  water_resistance: Droplet,
  weight: Dumbbell,
  shelf_life: Calendar,
  warranty: ShieldCheck,
};

/**
 * Professional Fetcher Utility
 * Safely looks up any attribute key or falls back to a clean default
 */
export function getAttributeIcon(key: string) {
  return SYSTEM_ICONS[key.toLowerCase()] || Info;
}
