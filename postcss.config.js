const tailwindcss = require("tailwindcss");
const purgecss = require("@fullhuman/postcss-purgecss");

module.exports = {
    plugins: [
        tailwindcss,
        // @ts-ignore
        ...(process.env.NODE_ENV === "production"
            ? [
                  // @ts-ignore
                  purgecss({
                      content: [
                          "**/*.html",
                          "components/**/*.vue",
                          "components/**/*.tsx",
                      ],
                      defaultExtractor: (content) =>
                          content.match(/[\w-:/]+(?<!:)/g) || [],
                  }),
              ]
            : []),
    ],
};
