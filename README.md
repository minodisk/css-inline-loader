# css-inline-loader

CSS inline loader for Webpack

## Install

`npm install -D css-inline-loader`

## Usage

webpack.config.js:

```js
module: {
  loaders: [{
      test: /\.css$/,
      loaders: [
        'inline',
        'css'
      ],
      exclude: /node_modules/
    }
  ]
}
```

example.css:

```css
.foo {
  background-color: #ff0000;
}
```

example.js

```js
var styles = require('./example.css');
console.log(styles);  // -> {
                      //   foo: {
                      //     backgroundColor: '#ff0000'
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
module: {
  loaders: [{
      test: /\.css$/,
      loaders: [
        'inline?camelCase',
        'css'
      ],
      exclude: /node_modules/
    }
  ]
}
```

example.css:

```css
.foo-bar {
  background-color: #ff0000;
}
```

example.js

```js
var styles = require('./example.css');
console.log(styles);  // -> {
                      //   fooBar: {
                      //     backgroundColor: '#ff0000'
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
