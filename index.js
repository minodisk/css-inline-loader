'use strict'

const css = require('css')
const camelCase = require('lodash.camelcase')
const upperFirst = require('lodash.upperfirst')
const loaderUtils = require('loader-utils')

// Capitalize vendor prefixes other than ms
const rVendorPrefix = /^-(?:webkit|moz|o)-/
const upperCamelCase = str => upperFirst(camelCase(str))
const capitalizePropertyName = name => rVendorPrefix.test(name) ? upperCamelCase(name) : camelCase(name)

const transform = (content, camelCaseKeys) => {
  return css.parse(content).stylesheet.rules
    .filter(({ type }) => type === 'rule')
    .reduce((styles, { selectors, declarations }) => {
      const styling = declarations
        .filter(({ type }) => type === 'declaration')
        .reduce((style, { property, value }) => {
          style[capitalizePropertyName(property)] = value
          return style
        }, {})
      selectors.forEach((camelCaseKeys) ?
        selector => styles[camelCase(selector)] = styling
        :
        selector => styles[selector.replace(/^\./, '')] = styling
      )
      return styles
    }, {})
}

const wrap = styles => `module.exports = ${JSON.stringify(styles)};`

module.exports = function loader (content) {
  if (this.cacheable) this.cacheable()
  const query = loaderUtils.parseQuery(this.query)
  const camelCaseKeys = query.camelCase || query.camelcase
  return wrap(transform(content, camelCaseKeys))
}
