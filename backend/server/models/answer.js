/*******************************
File Name: answer.js
Description: This file defines the answer schema of the database.
Web app name: Aurora Research Company
Team name: A-Star
Team Members:
  Kuo, Yi-Cheng (301181514)
  Yeung, Lok Ki (301252535)
  Lam, Hing Yu (301257216)
  Chung, Ting Hin (301287013)
  Le, Hoang Long (301236235)
********************************/

let mongoose = require('mongoose'); 

const responseSchema = mongoose.Schema({ 
    question_id: mongoose.Schema.Types.ObjectId , // id of the question 
    options: [String]   //answers 
}); 

// create a schema class 
let answerSchema = mongoose.Schema({ 
    username: String,   //username 
    survey_id: mongoose.Schema.Types.ObjectId,  // survey_id 
    reponse_date: Date, // response date 
    responses: [{    // responses to the questions 
        type: responseSchema, 
        required: true, 
    }], 
}, 
    { 
        collection: "answers" 
    }
);

const AnswerSchemaModel = mongoose.model("Answer", answerSchema); 

module.exports = AnswerSchemaModel; 