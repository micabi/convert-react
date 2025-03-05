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
