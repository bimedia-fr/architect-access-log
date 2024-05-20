/*jslint node : true, nomen: true, plusplus: true, vars: true, eqeq: true,*/
"use strict";

var accesslog = require('access-log');

module.exports = function setup(options, imports, register) {

    var rest = imports.rest;
    var logger = imports.log;

    options.filters = options.filters || [];

    var log = logger.getLogger(options.name || 'http');
    const handler = log[options.level || 'info'].bind(log);
    const ops = {
        format : options.fmt || options.format
    };
    if (options.userID) {
        ops.userID = options.userID;
    }
    rest.use(function (req, res, next) {
        if (options.filters.indexOf(req.url) > -1) {
            return next();
        }
        accesslog(req, res, ops, handler);
        next();
    });
    register();
};

module.exports.consumes = ['rest', 'log'];
