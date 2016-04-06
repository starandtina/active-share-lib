require('babel-register');

const debug = require('debug')('kit:bin:compile');

debug('Create webpack compiler.');

require('webpack')(
  require('../webpack.config.js'),
  function (err, stats) {
    const jsonStats = stats.toJson();

    debug('Webpack compile completed.');
    debug(stats.toString({
      timings: true,
      reasons: true,
      // modules: true,
      chunks: false,
      chunkModules: false,
      colors: true
    }));

    if (err) {
      debug('Webpack compiler encountered a fatal error.', err);
      process.exit(1);
    } else if (jsonStats.errors.length > 0) {
      debug('Webpack compiler encountered errors.');
      process.exit(1);
    } else if (jsonStats.warnings.length > 0) {
      debug('Webpack compiler encountered warnings.');
      process.exit(1);
    }
  }
);
