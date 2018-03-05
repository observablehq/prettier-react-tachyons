## @observablehq/prettier-react-tachyons

A [prettier](https://prettier.io/) custom [parser plugin](https://prettier.io/docs/en/api.html#custom-parser-api)
for users of React and tachyons. It adds an extra prettier transform for `className=`
attributes on JSX elements, that takes care of the following:

- Eliminating redundant classes
- Sorting classes in a predictable order
