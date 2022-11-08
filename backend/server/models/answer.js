let mongoose = require('mongoose'); 

const responseSchema = mongoose.Schema({ 
    question_id: ObjectId , // id of the question 
    options: [String]   //answers 
}); 

// create a schema class 
let answerSchema = mongoose.Schema({ 
    username: String,   //username 
    survey_id: ObjectId,  // survey_id 
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