const shades = ["05", "10", "20", "30", "40", "50", "60", "70", "80", "90"];
const colors = [
  "black",
  "near-black",
  "dark-gray",
  "mid-gray",
  "gray",
  "silver",
  "light-silver",
  "moon-gray",
  "light-gray",
  "near-white",
  "white",
  "dark-red",
  "red",
  "light-red",
  "orange",
  "gold",
  "yellow",
  "light-yellow",
  "purple",
  "light-purple",
  "dark-pink",
  "hot-pink",
  "pink",
  "light-pink",
  "dark-green",
  "green",
  "light-green",
  "navy",
  "dark-blue",
  "blue",
  "light-blue",
  "lightest-blue",
  "washed-blue",
  "washed-green",
  "washed-yellow",
  "washed-red"
]
  .concat(shades.map(s => `black-${s}`))
  .concat(shades.map(s => `white-${s}`));

const directions = "hvatlbr".split("");

// display, position, dimension, measure, flex, padding, margin, negative margin, font
// font size, font weight, line height, whitespace, color, opacity, background,
// hover background, border, border color,
// border radius
let order = [
  "(dn|di|db|dib|dit|dt|dtc|flex|inline-flex)",
  "(static|relative|absolute|fixed)",
  "(top|right|bottom|left)-\\d+",

  "measure",
  "measure-wide",
  "measure-narrow",
  "indent",
  "small-caps",
  "truncate",

  "w-?\\d+",
  "mw\\d+",
  "h\\d+",
  "center",
  "v-(base|mid|top|btm)",
  "(content|items|self|justify|order)",
  ...["l", "r", "n"].map(d => `f${d}`),
  ...directions.map(d => `p${d}\\d`),
  ...directions.map(d => `m${d}\\d`),
  ...directions.map(d => `n${d}\\d`),
  "(code|sans-serif|serif)",
  "f\\d",
  "fw\\d",
  "lh-w+",
  "(ws-normal|nowrap|pre)",
  "t[lrcj]",
  "(underline|no-underline|strike|ttu|ttc|ttl)",
  `(${colors.join("|")})`,
  `(${colors.map(c => `hover-${c}`).join("|")})`,
  "o\\d+",
  `(${colors.map(c => `bg-${c}`).join("|")})`,
  `(${colors.map(c => `hover-bg-${c}`).join("|")})`,
  ...directions.map(d => `b${d}$`),
  `(${colors.map(c => `b--${c}`).join("|")})`,
  "br[\\d-]"
].reduce((memo, re) => {
  return memo
    .concat(
      ["ns", "m", "l"].map(mq => {
        return new RegExp(`^${re}-${mq}$`);
      })
    )
    .concat(new RegExp(`^${re}$`));
}, []);

function weight(c) {
  for (let i = 0; i < order.length; i++) {
    if (order[i].test(c)) return i;
  }
  return Infinity;
}

module.exports = function(text, parsers) {
  const toBabel = require('estree-to-babel')
  const traverse = require("@babel/traverse").default;

  const ast = toBabel(parsers.typescript(text));

  traverse(ast, {
    JSXAttribute({ node }) {
      if (
        node.name &&
        node.name.name == "className" &&
        node.value.type == "StringLiteral"
      ) {
        node.value.raw = `"${Array.from(
          new Set(node.value.value.split(/\s+/).filter(Boolean)),
          (c, i) => [c, weight(c), i]
        )
          .sort(
            (left, right) =>
              left[1] !== right[1] ? left[1] - right[1] : left[2] - right[2]
          )
          .map(c => c[0])
          .join(" ")}"`;
      }
    }
  });
  return ast;
};
