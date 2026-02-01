export type DeviceCategory = "mobile" | "tablet" | "desktop";

export const BREAKPOINTS = {
  mobileMax: 767,
  tabletMax: 1023,
};

export const MAX_ROWS_BY_DEVICE: Record<DeviceCategory, number> = {
  mobile: 10,
  tablet: 12,
  desktop: 15,
};

export function getDeviceCategory(width: number): DeviceCategory {
  if (width <= BREAKPOINTS.mobileMax) {
    return "mobile";
  }
  if (width <= BREAKPOINTS.tabletMax) {
    return "tablet";
  }
  return "desktop";
}

export function getMaxRowsForWidth(width: number): number {
  return MAX_ROWS_BY_DEVICE[getDeviceCategory(width)];
}
