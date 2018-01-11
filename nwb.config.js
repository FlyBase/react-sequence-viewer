var path = require('path');

module.exports =  {
  type: 'react-component',
  karma: {
    testContext: 'tests.webpack.js',
    testFiles: '.test.js'
  },
  npm: {
    esModules: true,
    umd: {
      global: 'ReactSequenceViewer',
      externals: {
        react: 'React'
      }
    }
  },
};

