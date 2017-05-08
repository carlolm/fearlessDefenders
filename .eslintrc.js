module.exports = {
    "extends": "airbnb",
    "plugins": [
        "react",
        "jsx-a11y",
        "import"
    ],
    rules: {
      "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
      "no-console": [0, { "allow": ["warn", "error"]}],
      "react/forbid-prop-types": [0]
    },
    "env": {
      "browser": true,
      "jest": true
    }
};
