import { CSSObject } from '@emotion/react';

export type ResponsiveType = CSSObject;

export type Breakpoint = string | number | [number, number] | [undefined, number] | [number, undefined] | [number];

export type ResponsiveOptions = {
    /**
     * Responsive media query direction
     * This works if the break point is just a number
     * @default min
     */
    direction?: 'min' | 'max';
    breakpoints?: {
        [breakpoint: string]: Breakpoint;
    }
}