if (__ENVIRONMENT__ === 'production') {
  module.exports = require('./production')
} else if (__ENVIRONMENT__ === 'develop') {
  module.exports = require('./develop')
} else {
  module.exports = require('./default')
}
