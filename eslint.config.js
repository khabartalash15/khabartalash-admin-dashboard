import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import typescriptParser from "@typescript-eslint/parser";

// Initialize FlatCompat for legacy extends
const compat = new FlatCompat({
  baseDirectory: import.meta.url, // Automatically sets base directory
});

// ESLint Configuration
export default [
  // Use recommended configurations for JavaScript, TypeScript, and React
  ...compat.extends("eslint:recommended", "plugin:react/recommended"),
  ...compat.extends("plugin:@typescript-eslint/recommended"),
  {
    files: ["**/*.{js,jsx,ts,tsx}"], // Target all relevant files
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: "module",
      parser: typescriptParser, // Use TypeScript parser
      globals: globals.browser, // Include browser globals
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      "@typescript-eslint": typescriptEslint,
    },
    rules: {
      // Enable recommended React hooks rules
      ...reactHooks.configs.recommended.rules,
      // Add additional rules
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      "@typescript-eslint/no-unused-vars": "warn", // Warn about unused variables
      "react/react-in-jsx-scope": "off", // React 17+ doesn't require React in scope
      "react/prop-types": "off", // Disable prop-types checking if using TypeScript
    },
  },
];
