const tailwindcss = require("tailwindcss");
const purgecss = require("@fullhuman/postcss-purgecss")({
  content: ["./public/**/*.html", "./src/**/*.vue", "./src/**/*.tsx"],
  options: {
    whitelistPatterns: [
      /-(leave|enter|appear)(|-(to|from|active))$/,
      /^(?!(|.*?:)cursor-move).+-move$/,
      /^router-link(|-exact)-active$/,
      /tooltip/,
      /popover/,
      /notification/
    ]
  }
});

module.exports = {
  plugins: [
    tailwindcss,
    ...(process.env.NODE_ENV === "production" ? [purgecss] : [])
  ]
};
