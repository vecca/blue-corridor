module.exports = {
  plugins: [
    require("postcss-mixins"),
    require("postcss-import"), // Resolves @import statements
    require("postcss-nested"),
    require("autoprefixer"), // Automatically add vendor prefixes
    require("postcss-simple-vars"), // Enables CSS variables
    require("postcss-preset-env")({
      stage: 1, // Enable Stage 1 CSS features
      features: {
        "nesting-rules": true, // Enable nesting of CSS rules
      },
    }),
  ],
};
