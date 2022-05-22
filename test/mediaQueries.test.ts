import { mediaQueries } from './../src';

describe('Generating Media Queries', () => {
    test('generate empty media queries', () => {
        let breakpoints = mediaQueries();

        expect(breakpoints).toMatchObject({});
    });

    test('generate media queries with default direction', () => {
        let breakpoints = mediaQueries({
            breakpoints: {
                xs: 320,
                sm: 580,
                md: 1024,
            }
        });

        expect(breakpoints).toMatchObject({
            xs: '@media (min-width: 320px)',
            sm: '@media (min-width: 580px)',
            md: '@media (min-width: 1024px)',
        });
    });

    test('generate media queries with direction as min', () => {
        let breakpoints = mediaQueries({
            breakpoints: {
                xs: 320,
                sm: 580,
                md: 1024,
            },
            direction: 'min',
        });

        expect(breakpoints).toMatchObject({
            xs: '@media (min-width: 320px)',
            sm: '@media (min-width: 580px)',
            md: '@media (min-width: 1024px)',
        });
    });

    test('generate media queries with direction as max', () => {
        let breakpoints = mediaQueries({
            breakpoints: {
                xs: 320,
                sm: 580,
                md: 1024,
            },
            direction: 'max',
        });

        expect(breakpoints).toMatchObject({
            xs: '@media (max-width: 320px)',
            sm: '@media (max-width: 580px)',
            md: '@media (max-width: 1024px)',
        });
    });

    test('generate media queries with range', () => {
        let breakpoints = mediaQueries({
            breakpoints: {
                xs: [0, 320],
                sm: [321, 580],
                md: [579, 1024],
            },
        });

        expect(breakpoints).toMatchObject({
            xs: '@media (min-width: 0px) and (max-width: 320px)',
            sm: '@media (min-width: 321px) and (max-width: 580px)',
            md: '@media (min-width: 579px) and (max-width: 1024px)',
        });
    });

    test('generate media queries and enforce min width', () => {
        let breakpoints = mediaQueries({
            breakpoints: {
                xs: [0,],
                sm: [321,],
                md: [579,],
                lg: 1024
            },
            direction: 'max',
        });

        expect(breakpoints).toMatchObject({
            xs: '@media (min-width: 0px)',
            sm: '@media (min-width: 321px)',
            md: '@media (min-width: 579px)',
            lg: '@media (max-width: 1024px)',
        });
    });

    test('generate media queries and enforce max width', () => {
        let breakpoints = mediaQueries({
            breakpoints: {
                xs: [, 320],
                sm: [, 580],
                md: [, 768],
                lg: 1024
            },
            direction: 'min',
        });

        expect(breakpoints).toMatchObject({
            xs: '@media (max-width: 320px)',
            sm: '@media (max-width: 580px)',
            md: '@media (max-width: 768px)',
            lg: '@media (min-width: 1024px)',
        });
    });

    test('generate custom media queries', () => {
        let breakpoints = mediaQueries({
            breakpoints: {
                lg: 1024,
                print: '@media print',
            },
        });

        expect(breakpoints).toMatchObject({
            lg: '@media (min-width: 1024px)',
            print: '@media print',
        });
    });
});