module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/typescript/recommended",
    "plugin:prettier/recommended",
    "./.eslintrc-auto-import.json"
  ],
  parserOptions: {
    ecmaVersion: 2020
  },
  overrides: [
    {
      files: ["*.ts", "*.tsx", "*.vue"],
      rules: {
        "no-undef": "off"
      }
    }
  ],
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "comma-dangle": "off",
    "@typescript-eslint/comma-dangle": "off", // 末尾没有逗号
    "@typescript-eslint/no-explicit-any": "off", // any可用
    "@typescript-eslint/ban-ts-comment": "off", // @ts-ignore可用
    "@typescript-eslint/no-var-requires": "off", // vue.config.js require引用

    // vue
    "vue/multi-word-component-names": "off",

    // prettier
    "prettier/prettier": ["error", { trailingComma: "none" }]
  }
};
