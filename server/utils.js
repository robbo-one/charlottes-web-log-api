const camelcaseKeys = require('camelcase-keys')

const toCamelCase = (inputObj) => {
  return camelcaseKeys(inputObj)
}

// const toSnakeCase

module.exports = {
  toCamelCase
}