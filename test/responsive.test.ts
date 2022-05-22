import { responsive, setResponsiveConfigurations } from "../src";

describe('Test responsive function', () => {
    beforeEach(() => {
        setResponsiveConfigurations({
            breakpoints: {
                sm: 580,
                md: 768,
                lg: 1024,
                xl: 1280,
                hd: 1920,
            }
        });
    });

    it('should generate proper style object', () => {
        let responsiveStyle = responsive({
            sm: {
                color: 'red',
            },
            md: {
                color: 'green',
            },
            lg: {
                color: 'yellow',
            },
            xl: {
                color: 'purple',
            },
            hd: {
                color: 'orange'
            }
        });

        expect(responsiveStyle).toMatchObject({
            '@media (min-width: 580px)': {
                color: 'red',
            },
            '@media (min-width: 768px)': {
                color: 'green',
            },
            '@media (min-width: 1024px)': {
                color: 'yellow',
            },
            '@media (min-width: 1280px)': {
                color: 'purple',
            },
            '@media (min-width: 1920px)': {
                color: 'orange',
            },
        });
    });

    it('should generate combined breakpoints', () => {
        let responsiveStyle = responsive({
            'sm, md': {
                color: 'red',
            },
            'lg,xl': {
                color: 'yellow',
            },
            hd: {
                color: 'orange'
            }
        });

        expect(responsiveStyle).toMatchObject({
            '@media (min-width: 580px)': {
                color: 'red',
            },
            '@media (min-width: 768px)': {
                color: 'red',
            },
            '@media (min-width: 1024px)': {
                color: 'yellow',
            },
            '@media (min-width: 1280px)': {
                color: 'yellow',
            },
            '@media (min-width: 1920px)': {
                color: 'orange',
            },
        });
    });

    it('should ignore whitespace in combined breakpoints', () => {
        let responsiveStyle = responsive({
            ' sm , md': {
                color: 'red',
            },
            '  lg   ,   xl   ': {
                color: 'yellow',
            },
            hd: {
                color: 'orange'
            }
        });

        expect(responsiveStyle).toMatchObject({
            '@media (min-width: 580px)': {
                color: 'red',
            },
            '@media (min-width: 768px)': {
                color: 'red',
            },
            '@media (min-width: 1024px)': {
                color: 'yellow',
            },
            '@media (min-width: 1280px)': {
                color: 'yellow',
            },
            '@media (min-width: 1920px)': {
                color: 'orange',
            },
        });
    });

    it('should define custom breakpoints', () => {
        let responsiveStyle = responsive({
            iphone: {
                color: 'blue',
            },
        }, {
            breakpoints: {
                iphone: 320,
            }
        });

        expect(responsiveStyle).toMatchObject({
            '@media (min-width: 320px)': {
                color: 'blue',
            },
        });
    });

    it('should change configuration directions', () => {
        let responsiveStyle = responsive({
            sm: {
                color: 'red',
            },
            md: {
                color: 'green',
            },
            lg: {
                color: 'yellow',
            },
            xl: {
                color: 'purple',
            },
            hd: {
                color: 'orange'
            }
        }, {
            direction: 'max',
        });

        expect(responsiveStyle).toMatchObject({
            '@media (max-width: 580px)': {
                color: 'red',
            },
            '@media (max-width: 768px)': {
                color: 'green',
            },
            '@media (max-width: 1024px)': {
                color: 'yellow',
            },
            '@media (max-width: 1280px)': {
                color: 'purple',
            },
            '@media (max-width: 1920px)': {
                color: 'orange',
            },
        });
    });
});