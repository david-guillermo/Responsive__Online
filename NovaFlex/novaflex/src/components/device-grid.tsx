"use client";

import { DeviceResolution } from "@/lib/device-data";
import { DeviceFrame } from "@/components/device-frame";
import { ScrollArea } from "@/components/ui/scroll-area";

interface DeviceGridProps {
  devices: DeviceResolution[];
  url: string;
  isRotated: boolean;
  onUrlChange?: (url: string) => void;
}

export function DeviceGrid({
  devices,
  url,
  isRotated,
  onUrlChange
}: DeviceGridProps) {
  if (devices.length === 0) {
    return (
      <div className="flex items-center justify-center h-[50vh] text-muted-foreground">
        Select devices to view responsive layouts
      </div>
    );
  }

  return (
    <ScrollArea className="h-[calc(100vh-13rem)] w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
        {devices.map((device) => (
          <div key={device.id} className="flex justify-center">
            <DeviceFrame
              device={device}
              url={url}
              isRotated={isRotated}
              onUrlChange={onUrlChange}
            />
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}
