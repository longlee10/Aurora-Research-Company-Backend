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
            const results = list.map(survey => ({
                _id: survey._id, 
                name: survey.name, 
                description: survey.description
            }));
            res.status(200).send(results);
        }
    });
}

/* Get a survey item */
module.exports.item = (req, res, next) => {
    Survey.findById(req.body._id, (err, survey) => {
        if(err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(survey);
        }
    });
}

/* Get a survey item (Without answers) */
module.exports.itemWithoutAnswers = (req, res, next) => {
    Survey.findById(req.body._id, (err, survey) => {
        if(err) {
            res.status(500).send(err);
        } else if (survey == null) {
            res.status(500).send({message: "Invalid survey id."});
        } else {
            survey.answers = [];
            res.status(200).send(survey);
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
    Survey.findByIdAndUpdate(req.body._id, {
            name: req.body.name,
            description: req.body.description,
            start_time: req.body.start_time,
            end_time: req.body.end_time,
            questions: req.body.questions
        }, (err, survey) => {
            if (err) {
                res.status(500).send(err);
            } else {
                res.status(200).send({});
            }
    });
}

/* Delete a survey */
module.exports.delete = (req, res, next) => {
    Survey.deleteOne({_id: req.body._id}, (err) => {
        if(err) {
            res.status(500).send(err);
        } else {
            res.status(200).send({});
        }
    });
}

/* Answer a survey */
module.exports.answer = (req, res, next) => {
    Survey.updateOne({ _id: req.body._id}, { $push: {answers: req.body.answer} }, (err, survey) => {
        if(err) {
            res.status(500).send(err);
        } else {
            res.status(200).send({});
        }
    });
}