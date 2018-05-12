#!/usr/bin/env node
'use strict';

/* eslint-env node */
const FastBootAppServer = require('fastboot-app-server');
const ExpressHTTPServer = require('fastboot-app-server/src/express-http-server');
const parseArgs = require('minimist');
const express = require('express');
const { URL } = require('url');

// Provide a title to the process in `ps`
process.title = 'ember-fastboot-server';

let argOptions = {
  default: { port: 3000, host: '::' }
};

let options = parseArgs(process.argv.slice(2), argOptions);
let distPath = options._[0];

if (!distPath) {
  console.error(
    `You must call ember-fastboot with the path of a fastboot-dist directory:
     ember-fastboot fastboot-dist`
  );
  process.exit(1);
}

const serverOptions = {
  distPath,
  gzip: false, // Let Fastly take care of compression, reducing load on the fastboot
};

const httpServer = new ExpressHTTPServer(serverOptions);

const app = httpServer.app;

app.use(express.static(distPath, {
  setHeaders(res) {
    res.setHeader('Cache-Control', 'public, max-age=3600');
    res.removeHeader('X-Powered-By');
  }
}));

app.use(function redirectForCurrentPath(req, res, next) {

  if (req.originalUrl.indexOf('/current/') !== -1) {
    return res.redirect(301, req.originalUrl.replace('/current/', '/release/'));
  }
  next();
});

let server = new FastBootAppServer(Object.assign({ httpServer }, serverOptions));

server.start();
