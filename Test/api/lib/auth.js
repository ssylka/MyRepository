'use strict';

let authSettings = require('../config/auth');


function checkRights(req, res) {
    if (!getStatus(req, res)) {
        let err = new Error('authentication failed');
        err.status = 418;
        throw err;
    }
}

function getStatus(req, res) {
    return req.query.APIKey === authSettings.apikey;
}

function login(login, pass) {
    return login === authSettings.login && pass === authSettings.pass ? authSettings.apikey : null;
}


module.exports = { checkRights, getStatus, login };
