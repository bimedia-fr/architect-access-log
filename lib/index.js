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
        let test = false;
        if(options.filters) {
            options.filters.some(function (r) {
                let reg = new RegExp('^' + r.replace('/', '\\/').replace('*', '.*') + '$');
                if(reg.test(req.url)) {
                    test = true;
                };
            });
        }

        if(test)
            return next();

        accesslog(req, res, ops, handler);
        next();
    });
    register();
};

module.exports.consumes = ['rest', 'log'];
