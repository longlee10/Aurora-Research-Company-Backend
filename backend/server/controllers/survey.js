/*******************************
File Name: survey.js
Description: It is the survey controller to do specific actions.
Web app name: Aurora Research Company
Team name: A-Star
Team Members:
  Kuo, Yi-Cheng (301181514)
  Yeung, Lok Ki (301252535)
  Lam, Hing Yu (301257216)
  Chung, Ting Hin (301287013)
  Le, Hoang Long (301236235)
********************************/

// create a reference to the model
const Survey = require('../models/survey');

/* List surveys */
module.exports.list = (req, res, next) => {
    // Filter criteria
    const filter = () => {
        const currentDate = new Date();
        if (req.body.onlyActive) {
            return { start_time: { $lte: currentDate }, end_time: { $gte: currentDate } };
        } else {
            return {};
        }
    };
    // Find results
    Survey.find(filter()).exec((err, list) => {
        if(err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(list);
        }
    });
}

/* Add a survey */
module.exports.add = (req, res, next) => {
    Survey.create(req.body, (err, survey) => {
        if(err) {
            res.status(500).send(err);
        } else {
            res.status(200).send({});
        }
    });
}

/* Update a survey */
module.exports.update = (req, res, next) => {
    Survey.updateOne({_id: req.body._id}, req.body, (err) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send({});
        }
    });
}

/* Delete a survey */
module.exports.delete = (req, res, next) => {
    Survey.remove({_id: req.body._id}, (err) => {
        if(err) {
            res.status(500).send(err);
        } else {
            res.status(200).send({});
        }
    });
}