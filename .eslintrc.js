module.exports = {
    "extends": ["eslint:recommended", "airbnb"],
    "parserOptions": {
        "ecmaVersion": 6,
        "ecmaFeatures": {
            "jsx": true
        },
        "sourceType": "module"
    },
    "env": {
        "browser": true,
        "node": true
    },
    "plugins": [
        "react"
    ],
    "rules": {
        "no-console": 0,
        "new-cap": 0,
        "strict": 0,
        "no-underscore-dangle": 0,
        "no-use-before-define": 0,
        "eol-last": 0,
        "jsx-quotes": 1,
        "react/jsx-no-undef": 1,
        "react/jsx-uses-react": 1,
        "react/jsx-uses-vars": 1,
        //semi: [2, "always"],
        "indent": 0,
        "comma-dangle": [2, "never"],
        "keyword-spacing": 0,
        "quotes": 0,
        "space-before-blocks": 0,
        "no-var": 0,
        "spaced-comment": 0,
        "prefer-template": 0,
        "quote-props": 0,
        "react/prefer-es6-class": 0,
        "max-len": [2, 120, 4],
        "padded-blocks": 0,
        "react/sort-comp": 0,
        "react/jsx-indent-props": [2, 8],
        "vars-on-top": 0,
        "no-param-reassign": 0
    }
};
