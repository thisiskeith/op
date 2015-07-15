'use strict';

var oboe = require('oboe');

function op(data) {

    if (typeof data !== "object") {
        throw new Error('data is undefined');
    }

    let statusCode;
    let xhrObj = {
            url: data.url,
            method: data.method || 'GET',
            cached: data.cached || true,
            withCredentials: data.withCredentials || false
        };

    // Headers
    if (data.headers) {
        xhrObj.headers = data.headers;
    }

    // Body
    if (data.body) {
        xhrObj.body = data.body;
    }

    let promise = new Promise(function (resolve, reject) {

        oboe(xhrObj)
            .start(function (status) { statusCode = status; })
            .done(function (payload) {

                if (data.callback) {
                    payload = data.callback(payload);
                }

                payload.statusCode = status;

                resolve(payload);
            })
            .fail(function (errorReport) { reject(errorReport); });
    });

    return promise;
}

module.exports = op;

