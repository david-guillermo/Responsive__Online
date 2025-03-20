"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/header";
import { DeviceControls } from "@/components/device-controls";
import { DeviceGrid } from "@/components/device-grid";
import { DeviceResolution } from "@/lib/device-data";
import { ThemeProvider } from "next-themes";

export default function Home() {
  const [url, setUrl] = useState("");
  const [selectedDevices, setSelectedDevices] = useState<DeviceResolution[]>([]);
  const [isRotated, setIsRotated] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Después de la hidratación
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleUrlChange = (newUrl: string) => {
    setUrl(newUrl);
  };

  const handleDeviceSelect = (device: DeviceResolution) => {
    // Check if device is already selected
    const isAlreadySelected = selectedDevices.some(d => d.id === device.id);
    
    if (isAlreadySelected) {
      // If already selected, remove it
      setSelectedDevices(selectedDevices.filter(d => d.id !== device.id));
    } else {
      // If not selected, add it
      setSelectedDevices([...selectedDevices, device]);
    }
  };

  const handleDeviceRemove = (deviceId: string) => {
    setSelectedDevices(selectedDevices.filter(d => d.id !== deviceId));
  };

  const handleToggleOrientation = () => {
    setIsRotated(!isRotated);
  };

  if (!mounted) {
    // Renderizar una versión estática hasta que esté montado
    return <div className="flex items-center justify-center min-h-screen">Loading NovaFlex...</div>;
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className="flex flex-col min-h-screen">
        <Header onUrlChange={handleUrlChange} />
        <main className="flex-1 flex flex-col">
          <DeviceControls
            selectedDevices={selectedDevices}
            onDeviceSelect={handleDeviceSelect}
            onDeviceRemove={handleDeviceRemove}
            onToggleOrientation={handleToggleOrientation}
            isRotated={isRotated}
          />
          <DeviceGrid
            devices={selectedDevices}
            url={url}
            isRotated={isRotated}
            onUrlChange={handleUrlChange}
          />
        </main>
      </div>
    </ThemeProvider>
  );
}