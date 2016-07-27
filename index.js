'use strict'

const css = require('css')
const camelCase = require('lodash.camelcase')
const loaderUtils = require('loader-utils')

const transform = (content, camelCaseKeys) => {
  return css
    .parse(content)
    .stylesheet
    .rules
    .filter(({ type }) => type === 'rule')
    .reduce((styles, { selectors, declarations }) => {
      const styling = declarations
        .filter(({ type }) => type === 'declaration')
        .reduce((style, { property, value }) => {
          style[camelCase(property)] = value
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
