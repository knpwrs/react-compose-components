# react-compose-components

[![Dependency Status](https://img.shields.io/david/knpwrs/react-compose-components.svg)](https://david-dm.org/knpwrs/react-compose-components)
[![devDependency Status](https://img.shields.io/david/dev/knpwrs/react-compose-components.svg)](https://david-dm.org/knpwrs/react-compose-components#info=devDependencies)
[![Greenkeeper badge](https://badges.greenkeeper.io/knpwrs/react-compose-components.svg)](https://greenkeeper.io/)
[![Build Status](https://img.shields.io/travis/knpwrs/react-compose-components.svg)](https://travis-ci.org/knpwrs/react-compose-components)
[![Npm Version](https://img.shields.io/npm/v/react-compose-components.svg)](https://www.npmjs.com/package/react-compose-components)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![Badges](https://img.shields.io/badge/badges-8-orange.svg)](http://shields.io/)

A utility to flatten component pyramids in React.

## Installation

```
npm i react-compose-components
```

## Inspiration and Usage

If you have ever worked on a large-scale React application you are probably
familiar with what I refer to as a "provider pyramid." Consider an application
that uses [`react`], [`redux`], [`glamorous`], [`react-i18next`],
[`react-instantsearch`] (Algolia), [`react-router`], and perhaps some internal
providers. You could have a root component that looks something like this:

```jsx
// ...
export default () => (
  <Router history={history}>
    <ThemeProvider theme={theme}>
      <I18nextProvider i18n={i18n}>
        <ReduxProvider store={store}>
          <InternalProvider1>
            <InternalProvider2>
              <App />
            </InternalProvider2>
          </InternalProvider1>
        </ReduxProvider>
      </I18nextProvider>
    </ThemeProvider>
  </Router>
);
```

With this library, you can do the following:

```jsx
import Compose from 'react-compose-components';
//..
export default () => (
  <Compose
    components={[
      [Router, { history }],
      [ThemeProvider, { theme }]
      [ReduxProvider, { store }]
      InternalProvider1,
      InternalProvider2,
      App,
    ]}
  />
);
```

This flattens the pyramid leading to better maintainability and cleaner VCS diffs.

The `Compose` component also accepts children:

```jsx
import Compose from 'react-compose-components';
//..
export default () => (
  <Compose
    components={[
      [Router, { history }],
      [ThemeProvider, { theme }]
      [ReduxProvider, { store }]
      InternalProvider1,
      InternalProvider2,
    ]}
  >
    <App />
  </Compose>
);
```

## API

This package has one default export, a component called `Compose`. `Compose`
requires a single prop, `components`. `components` is an array of any of the
following:

* A React component.
* A string (tag name such as `'div'`).
* A two-element array where the first element is either a React component or a
  string, and the second element is an object representing props to pass to the
  component.

## TypeScript

This package is written in TypeScript and ships with built-in typings.

## License

**MIT**

[`react`]: https://reactjs.org/ "React - A JavaScript Library for Building User Interfaces"
[`redux`]: https://redux.js.org/ "A Predictable State Container for JavaScript Apps"
[`glamorous`]: https://glamorous.rocks/ "glamorous - React Component Styling Solved 💄"
[`react-i18next`]: https://react.i18next.com/ "An Internationalization Addon for React.js"
[`react-instantsearch`]: https://community.algolia.com/react-instantsearch/ "Lightning-Fast Search for React Apps"
[`react-router`]: https://reacttraining.com/react-router/ "Declarative Routing for React.js"
