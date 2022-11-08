// create a reference to the model
const Answer = require('../models/answer');
const Survey = require('../models/survey');

/* Answer summary for options */
module.exports.optionSummary = (req, res, next) => {
    const surveyId = req.body.survey_id;
    const questionId = req.body.question_id;

    // Find survey
    Survey.findById(surveyId, (err, survey) => {  
        if (err) {
            res.status(500).send(err);
        } else {
            // Validate if the question type is yes-no
            const question = survey.questions.id(questionId);
            if (question == null) {
                res.status(500).send({ message: 'Invalid question ID.'});
            } else {
                // Find answers
                Answer.find({ survey_id: surveyId }).exec((err, answers) => {
                    if (err) {
                        res.status(500).send(err);
                    } else {
                        // Obtain the initial results
                        const initialResults = Object.assign({}, ...question.options.map((option) => ({[option]: 0})));

                        // Obtain counted results
                        const results = answers
                            .flatMap(answer => answer.responses)
                            .filter(response => response.question_id == questionId)
                            .flatMap(response => response.options)
                            .reduce((acc, option) => {
                                if(option in acc) {
                                    acc[option]++;
                                }
                                return acc;
                            }, initialResults);
                        res.status(200).send(results);
                    }
                });
            }
        }
    });
}

/* Add an answer */
module.exports.add = (req, res, next) => {
    Answer.create(req.body, (err, answer) => {
        if(err) {
            res.status(500).send(err);
        } else {
            res.status(200).send({});
        }
    });
}
