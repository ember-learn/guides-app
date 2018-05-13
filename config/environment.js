'use strict';

module.exports = function(environment) {
  let ENV = {
    modulePrefix: 'guides-app',
    environment,
    rootURL: '/',
    locationType: 'trailing-history',
    historySupportMiddleware: true,
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    },

    fastboot: {
      hostWhitelist: [/^[\w-]+\.herokuapp\.com$/, /^localhost:\d+$/, /^127\.0\.0\.1:\d+$/, /^[\w-]+\.fastly\.net$/]
    },

    showdown: {
      ghCompatibleHeaderId: true,
      prefixHeaderId: 'toc_'
    },

    'ember-body-class': {
      includeRouteName: false
    },

    'ember-algolia': {
      algoliaId: 'BH4D9OD16A',
      algoliaKey: '760969ef081fcadc7e0e60faefdb0907'
    },
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
    ENV.APP.autoboot = false;
  }

  if (environment === 'production') {
    // here you can enable a production-specific feature
  }

  return ENV;
};
