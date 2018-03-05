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
];

const directions = "hvatlbr".split("");

// display, position, dimension, measure, flex, padding, margin, negative margin, font
// font size, font weight, line height, whitespace, color, opacity, background,
// hover background, border, border color,
// border radius
let order = [
  /^(dn|di|db|dib|dit|dt|dtc|flex)/,
  /^(static|relative|absolute|fixed)/,
  /^(top|right|bottom|left)-/,
  /^measure/,
  /^w\d/,
  /^mw\d/,
  /^h\d/,
  /^center/,
  /^v-(mid|top|btm)/,
  /^(content|items|self|justify|order)/,
  ...directions.map(d => new RegExp(`^p${d}\\d`)),
  ...directions.map(d => new RegExp(`^m${d}\\d`)),
  ...directions.map(d => new RegExp(`^n${d}\\d`)),
  /^(code|sans-serif|serif)/,
  /^f\d/,
  /^fw\d/,
  /^lh-/,
  /^(ws-normal|nowrap|pre)/,
  /^t[lrcj]/,
  /^(underline|no-underline|strike|ttu|ttc|ttl)/,
  new RegExp(`^(${colors.join("|")})`),
  new RegExp(`^(${colors.map(c => `hover-${c}`).join("|")})`),
  /^o\d/,
  /^bg-/,
  /^hover-bg-/,
  ...directions.map(d => new RegExp(`^b${d}$`)),
  /^b--/,
  /^br[\d-]/
];

function weight(c) {
  for (let i = 0; i < order.length; i++) {
    if (order[i].test(c)) return i;
  }
  return Infinity;
}

module.exports = function(text, { babylon }) {
  const traverse = require("babel-traverse").default;
  const ast = babylon(text);

  traverse(ast, {
    JSXAttribute({ node }) {
      if (
        node.name &&
        node.name.name == "className" &&
        node.value.type == "StringLiteral"
      ) {
        node.value.extra.raw = `"${Array.from(
          new Set(node.value.value.split(/\s+/)),
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
