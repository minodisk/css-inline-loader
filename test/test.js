require('should')
const fs = require('fs')
const path = require('path')
const requireFromString = require('require-from-string')
const loader = require('..')

describe('default options', () => {
  const ROOT = path.join(__dirname, 'default')
  fs
    .readdirSync(ROOT)
    .forEach(dirname => {
      const absDirname = path.join(ROOT, dirname)
      describe(dirname, () => {
        it('should load input.css as output.js', () => {
          const input = fs.readFileSync(path.join(absDirname, 'input.css'), 'utf8')
          requireFromString(loader.call({}, input)).should.deepEqual(require(path.join(absDirname, 'output.js')))
        })
      })
    })
})

describe('camel case options', () => {
  const ROOT = path.join(__dirname, 'camelcase')
  fs
    .readdirSync(ROOT)
    .forEach(dirname => {
      const absDirname = path.join(ROOT, dirname)
      describe(dirname, () => {
        it('should load input.css as output.js', () => {
          const input = fs.readFileSync(path.join(absDirname, 'input.css'), 'utf8')
          requireFromString(loader.call({query: '?camelCase'}, input)).should.deepEqual(require(path.join(absDirname, 'output.js')))
        })
      })
    })
})
