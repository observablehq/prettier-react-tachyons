## @observablehq/prettier-react-tachyons

A [prettier](https://prettier.io/) custom [parser plugin](https://prettier.io/docs/en/api.html#custom-parser-api)
for users of React and tachyons. It adds an extra prettier transform for `className=`
attributes on JSX elements, that takes care of the following:

- Eliminating redundant classes
- Sorting classes in a predictable order

### Example:

in:

    <div className='h1 h1 w2 pv2 bg-transparent red' />

out:

    <div className='w2 h1 pv2 red bg-transparent' />
