# カナ文字を法則で数値に変換するアプリ

| ヨ | キ | ク | ラ | シ | コ | レ | ツ | ト | メ |
|---|---|---|---|---|---|---|---|---|---|
| 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 0 |

カナの他に数字の2～9と、+が使える。

```plaintext
クラメメメ → 34000

クラメ3 → 34000

クラ+メ3 → 34000

クラ+シメ3 → 5034 ※5000 + 34
```

***

ここからは覚書

## reactのjsxをテストするために入れる

```plaintext
@testing-library/jest-dom
@testing-library/react
@testing-library/user-event
```

## prettierを使ってhtmlに記述したtailwindcssのクラス名の並び順を整える

```plaintext
  prettier-plugin-tailwindcss
  ```

  prettierrc.jsのpluginsに取り込む。

## stylelintとprettierの競合対策

```plaintext
stylelint-prettier
```

pluginsとrulesに取り込む

## eslintとprettierの競合対策

```plaintext
eslint-config-prettier
```

eslint.config.jsのextendsに取り込む。

## 入れておくと良いVSCode機能拡張

```plaintext
Tailwind CSS IntelliSense
```

### 補足

stylelintで@themeルールを無視すれば

```plaintext
"rules": {
    "prettier/prettier": true,
    "at-rule-no-unknown": [
      true,
      {
        "ignoreAtRules": [
          "theme"
        ]
      }
    ]
  }
```

```shell
\ npx stylelint src/App.css
```

ではエラーにはならないが、
VSCodeでは依然としてエラーが出るので

./.vscode/settings.jsonに記述

```plaintext
{
  "files.associations": {
    "*.css": "tailwindcss"
  }
}
```

これでエラーにならなくなる。

## Tailwindcssでブレイクポイントを追加する

```javascript
tailwind.config.jsに追記

import { defaultTheme } from 'tailwindcss/defaultTheme';

export default {
  ...
  theme: {
    screens: {
      'xs': '375px',
      ...defaultTheme.screens,
    }
  }
}
```

## SCSSを導入したので追記

```shell
npm i -D sass-embedded postcss-scss stylelint-scss stylelint-config-standard-scss
```

### 変更

```javascript
.stylelintrc.js

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
  ...
  "rules": {
    "prettier/prettier": true,
    "at-rule-no-unknown": null,
    "scss/at-rule-no-unknown": [true,{
      "ignoreAtRules": ["theme", "use", "forward"]
    }]
  }
```

./.vscode/settings.json
VSCodeのStylelintでscssファイル内でtailwindcssの@themeがエラーだと言われるので。

```json
{
  "files.associations": {
    "*.css": "tailwindcss",
    "*.scss": "tailwindcss"
  },
}
```

## vite.config.jsの設定

### SCSSの使用

### ライセンス情報を外部ファイル化

### 本番環境でconsole.logを消す

### 本番環境でSourcesmapを有効にする

```javascript

// vite.config.ts
import license from 'rollup-plugin-license'; // ライセンス情報を外部ファイル化
import path from 'node:path';


export default defineConfig( ( { mode } ) => {

  return {
    plugins: [
      react(),
      tailwindcss(),
    ],
    // other configuration
    css: { // SCSSを使う設定
      devSourcemap: true,
      preprocessorOptions: {
        scss: 'modern-compiler',
      }
    },
    esbuild: {
      banner: '/*! licenses: /assets/vendor.LICENSE.txt */',
      legalComments: 'external',
      pure: mode === 'production' ? [ 'console.log' ] : []
    },
    build: {
      sourcemap: true,
      rollupOptions: {
        plugins: [
          license( {
            sourcemap: true,
            thirdParty: {
              includePrivate: true,
              multipleVersions: true,
              output: {
                file: path.join(__dirname, 'dist', 'assets', 'vendor.LICENSE.txt'),
                encoding: 'utf-8'
              }
            }
          } ),
        ]
      }
    }
  };
} );
```

## より厳格なチェックをするためESLintに下記を追加

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```
