# css-inline-loader [![CircleCI](https://circleci.com/gh/minodisk/css-inline-loader.svg?style=svg)](https://circleci.com/gh/minodisk/css-inline-loader)

A loader for webpack that transforms CSS to JavaScript object.

## Install

`npm install -D css-inline-loader`

## Usage

webpack.config.js:

```js
module.exports = {
  module: {
    loaders: [
      {
        test: /\.css$/,
        loaders: [
          'css-inline'
        ]
      }
    ]
  }
}
```

example.css:

```css
.foo {
  background-color: #FF0000;
}
```

example.js

```jsx
var styles = require('./example.css')

console.log(styles) // -> {
                    //   foo: {
                    //     backgroundColor: '#FF0000'
                    //   }
                    // }

class MyComponent extends React.Component {
  render () => {
    return (
      <div style={styles.foo}></div>
    )
  }
}
```

## Options

### `?camelCase`

Convert key from any format to camel case.

webpack.config.js:

```js
module.exports = {
  module: {
    loaders: [
      {
        test: /\.css$/,
        loaders: [
          'css-inline?camelCase'
        ]
      }
    ]
  }
}
```

example.css:

```css
.foo-bar {
  background-color: #FF0000;
}
```

example.js

```jsx
var styles = require('./example.css')

console.log(styles) // -> {
                    //   fooBar: {
                    //     backgroundColor: '#FF0000'
                    //   }
                    // }

class MyComponent extends React.Component {
  render () => {
    return (
      <div style={styles.fooBar}></div>
    )
  }
}
```
