# React Responsive

A utility package to manage responsive style with styled components in React Js Apps.

## Installation

`yarn add @mongez/react-responsive`

OR

`npm i @mongez/react-responsive`

## Usage

There are two main utilities shipped with this package, `responsive` which is the main utility function and `media` which is another great utility.

Let's see the `response` utility in detail.


## Responsive function

First off, let's see what is the problem that we need to solve here, consider the following snippet

```ts
import { styled } from '@emotion/styled';

export const RedDiv = styled('div')({
  color: 'red',
});
```

The previous code will create a component that contains a red color for its content.

So what if we need to make a color for each breakpoint? let's see.

```ts
import { styled } from '@emotion/styled';

export const RedDiv = styled('div')({
  color: 'yellow',
  '@media (min-width: 768px)': {
    color: 'red',
  },
  '@media (min-width: 1024)': {
    color: 'green',
  },
});
```

So the above code will set the color to eb `yellow` by default, `red` when screen is higher or more and `green` when it's **1024px** or higher.

Now let's add our code.

```ts
import { styled } from '@emotion/styled';
import { responsive } from '@mongez/react-responsive';

export const RedDiv = styled('div')(responsive({
  color: 'yellow',
  md: {
    color: 'red',
  },
  lg: {
    color: 'green',
  },
}));
```

See, that's it!

But from where the `md` and `lg` values are being defined?

Well, this is actually up to you but we've some good features here to help you construct your breakpoints.

Let's set our configurations

```ts
import { styled } from '@emotion/styled';
import { responsive, setResponsiveConfigurations } from '@mongez/react-responsive';

setResponsiveConfigurations({
  breakpoints: {
    xs: 0, // or you can simple work with mobile first concept
    sm: 560,
    md: 768,
    lg: 1024,
    xl: 1280,
    hd: 1920,
  },
  direction: 'min', // `min` or `up`
});

export const RedDiv = styled('div')(responsive({
  color: 'yellow',
  md: {
    color: 'red',
  },
  lg: {
    color: 'green',
  },
}));
```

The previous configurations hold two keys:

- `breakpoints`: is an object that contains the key that will be used in the styled components, and its value is the breakpoint px.
- `direction`: Breakpoint will be used with media query for min width, default is `min`, available values `min` or `max`.

Of course you can use other keywords, for example:

```ts
import { styled } from '@emotion/styled';
import { responsive, setResponsiveConfigurations } from '@mongez/react-responsive';

setResponsiveConfigurations({
  breakpoints: {
    miniPhone: 320,
    phone: 580,
    tablet: 768,
    smallLaptop: 1024,
    laptop: 1280,
    desktop: 1920,
  },
});
```

### Working with R

Alternative name for `responsive` is `R`, you can import it if you're too lazy.


```ts
import { styled } from '@emotion/styled';
import { R } from '@mongez/react-responsive';

export const RedDiv = styled('div')(R({
  color: 'yellow',
  md: {
    color: 'red',
  },
  lg: {
    color: 'green',
  },
}));
```

## Custom Breakpoints For Certain Styled Components

You may create breakpoints for certain styles by passing the breakpoint configurations in the second argument.

```ts
import { styled } from '@emotion/styled';
import { R } from '@mongez/react-responsive';

export const RedDiv = styled('div')(R({
  color: 'yellow',
  iphone: {
    color: 'red',
  },
  xl: {
    color: 'green',
  },
}, {
  breakpoints: {
    iphone: 570,
    xl: 1440,
  }
}));
```

You can also set the direction by setting it in the second argument.

```ts
import { styled } from '@emotion/styled';
import { R } from '@mongez/react-responsive';

export const RedDiv = styled('div')(R({
  color: 'yellow',
  iphone: {
    color: 'red',
  },
  xl: {
    color: 'green',
  },
}, {
  breakpoints: {
    iphone: 570,
    xl: 1440,
  },
  direction: 'max',
}));
```

This will create `@media (max-width: 570px)` for `iphone` and `@media (max-width: 1440)` for `xl` breakpoint.

## Defining Breakpoint Range

Sometimes we may need to make a breakpoint between certain two breakpoints, for example `@media (min-width: 560px) and (max-width: 980px)`

This can be done by defining the breakpoint value as an array.

```ts
import { styled } from '@emotion/styled';
import { responsive, setResponsiveConfigurations } from '@mongez/react-responsive';

setResponsiveConfigurations({
  breakpoints: {
    phone: [0, 580],
    tablet: [581, 768],
  },
});
```

