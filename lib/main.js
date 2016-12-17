'use strict'

const oboe = require('oboe')

function op (data) {

    if (typeof data !== "object") {
        throw new Error('data is undefined')
    }

    var xhrObj = {
        url: data.url,
        method: data.method || 'GET',
        cached: typeof data.cached !== 'undefined' ? data.cached : true,
        withCredentials: data.withCredentials || false
    }

    // Headers
    if (data.headers) {
        xhrObj.headers = data.headers
    }

    // Body
    if (data.body) {
        xhrObj.body = data.body
    }

    var promise = new Promise(function (resolve, reject) {

        oboe(xhrObj)
            .done(function (payload) {

                if (data.callback) {
                    payload = data.callback(payload)
                }

                resolve(payload)
            })
            .fail(function (errorReport) {
                reject(errorReport)
            })
    })

    return promise
}

module.exports = op
