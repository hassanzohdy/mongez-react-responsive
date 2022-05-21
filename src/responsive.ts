import { ResponsiveOptions, ResponsiveType } from './types';
import { getResponsiveConfigurations } from './configurations';

/**
 * Get merged responsive options form the given options and current responsive options
 */
export function responsiveOptions(options: ResponsiveOptions = {}): ResponsiveOptions {
  return { ...getResponsiveConfigurations(), ...options };
}

/**
 * Get proper media query for the given breakpoint
 */
export const media = (breakpoint: string, options: ResponsiveOptions = {}) => {
  const optionsList: ResponsiveOptions = responsiveOptions(options);

  let breakpoints: any = optionsList.breakpoints;
  const breakpointValue: string = breakpoints[breakpoint];

  let query: string = '';

  if (typeof breakpointValue === 'string') {
    query = breakpointValue;
  } else if (typeof breakpointValue === 'number') {
    query = `@media (${optionsList.direction}-width: ${breakpointValue}px)`;
  } else if (Array.isArray(breakpointValue)) {
    if ((breakpointValue as any[]).length === 2) {
      let range: string[] = [];

      if (breakpointValue[0] !== undefined) {
        range.push(`(min-width: ${breakpointValue[0]}px)`);
      }

      if (breakpointValue[1] !== undefined) {
        range.push(`(max-width: ${breakpointValue[1]}px)`);
      }

      query = `@media ${range.join(' and ')}`;
    }
  }

  return query;
}

/**
 * Generate media queries for the given options
 */
export function mediaQueries(options: ResponsiveOptions = {}) {
  const optionsList: ResponsiveOptions = responsiveOptions(options);

  let breakpoints: any = optionsList.breakpoints;

  let mediaQueries: any = {};

  for (let breakpoint in breakpoints) {
    mediaQueries[breakpoint] = media(breakpoint, options);
  }

  return mediaQueries;
}

/**
 * Create responsive styled object
 */
export function responsive(style: ResponsiveType, options: ResponsiveOptions = {}) {
  const breakpointsMediaQueries = mediaQueries(options);

  let returnedObject: any = style;

  for (let key in returnedObject) {
    if (key.includes(',')) {
      let isBreakpoint = false;
      for (let breakpoint of key.split(',')) {
        breakpoint = breakpoint.trim();
        if (breakpointsMediaQueries[breakpoint] !== undefined) {
          isBreakpoint = true;
          returnedObject[breakpointsMediaQueries[breakpoint]] = returnedObject[key];
        }
      }

      if (isBreakpoint) {
        delete returnedObject[key];
      }
    } else if (breakpointsMediaQueries[key] !== undefined) {
      returnedObject[breakpointsMediaQueries[key]] = returnedObject[key];
      delete returnedObject[key];
    } else if (typeof returnedObject[key] === 'object') {
      returnedObject[key] = responsive(returnedObject[key], options);
    }
  }

  return returnedObject;
}

/**
 * Alias to responsive function
 */
export const R = responsive;