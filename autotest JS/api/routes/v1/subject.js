'use strict';

let express = require('express');
let router = express.Router();
let auth = require('../../lib/auth');
let subject = require('../../model/subject');


/**
 * @api {get} /APIv1/subject/list Request list of subjects
 * @apiName GetSubjectList
 * @apiGroup Subject
 * @apiVersion 1.0.0
 *
 * @apiSuccess (200) {Object[]} subjects
 * @apiSuccess (200) {Number} subjects.id
 * @apiSuccess (200) {String} subjects.name
 * @apiSuccess (200) {String} subjects.abbr
 *
 * @apiSuccessExample {json} Success-Response:
[
    {"id": 359, "name": "Теория сложности вычислений", "abbr": "Теор сложности" },
    {"id": 362, "name": "Теория функций действительного и комплексного переменного", "abbr": "" }
]
 */
router.get('/list', (req, res, next) => {
    subject.list((err, data) => {
        if (err) {
            next(err);
            return;
        }

        res.send(data.rows);
    });
});

/**
 * @api {put} /APIv1/subject Add new subject
 * @apiName AddSubject
 * @apiGroup Subject
 * @apiVersion 1.0.0
 *
 * @apiPermission manager (add "APIKey" to query string)
 *
 * @apiParam {String} name
 * @apiParam {String} abbr
 *  
 * @apiSuccess (200) {Number} id
 */
router.put('/', (req, res, next) => {
    auth.checkRights(req, res);

    let info = req.body;

    subject.add(info, (err, data) => {
        if (err) {
            next(err);
            return;
        }

        res.send(data.rows[0]);
    });
});

router.delete('/:subjectID', (req, res, next) => {
    auth.checkRights(req, res);

    let info = req.params.subjectID;

    subject.del(info, (err, data) => {
        if (err || !data.rows) {
            next(err);
            return;
        }

        res.send(data.rows[0]);

    });
});

router.post('/:subjectID', (req, res, next) => {
    auth.checkRights(req, res);

    let info = [ req.params.subjectID, req.body ];

    subject.upd(info[0], info[1], (err, data) => {
        if (err || !data.rows) {
            next(err);
            return;
        }

        res.send(data.rows[0]);

    });
});

module.exports = router;
