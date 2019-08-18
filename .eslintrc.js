module.exports = {
    root: true,
    env: {
        node: true,
        es6: true,
    },
    extends: [
        "prettier",
        "plugin:prettier/recommended",
        "eslint:recommended",
    ],
    plugins: [
        "prettier",
        "sort-class-members",
    ],
    // add your custom rules here
    rules: {
        "array-bracket-newline": ["error", "consistent"],
        "array-callback-return": "error",
        "array-element-newline": ["error", "consistent"],
        "brace-style": ["error", "1tbs"],
        "curly": ["error", "all"],
        "eol-last": ["error", "always"],
        "eqeqeq": ["error", "always"],
        "lines-between-class-members": ["error", "always"],
        "no-await-in-loop": "error",
        "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
        "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
        "no-mixed-spaces-and-tabs": "error",
        "no-multi-spaces": "error",
        "no-trailing-spaces": "error",
        "no-use-before-define": "error",
    },
    parserOptions: {
        parser: "babel-eslint",
        ecmaVersion: 2017,
        sourceType: "module",
    },
};
