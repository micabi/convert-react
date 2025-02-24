export default {
  "extends": [
    "stylelint-config-standard",
    "stylelint-config-recess-order"
  ],
  "plugins": [
    "stylelint-prettier"
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
    "at-rule-no-unknown": [
      true,
      {
        "ignoreAtRules": [
          "theme"
        ]
      }
    ]
  }
}