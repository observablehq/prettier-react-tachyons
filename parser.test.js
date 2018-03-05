const prettier = require("prettier");
const parser = require("./parser");

test("reformatting examples", () => {
  expect(
    prettier.format(`<div className='h1 h1 w2 pv2 bg-transparent red' />`, {
      parser
    })
  ).toMatchSnapshot();
  expect(
    prettier.format(`<div className='unknown pv2 ph2' />`, {
      parser
    })
  ).toMatchSnapshot();
  expect(
    prettier.format(
      `<div className='dib pa2 mr3 black-50 hover-black bg-white ba b--black-30 br2 pointer' />`,
      {
        parser
      }
    )
  ).toMatchSnapshot();
});
