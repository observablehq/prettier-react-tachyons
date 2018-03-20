## @observablehq/prettier-react-tachyons

A [prettier](https://prettier.io/) custom [parser plugin](https://prettier.io/docs/en/api.html#custom-parser-api)
for users of React and tachyons. It adds an extra prettier transform for `className=`
attributes on JSX elements, that takes care of the following:

- Eliminating redundant classes
- Sorting classes in a predictable order

### How do you use it?

This is admittedly a little bleeding-edge: prettier supports custom parsers,
but not custom rules / reformatters, so this essentially augments prettier's
`babylon`-based parser for JavaScript. You can configure prettier to point to it
with the `parser` option. For instance, here's how we configure prettier in our
`.prettierrc`:

```json
{
  "parser": "./node_modules/@observablehq/prettier-react-tachyons"
}
```

### Example:

in:

    <div className='h1 h1 w2 pv2 bg-transparent red' />

out:

    <div className='w2 h1 pv2 red bg-transparent' />
