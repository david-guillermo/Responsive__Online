"use client";

import { useState } from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DeviceResolution, deviceCategories, getDevicesByCategory } from "@/lib/device-data";
import { Check, Smartphone, Tablet, Monitor, Plus, RotateCcw, X } from "lucide-react";

interface DeviceControlsProps {
  selectedDevices: DeviceResolution[];
  onDeviceSelect: (device: DeviceResolution) => void;
  onDeviceRemove: (deviceId: string) => void;
  onToggleOrientation: () => void;
  isRotated: boolean;
}

export function DeviceControls({
  selectedDevices,
  onDeviceSelect,
  onDeviceRemove,
  onToggleOrientation,
  isRotated
}: DeviceControlsProps) {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [customWidth, setCustomWidth] = useState("375");
  const [customHeight, setCustomHeight] = useState("667");

  const handleCategoryChange = (value: string) => {
    setActiveCategory(value);
  };

  const filteredDevices = getDevicesByCategory(activeCategory).filter(device =>
    device.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const isDeviceSelected = (deviceId: string) => {
    return selectedDevices.some(d => d.id === deviceId);
  };

  const addCustomDevice = () => {
    const width = parseInt(customWidth);
    const height = parseInt(customHeight);

    if (width > 0 && height > 0) {
      const customDevice: DeviceResolution = {
        id: `custom-${Date.now()}`,
        name: `Custom ${width}x${height}`,
        width,
        height,
        category: 'custom'
      };
      onDeviceSelect(customDevice);
    }
  };

  function getCategoryIcon(category: string) {
    switch (category) {
      case 'mobile':
        return <Smartphone className="h-4 w-4" />;
      case 'tablet':
        return <Tablet className="h-4 w-4" />;
      case 'desktop':
        return <Monitor className="h-4 w-4" />;
      default:
        return null;
    }
  }

  return (
    <div className="border-b bg-background p-4">
      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-2">Device Control Panel</h2>
        <div className="flex gap-2 mb-4">
          <Button
            variant="outline"
            size="sm"
            onClick={onToggleOrientation}
            className="flex items-center gap-1"
          >
            {isRotated ? (
              <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="5" width="18" height="14" rx="2" ry="2" />
                <line x1="7" y1="10" x2="17" y2="10" />
              </svg>
            ) : (
              <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="5" y="3" width="14" height="18" rx="2" ry="2" />
                <line x1="10" y1="7" x2="10" y2="17" />
              </svg>
            )}
            Switch to {isRotated ? "Landscape" : "Portrait"}
          </Button>
        </div>

        {selectedDevices.length > 0 && (
          <div className="mb-4">
            <h3 className="text-sm font-medium mb-2">Selected Devices (click to remove)</h3>
            <div className="grid gap-2 grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
              {selectedDevices.map(device => (
                <div
                  key={device.id}
                  className="flex items-center gap-2 border rounded-md p-2 hover:bg-muted cursor-pointer transition-colors"
                  onClick={() => onDeviceSelect(device)}
                >
                  {getCategoryIcon(device.category)}
                  <span className="text-sm flex-1">{device.name} ({device.width}x{device.height})</span>
                  <X className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <Tabs defaultValue="all" onValueChange={handleCategoryChange}>
        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <TabsList className="grid grid-cols-4">
            {deviceCategories.map(category => (
              <TabsTrigger key={category.value} value={category.value}>
                {category.label}
              </TabsTrigger>
            ))}
          </TabsList>
          <div className="flex-1">
            <Input
              placeholder="Search devices..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <TabsContent value="all" className="mt-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
            {filteredDevices.map(device => (
              <Button
                key={device.id}
                variant={isDeviceSelected(device.id) ? "default" : "outline"}
                className="justify-start"
                onClick={() => onDeviceSelect(device)}
              >
                <div className="flex items-center gap-2 w-full">
                  {getCategoryIcon(device.category)}
                  <span className="text-sm flex-1">{device.name}</span>
                  <span className="text-xs opacity-70">
                    {device.width}x{device.height}
                  </span>
                  {isDeviceSelected(device.id) && (
                    <Check className="h-4 w-4 ml-1" />
                  )}
                </div>
              </Button>
            ))}
          </div>
        </TabsContent>

        {deviceCategories.slice(1).map(category => (
          <TabsContent key={category.value} value={category.value} className="mt-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
              {filteredDevices.map(device => (
                <Button
                  key={device.id}
                  variant={isDeviceSelected(device.id) ? "default" : "outline"}
                  className="justify-start"
                  onClick={() => onDeviceSelect(device)}
                >
                  <div className="flex items-center gap-2 w-full">
                    {getCategoryIcon(device.category)}
                    <span className="text-sm flex-1">{device.name}</span>
                    <span className="text-xs opacity-70">
                      {device.width}x{device.height}
                    </span>
                    {isDeviceSelected(device.id) && (
                      <Check className="h-4 w-4 ml-1" />
                    )}
                  </div>
                </Button>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>

      <div className="mt-4 border-t pt-4">
        <h3 className="text-sm font-medium mb-2">Custom Resolution</h3>
        <div className="flex items-center gap-2">
          <Input
            type="number"
            placeholder="Width"
            value={customWidth}
            onChange={(e) => setCustomWidth(e.target.value)}
            className="w-24"
          />
          <span>×</span>
          <Input
            type="number"
            placeholder="Height"
            value={customHeight}
            onChange={(e) => setCustomHeight(e.target.value)}
            className="w-24"
          />
          <Button variant="outline" onClick={addCustomDevice} size="sm">
            <Plus className="h-4 w-4 mr-1" />
            Add
          </Button>
        </div>
      </div>
    </div>
  );
}
