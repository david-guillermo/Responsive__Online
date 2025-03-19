"use client";

import { DeviceResolution } from "@/lib/device-data";
import { Monitor, Smartphone, Tablet } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface DeviceFrameProps {
  device: DeviceResolution;
  url: string;
  isRotated: boolean;
  onUrlChange?: (url: string) => void;
}

export function DeviceFrame({
  device,
  url,
  isRotated,
  onUrlChange
}: DeviceFrameProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [containerWidth, setContainerWidth] = useState(0);

  // Calculate dimensions based on orientation
  const frameWidth = isRotated ? device.height : device.width;
  const frameHeight = isRotated ? device.width : device.height;

  // Recalculate scale when container size or device orientation changes
  useEffect(() => {
    const currentRef = containerRef.current;
    if (!currentRef) return;

    const calculateScale = () => {
      if (!currentRef) return;

      // Get container width with some padding
      const availableWidth = currentRef.clientWidth - 32; // 16px padding on each side
      const availableHeight = 400; // Maximum expected height

      // Calculate scale based on both dimensions
      const widthScale = availableWidth / frameWidth;
      const heightScale = availableHeight / frameHeight;

      // Use the smaller scale to ensure it fits in both dimensions
      const newScale = Math.min(widthScale, heightScale, 1); // Max scale is 1

      setScale(newScale);
      setContainerWidth(availableWidth);
    };

    // Calculate on mount and when resized
    calculateScale();
    const resizeObserver = new ResizeObserver(calculateScale);
    resizeObserver.observe(currentRef);

    return () => {
      // Use the captured reference for cleanup
      if (currentRef) {
        resizeObserver.unobserve(currentRef);
      }
    };
  }, [frameWidth, frameHeight, isRotated]);

  // Get proper icon based on device category
  const getDeviceIcon = () => {
    switch (device.category) {
      case 'mobile':
        return <Smartphone className="h-4 w-4" />;
      case 'tablet':
        return <Tablet className="h-4 w-4" />;
      case 'desktop':
      case 'custom':
      default:
        return <Monitor className="h-4 w-4" />;
    }
  };

  return (
    <div className="flex flex-col bg-background rounded-md border shadow-sm w-full" ref={containerRef}>
      <div className="flex items-center justify-between p-2 border-b">
        <div className="flex items-center gap-2 text-sm">
          {getDeviceIcon()}
          <span>{device.name}</span>
        </div>
        <div className="text-xs text-muted-foreground">
          {frameWidth} × {frameHeight}
        </div>
      </div>
      <div className="p-2 overflow-hidden flex-grow flex justify-center">
        <div
          className="relative border border-border"
          style={{
            width: frameWidth * scale,
            height: frameHeight * scale,
          }}
        >
          {url ? (
            <iframe
              src={url}
              title={`${device.name} frame`}
              className="border-0"
              style={{
                width: frameWidth,
                height: frameHeight,
                transform: `scale(${scale})`,
                transformOrigin: "0 0",
                position: "absolute",
                top: 0,
                left: 0,
              }}
              sandbox="allow-scripts allow-same-origin allow-forms"
              loading="lazy"
              // No onLoad handler to evitar problemas de seguridad
            />
          ) : (
            <div
              className="w-full h-full flex items-center justify-center bg-muted text-muted-foreground text-sm"
              style={{
                width: frameWidth,
                height: frameHeight,
                transform: `scale(${scale})`,
                transformOrigin: "0 0",
                position: "absolute",
                top: 0,
                left: 0,
              }}
            >
              Enter a URL to load content
            </div>
          )}
        </div>
      </div>
      <div className="p-2 text-center text-xs text-muted-foreground">
        Scale: {Math.round(scale * 100)}%
      </div>
    </div>
  );
}
