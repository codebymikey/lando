'use strict';

const _ = require('lodash');
const path = require('path');
const utils = require('./../lib/utils');

// Helper to handle options
const handleOpts = options => {
  if (!_.isEmpty(options.services)) return {services: options.services};
  else return {};
};

module.exports = lando => {
  const chalk = lando.node.chalk;
  const table = lando.cli.makeTable();
  return {
    command: 'rebuild',
    describe: 'Rebuilds your app from scratch, preserving data',
    options: {
      services: {
        describe: 'Rebuild only the specified services',
        alias: ['s'],
        array: true,
      },
      yes: utils.buildConfirm('Are you sure you want to rebuild?'),
    },
    run: options => {
      if (!options.yes) {
        console.log(chalk.yellow('Rebuild aborted'));
        return;
      }
      // Try to get our app
      const app = lando.getApp(path.resolve(process.cwd(), lando.config.landoFile));
      app.opts = handleOpts(options);
      // Message
      console.log(chalk.green('Rising anew like a fire phoenix from the ashes! Rebuilding app...'));
      // Rebuild the app
      if (app) return utils.appToggle(app, 'rebuild', table, lando.cli.makeArt());
    },
  };
};