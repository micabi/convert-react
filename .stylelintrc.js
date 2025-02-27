export default {
  "plugins": [
    "stylelint-scss",
    "stylelint-prettier"
  ],
  "extends": [
    "stylelint-config-standard",
    "stylelint-config-standard-scss",
    "stylelint-config-recess-order",
  ],
  "overrides": [{
    files: ['**/*.scss'],
    customSyntax: 'postcss-scss'
  }],
  "ignoreFiles": [
    'node_modules/**/*',
    'src/index.css',
    'src/App.css',
    'src/baseline.css',
  ],
  "rules": {
    "prettier/prettier": true,
    "declaration-property-value-allowed-list": {
      "width": ["rem", "100%", "/var/"],
      "height": ["rem", "100%", "auto", "/var/"],
      "max-width": ["rem", "%", "/var/"],
      "max-height": ["rem", "%", "/var/"],
      "font-family": ["/var/"],
      "/color/": ["/var/"]
    },
    "selector-class-pattern": null, // kebab-case
    "at-rule-no-unknown": null,
    "scss/at-rule-no-unknown": [
      true,
      {
        "ignoreAtRules": ["theme", "use", "forward"]
      }
    ]
  }
}