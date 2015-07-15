'use strict';

var oboe = require('oboe');

export default function op(data) {

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

    let promise = new Promise((resolve, reject) => {

        oboe(xhrObj)
            .start(status) => statusCode = status)
            .done((payload) => {

                if (data.callback) {
                    payload = data.callback(payload);
                }

                payload.statusCode = status;

                resolve(payload);
            })
            .fail((errorReport) => {
                reject(errorReport);
            });
    });

    return promise;
}

