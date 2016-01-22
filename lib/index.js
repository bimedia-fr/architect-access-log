/*jslint node : true, nomen: true, plusplus: true, vars: true, eqeq: true,*/
"use strict";

var accesslog = require('access-log');

module.exports = function setup(options, imports, register) {

    var rest = imports.rest;
    var logger = imports.log;

    var log = logger.getLogger(options.name || 'http');
    rest.pre(function (req, res, next) {
        accesslog(req, res, options.fmt, log[options.level || 'info'].bind(log));
        next();
    });
    register();
};

module.exports.consumes = ['rest', 'log'];
