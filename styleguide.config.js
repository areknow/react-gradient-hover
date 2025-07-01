const path = require("path");

module.exports = {
  title: "React Gradient Hover",
  components: "src/**/*.{ts,tsx}",
  ignore: ["**/*.test.{ts,tsx}", "**/index.ts"],
  skipComponentsWithoutExample: true,
  webpackConfig: {
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          use: {
            loader: "ts-loader",
            options: {
              transpileOnly: true,
            },
          },
        },
        {
          test: /\.scss$/,
          use: ["style-loader", "css-loader", "sass-loader"],
        },
      ],
    },
    resolve: {
      extensions: [".ts", ".tsx", ".js", ".jsx"],
      alias: {
        "react-gradient-hover": path.resolve(__dirname, "src/index.ts"),
      },
    },
    ignoreWarnings: [
      {
        message: /The legacy JS API is deprecated/,
      },
    ],
  },
  sections: [
    {
      name: "Introduction",
      content: "docs/Introduction.md",
    },
    {
      name: "Components",
      components: "src/GradientHover.tsx",
      content: "docs/GradientHover.md",
    },
  ],
  theme: {
    color: {
      link: "#4ecdc4",
      linkHover: "#ff6b6b",
    },
    fontFamily: {
      base: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
    },
  },
  styles: {
    Playground: {
      preview: {
        padding: "20px",
        backgroundColor: "#f5f5f5",
        borderRadius: "8px",
      },
    },
  },
};
