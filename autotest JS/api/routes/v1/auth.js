'use strict';

let express = require('express');
let router = express.Router();
let auth = require('../../lib/auth');


/**
 * @api {get} /APIv1/auth/status Get auth status
 * @apiName GetAuthStatus
 * @apiGroup Auth
 * @apiVersion 1.0.0
 * 
 * @apiParam {string} APIKey
 *
 * @apiSuccess (200) {String="manager","just user"} status
 *
 * @apiSuccessExample {json} Success-Response:
{ "status": "just user" }
 */
router.get('/status', (req, res) => {
    res.send({
        status: auth.getStatus(req, res) ? 'manager' : 'just user',
    });
});

/**
 * @api {get} /APIv1/auth/login Log In
 * @apiName Login
 * @apiGroup Auth
 * @apiVersion 1.0.0
 *
 * @apiParam {String} login
 * @apiParam {String} pass
 *
 * @apiSuccess (200) {String} APIKey
 *
 * @apiSuccessExample {json} Success-Response:
{ "APIKey": "a94a8fe5ccb19ba61c4c0873d391e987982fbbd3" }
 */
router.get('/login', (req, res) => {
    let login = req.query.login;
    let pass = req.query.pass;

    let apiKey = auth.login(login, pass);

    if (apiKey) {
        res.send({
            APIKey: apiKey,
        });
    } else {
        res.status(403);
    }
});


module.exports = router;
