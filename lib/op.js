'use strict';

const oboe = require('oboe');

function op(data) {

    if (typeof data !== "object") {
        throw new Error('data is undefined');
    }

    const xhrObj = {
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

    const promise = new Promise((resolve, reject) => {

        oboe(xhrObj)
            .done((payload) => {

                if (data.callback) {
                    payload = data.callback(payload);
                }

                resolve(payload);
            })
            .fail((errorReport) => reject(errorReport));
    });

    return promise;
}

module.exports = op;