This will enforce that the `phone` breakpoint will be `@media (min-width: 0px) and (max-width: 580px)` and the `tablet` breakpoint will be converted into `@media (min-width: 581px) and (max-width: 768px)`

## Enforcing min or max width

If we want to ignore the value of `direction` for certain breakpoint, we can define the breakpoint value as an array, but without defining one of any of its values.

Let's say we want to set the direction to be `min` but `tablet` breakpoint to be `max`

```ts
setResponsiveConfigurations({
  breakpoints: {
    phone: 0, // min-width
    tablet: [, 768], // max-width
    desktop: 1024, // min-width
  },
  direction: 'min',
});
```

Defining the breakpoint as an array and not setting first element will enforce the breakpoint to be converted into `max-width` only.

This applies in the `min-width` as well.

```ts
setResponsiveConfigurations({
  breakpoints: {
    phone: 0, // max-width
    tablet: [, 768], // min-width
    desktop: 1024, // max-width
  },
  direction: 'max',
});
```

## Defining custom breakpoint

Another way to define breakpoints is by providing a custom breakpoint by setting its value to be **string**, this can be useful when working with print.


```ts
import { styled } from '@emotion/styled';
import { R, setResponsiveConfigurations } from '@mongez/react-responsive';

setResponsiveConfigurations({
  breakpoints: {
    phone: 0, 
    tablet: 768, 
    desktop: 1024,
    print: `@media print` 
  },
  direction: 'max',
});

export const PrintedDiv = styled('div')(R({
  tablet: {
    color: 'red',
  },
  desktop: {
    color: 'green',
  },
  print: {
    background: 'white',
    color: 'black',
  }
}));
```

This will give you more flexibility over your own breakpoints.

## Getting One Media Query

If you don't want to use `responsive` or `R` functions for styling, you can get the corresponding media query for breakpoint using `media` function.


```ts
import { styled } from '@emotion/styled';
import { media, setResponsiveConfigurations } from '@mongez/react-responsive';

// Its recommended to define the configurations in earlier point of your application for example in the src/index.ts or so.
setResponsiveConfigurations({
  breakpoints: {
    phone: 0, 
    tablet: 768, 
    desktop: 1024,
  },
});


export const RedDiv = styled('div')({
  [media('iphone')]: {
    color: 'red',
  },
  [media('tablet')]: {
    color: 'green',
  },
});
```

## Getting all media queries for all breakpoints

Alternative way is to get all breakpoints and its corresponding media queries using `mediaQueries` function.

```ts
import { mediaQueries, setResponsiveConfigurations } from '@mongez/react-responsive';

setResponsiveConfigurations({
  breakpoints: {
    phone: 0, 
    tablet: 768, 
    desktop: 1024,
    hd: 1920,
    '4k': 3810,
  },
});

const breakpoints = mediaQueries();

console.log(breakpoints.hd); // 1920
console.log(breakpoints['4k']); // 3810
```

You can also generate custom breakpoints by passing an argument to `mediaQueries` function with the same object shape as the configurations one.

```ts
import { mediaQueries } from '@mongez/react-responsive';


const breakpoints = mediaQueries({
  breakpoints: {
    sm: 580,
    md: 768,
    lg: 1024,
  }
});

console.log(breakpoints); // {sm: 580, md: 768, lg: 1024} 
```

## Wrap it up

Defining a breakpoint can be one of 5 ways as follows

- `Integer`: will generate a media query with the value of the `direction ` value.
  - `sm: 580` will generate `@media (min-width: 580px)`.
- `[Integer, Integer]`: will generate a media query with range of media query.
  - `sm: [580, 767]` will generate `@media (min-width: 580px) and (max-width: 767px)`.
- `[Integer,]`: will generate a media query for **min** width regardless the value of the `direction`.
  - `sm: [580,]` will generate `@media (min-width: 580px)`.
- `[, Integer]`: will generate a media query for **max** width regardless the value of the `direction`.
  - `sm: [, 767]` will generate `@media (max-width: 7670px)`.
- `string`: will generate a custom media query for regardless the value of the `direction`.
  - `tablet: @media (min-width: 500px) and (max-width: 1000px)` will generate `@media (min-width: 500px) and (max-width: 1000px)`.

## Change Log

- 1.0.0 (21 May 2022)
  - Initial Version