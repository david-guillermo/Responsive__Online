export interface DeviceResolution {
  id: string;
  name: string;
  width: number;
  height: number;
  category: 'mobile' | 'tablet' | 'desktop' | 'custom';
}

export const deviceResolutions: DeviceResolution[] = [
  // Mobile Devices (Popular)
  { id: 'iphone-se', name: 'iPhone SE', width: 375, height: 667, category: 'mobile' },
  { id: 'iphone-x', name: 'iPhone X/XS/11 Pro', width: 375, height: 812, category: 'mobile' },
  { id: 'iphone-12mini', name: 'iPhone 12/13 Mini', width: 360, height: 780, category: 'mobile' },
  { id: 'iphone-12', name: 'iPhone 12/13/14', width: 390, height: 844, category: 'mobile' },
  { id: 'iphone-12promax', name: 'iPhone 12/13 Pro Max', width: 428, height: 926, category: 'mobile' },
  { id: 'iphone-15', name: 'iPhone 15 Pro', width: 393, height: 852, category: 'mobile' },
  { id: 'iphone-15promax', name: 'iPhone 15 Pro Max', width: 430, height: 932, category: 'mobile' },
  { id: 'samsung-s20', name: 'Samsung Galaxy S20', width: 360, height: 800, category: 'mobile' },
  { id: 'samsung-s21ultra', name: 'Samsung Galaxy S21 Ultra', width: 384, height: 854, category: 'mobile' },
  { id: 'samsung-s22ultra', name: 'Samsung Galaxy S22 Ultra', width: 390, height: 844, category: 'mobile' },
  { id: 'samsung-s23', name: 'Samsung Galaxy S23', width: 393, height: 852, category: 'mobile' },
  { id: 'pixel-7', name: 'Google Pixel 7', width: 412, height: 915, category: 'mobile' },
  { id: 'xiaomi-12', name: 'Xiaomi 12', width: 393, height: 873, category: 'mobile' },
  { id: 'oneplus-9', name: 'OnePlus 9', width: 412, height: 919, category: 'mobile' },

  // Tablet Devices
  { id: 'ipad-mini', name: 'iPad Mini', width: 768, height: 1024, category: 'tablet' },
  { id: 'ipad', name: 'iPad 10.2"', width: 810, height: 1080, category: 'tablet' },
  { id: 'ipad-air', name: 'iPad Air', width: 820, height: 1180, category: 'tablet' },
  { id: 'ipad-pro-11', name: 'iPad Pro 11"', width: 834, height: 1194, category: 'tablet' },
  { id: 'ipad-pro-12.9', name: 'iPad Pro 12.9"', width: 1024, height: 1366, category: 'tablet' },
  { id: 'galaxy-tab-s7', name: 'Samsung Galaxy Tab S7', width: 800, height: 1280, category: 'tablet' },
  { id: 'galaxy-tab-s8', name: 'Samsung Galaxy Tab S8+', width: 834, height: 1320, category: 'tablet' },
  { id: 'surface-pro-8', name: 'Surface Pro 8', width: 1440, height: 960, category: 'tablet' },

  // Desktop/Laptop Breakpoints
  { id: 'laptop-small', name: 'Small Laptop', width: 1280, height: 720, category: 'desktop' },
  { id: 'laptop-medium', name: 'Medium Laptop', width: 1366, height: 768, category: 'desktop' },
  { id: 'laptop-large', name: 'Large Laptop', width: 1536, height: 864, category: 'desktop' },
  { id: 'desktop-hd', name: 'Desktop HD', width: 1920, height: 1080, category: 'desktop' },
  { id: 'desktop-2k', name: 'Desktop 2K', width: 2560, height: 1440, category: 'desktop' },
  { id: 'desktop-4k', name: 'Desktop 4K', width: 3840, height: 2160, category: 'desktop' },

  // Additional common resolutions
  { id: 'mobile-xs', name: 'Mobile XS', width: 320, height: 568, category: 'mobile' },
  { id: 'mobile-sm', name: 'Mobile SM', width: 360, height: 640, category: 'mobile' },
  { id: 'mobile-md', name: 'Mobile MD', width: 375, height: 667, category: 'mobile' },
  { id: 'mobile-lg', name: 'Mobile LG', width: 414, height: 896, category: 'mobile' },
  { id: 'tablet-sm', name: 'Tablet SM', width: 600, height: 960, category: 'tablet' },
  { id: 'tablet-md', name: 'Tablet MD', width: 768, height: 1024, category: 'tablet' },
  { id: 'tablet-lg', name: 'Tablet LG', width: 960, height: 1280, category: 'tablet' },
];

export const deviceCategories = [
  { value: 'all', label: 'All Devices' },
  { value: 'mobile', label: 'Mobile' },
  { value: 'tablet', label: 'Tablet' },
  { value: 'desktop', label: 'Desktop' },
];

export function getDevicesByCategory(category: string): DeviceResolution[] {
  if (category === 'all') {
    return deviceResolutions;
  }
  return deviceResolutions.filter(device => device.category === category);
}
