module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  ignorePatterns: ["rollup.config.js"],
  overrides: [
    {
      files: ["*.ts", "*.tsx"],
      extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:react/recommended",
        "plugin:react-hooks/recommended",
        "plugin:prettier/recommended",
      ],
      parser: "@typescript-eslint/parser",
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        ecmaVersion: 12,
        sourceType: "module",
        project: "./tsconfig.json",
      },
      plugins: [
        "react",
        "@typescript-eslint",
        "prettier",
        "simple-import-sort",
        "unused-imports",
      ],
      rules: {
        "react/react-in-jsx-scope": "off",
        "@typescript-eslint/explicit-module-boundary-types": "off",
        "@typescript-eslint/no-unused-vars": "off", // Replaced by unused-imports/no-unused-vars
        "@typescript-eslint/no-explicit-any": "off",
        "prettier/prettier": "error",

        // Import organization rules
        "simple-import-sort/imports": [
          "error",
          {
            groups: [
              // React first
              ["^react$", "^react/"],
              // External packages
              ["^@?\\w"],
              // Internal packages (relative imports starting with . or ..)
              ["^\\u0000"],
              ["^\\.\\.(?!/?$)", "^\\.\\./?$"],
              ["^\\./(?=.*/)(?!/?$)", "^\\.(?!/?$)", "^\\./?$"],
              // Style imports last
              ["^.+\\.s?css$"],
            ],
          },
        ],
        "simple-import-sort/exports": "error",
        "unused-imports/no-unused-imports": "error",
        "unused-imports/no-unused-vars": [
          "warn",
          {
            vars: "all",
            varsIgnorePattern: "^_",
            args: "after-used",
            argsIgnorePattern: "^_",
          },
        ],
      },
      settings: {
        react: {
          version: "detect",
        },
      },
    },
    {
      files: ["*.js"],
      extends: ["eslint:recommended", "plugin:prettier/recommended"],
      parserOptions: {
        ecmaVersion: 12,
        sourceType: "module",
      },
    },
  ],
};
