let mongoose = require('mongoose'); 

const questionSchema = mongoose.Schema({ 
    question_id: Number, 
    question_priority: Number, 
    name: String,    
    type: String,   // yes/no, true/false, radio buttons, dropdown list 
    options:[String]  
  }); 

// create a schema class 
let surveySchema = mongoose.Schema({ 
    survey_id: Number, 
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