/*******************************
File Name: survey.js
Description: This file defines the survey schema of the database.
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

const questionSchema = mongoose.Schema({ 
    question_priority: Number, 
    name: String,    
    type: String,   // yes/no, true/false, radio buttons, dropdown list 
    options:[String]  
  }); 

// create a schema class 
let surveySchema = mongoose.Schema({ 
    author: String, // username 
    name: String,   // name of survey 
    description: String,    // description of survey 
    start_time: Date, 
    end_time: Date, 
    questions: [{    // questions available 
        type: questionSchema, 
        required: true, 
      }], 
    }, 
    {
        collection: "surveys" 
    }
); 

const SurveySchemaModel = mongoose.model("surveys", surveySchema); 

module.exports = SurveySchemaModel; 