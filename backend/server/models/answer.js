let mongoose = require('mongoose'); 

const responseSchema = mongoose.Schema({ 
    question_id: Number, //index of the survey 
    options: [String]   //answers 
}); 

// create a schema class 
let answerSchema = mongoose.Schema({ 
    username: String,   //username 
    survey_id: Number,  // survey_id 
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