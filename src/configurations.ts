import { ResponsiveOptions } from "./types";

const defaultOptions: ResponsiveOptions = {
  direction: 'min',
  breakpoints: {},
};

let currentConfigurations: ResponsiveOptions = { ...defaultOptions };

/**
 * Set http configurations, this will override any previous configurations or merge with new onces
 */
export function setResponsiveConfigurations(
  configurations: ResponsiveOptions
): void {
  currentConfigurations = { ...currentConfigurations, ...configurations };
}

/**
 * Get current responsive configurations
 */
export function getResponsiveConfigurations(): ResponsiveOptions {
  return currentConfigurations;
}