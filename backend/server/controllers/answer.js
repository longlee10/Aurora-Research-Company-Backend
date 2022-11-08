/*******************************
File Name: answer.js
Description: It is the answer controller to do specific actions.
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
const Answer = require('../models/answer');
const Survey = require('../models/survey');

/* Answer summary by counting options */
module.exports.optionCountSummary = (req, res, next) => {
    const surveyId = req.body.survey_id;
    const questionId = req.body.question_id;
    
    getResponsesOptions(surveyId, questionId, (err, predefinedOptions, responsesOptions) => {
        if (err) {
            res.status(500).send(err);
        } else {
            // Obtain the initial results
            const initialResults = Object.assign({}, ...predefinedOptions.map((option) => ({[option]: 0})));
            // Obtain counted results
            const results = responsesOptions.reduce((acc, option) => {
                    acc[option] = (acc[option] || 0) + 1 ;
                    return acc;
                }, initialResults);
            res.status(200).send(results);
        }
    });
}


/* Answer summary by listing options (without distinct) */
module.exports.optionListSummary = (req, res, next) => {
    const surveyId = req.body.survey_id;
    const questionId = req.body.question_id;

    getResponsesOptions(surveyId, questionId, (err, predefinedOptions, responsesOptions) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(responsesOptions);
        }
    });
}

/**
 * @param {err, predefinedOptions, responsesOptions} callback 
 */
const getResponsesOptions = (surveyId, questionId, callback) => {
    // Find survey
    Survey.findById(surveyId, (err, survey) => {  
        if (err) {
            callback(err, null, null);
        } else {
            const question = survey.questions.id(questionId);
            if (question == null) {
                callback({ message: 'Invalid question ID.'}, null, null);
            } else {
                // Find answers
                Answer.find({ survey_id: surveyId }).exec((err, answers) => {
                    if (err) {
                        callback(err, null, null);
                    } else {
                        // Obtain responses options
                        const responsesOptions = answers
                            .flatMap(answer => answer.responses)
                            .filter(response => response.question_id == questionId)
                            .flatMap(response => response.options);
                        
                        callback(err, question.options, responsesOptions);  
                    }
                });
            }
        }
    });
};

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
